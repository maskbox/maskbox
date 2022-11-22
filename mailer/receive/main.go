package main

import (
	"bytes"
	"fmt"
	"io"

	"github.com/aws/aws-lambda-go/events"
	"github.com/aws/aws-lambda-go/lambda"
	"github.com/aws/aws-sdk-go/aws"
	"github.com/aws/aws-sdk-go/aws/session"
	"github.com/aws/aws-sdk-go/service/s3"
	"github.com/aws/aws-sdk-go/service/ses"
	"github.com/jhillyerd/enmime"
)

func Handler(event events.SimpleEmailEvent) (interface{}, error) {
	config := aws.NewConfig()
	session, err := session.NewSession(config)
	if err != nil {
		return nil, fmt.Errorf("could not create session: %w", err)
	}

	s3Client := s3.New(session)
	mailClient := ses.New(session)

	for _, record := range event.Records {
		obj, err := s3Client.GetObject(&s3.GetObjectInput{Bucket: aws.String("maskbox-receive"), Key: aws.String(record.SES.Mail.MessageID)})
		if err != nil {
			return nil, fmt.Errorf("could not get object: %w", err)
		}

		rewrittenMail, err := TranslateEmail(
			obj.Body,
			"example@example.com", // resolved email from API
		)
		if err != nil {
			return nil, fmt.Errorf("could not rewrite mail: %w", err)
		}

		_, err = mailClient.SendRawEmail(&ses.SendRawEmailInput{RawMessage: &ses.RawMessage{Data: rewrittenMail}})
		if err != nil {
			return nil, fmt.Errorf("could not forward mail: %w", err)
		}

		_, err = s3Client.DeleteObject(&s3.DeleteObjectInput{Bucket: aws.String("maskbox-receive"), Key: aws.String(record.SES.Mail.MessageID)})
		if err != nil {
			return nil, fmt.Errorf("could not delete email from s3: %w", err)
		}
	}

	return event, nil
}

func main() {
	lambda.Start(Handler)
}

func TranslateEmail(
	reader io.Reader,
	forwardToMail string,
) ([]byte, error) {
	e, err := enmime.ReadEnvelope(reader)
	if err != nil {
		return nil, fmt.Errorf("could not read mail parts: %w", err)
	}

	from := e.GetHeader("From")

	e.SetHeader("From", []string{fmt.Sprintf("%s <%s>", "Maskbox Relay", "sender@relay.laniakea.host")})

	e.SetHeader("To", []string{forwardToMail})

	e.SetHeader("Reply-To", []string{from})

	buf := &bytes.Buffer{}
	err = e.Root.Encode(buf)
	if err != nil {
		return nil, fmt.Errorf("could not encode updated mail: %w", err)
	}

	return buf.Bytes(), nil
}
