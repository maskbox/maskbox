import nodemailer from 'nodemailer';
import * as aws from '@aws-sdk/client-ses';
import { buildSendMail } from 'mailing-core';

const ses = new aws.SES({
	credentials: {
		accessKeyId: process.env.AWS_ACCESS_KEY_ID as string,
		secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY as string
	},
	region: 'us-east-1'
});

const transport = nodemailer.createTransport({
	SES: { ses, aws }
});

const sendMail = buildSendMail({
	transport,
	defaultFrom: 'verification@relay.laniakea.host',
	configPath: './mailing.config.json'
});

export default sendMail;
