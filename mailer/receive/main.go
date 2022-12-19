package main

import (
	"bytes"
	"crypto/hmac"
	"crypto/sha256"
	"encoding/hex"
	"encoding/json"
	"fmt"
	"io"
	"math/rand"
	"net/http"
	"os"
	"regexp"
	"strconv"
	"strings"
	"time"

	"github.com/aws/aws-lambda-go/events"
	"github.com/aws/aws-lambda-go/lambda"
	"github.com/aws/aws-sdk-go/aws"
	"github.com/aws/aws-sdk-go/aws/session"
	"github.com/aws/aws-sdk-go/service/s3"
	"github.com/aws/aws-sdk-go/service/ses"
	"github.com/jhillyerd/enmime"
)

type ApiResponse struct {
	Success bool
	Data    string
	Message *string
}

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

		rewrittenMail, err := TranslateEmail(obj.Body)
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

func ResolveAddress(identifier string) (string, error) {
	url := os.Getenv("API_URL")

	body, err := json.Marshal(map[string]string{
		"identifier": identifier,
	})
	if err != nil {
		return "", fmt.Errorf("could not encode api request JSON body: %w", err)
	}

	sig, timestamp := SignRequest(body)

	req, err := http.NewRequest("POST", url, bytes.NewBuffer(body))
	req.Header = http.Header{
		"x-signature-sha256":    {sig},
		"x-signature-timestamp": {timestamp},
		"content-type":          {"application/json"},
	}
	if err != nil {
		return "", fmt.Errorf("could not build http request: %w", err)
	}

	client := &http.Client{}
	resp, err := client.Do(req)
	if err != nil {
		return "", fmt.Errorf("could not send http request to the api: %w", err)
	}
	defer resp.Body.Close()

	var res ApiResponse
	json.NewDecoder(resp.Body).Decode(&res)

	if !res.Success {
		return "", fmt.Errorf("api return error: %s", *res.Message)
	}

	return res.Data, nil
}

func TranslateEmail(reader io.Reader) ([]byte, error) {
	e, err := enmime.ReadEnvelope(reader)
	if err != nil {
		return nil, fmt.Errorf("could not read mail parts: %w", err)
	}

	from := e.GetHeader("From")
	to := e.GetHeader("To")

	_, toAddress := ExtractNameAndAddress(to)
	identifier := strings.Split(toAddress, "@")

	name, address := ExtractNameAndAddress(from)
	newFrom := FormatFromAddress(address) + RandStringBytes(15) + "@relay.maskbox.app"
	if name != "" {
		newFrom = fmt.Sprintf("%s <%s>", name, newFrom)
	}

	forwardTo, err := ResolveAddress(identifier[0])
	if err != nil {
		return nil, fmt.Errorf("resolve address error: %w", err)
	}

	e.SetHeader("From", []string{newFrom})
	e.SetHeader("To", []string{forwardTo})
	e.SetHeader("Reply-To", []string{from})

	buf := &bytes.Buffer{}
	err = e.Root.Encode(buf)
	if err != nil {
		return nil, fmt.Errorf("could not encode updated mail: %w", err)
	}

	return buf.Bytes(), nil
}

func SignRequest(message []byte) (string, string) {
	secret := os.Getenv("SIGNATURE_SECRET_KEY")

	timestamp := strconv.Itoa((int(time.Now().UnixMilli())))
	body := []byte(timestamp + string(message))

	mac := hmac.New(sha256.New, []byte(secret))
	mac.Write(body)
	signed := mac.Sum(nil)
	hexSigned := hex.EncodeToString(signed)

	return hexSigned, timestamp
}

func ExtractNameAndAddress(s string) (string, string) {
	ex := regexp.MustCompile(`(?:(\w+(\s+)?\w+)?\s+)?(?:<?)((?:[\w-]+(?:\.[\w-]+)*)(?:@)(?:(?:[\w-]+\.)*\w[\w-]{0,66}))(?:>?)`)
	matches := ex.FindStringSubmatch(s)

	if matches[1] == "" {
		return "", matches[3]
	} else {
		return matches[1], matches[3]
	}
}

func FormatFromAddress(s string) string {
	s = strings.ReplaceAll(s, "@", "_")
	s = strings.ReplaceAll(s, ".", "_")
	return s
}

func RandStringBytes(n int) string {
	const letterBytes = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
	b := make([]byte, n)
	for i := range b {
		b[i] = letterBytes[rand.Intn(len(letterBytes))]
	}
	return string(b)
}
