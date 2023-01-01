import nodemailer from 'nodemailer';
import * as aws from '@aws-sdk/client-ses';
import { buildSendMail } from 'mailing-core';
import { RELAY_DOMAIN } from '../src/constants';

const ses = new aws.SES({
	credentials: {
		accessKeyId: process.env.SES_ACCESS_KEY_ID as string,
		secretAccessKey: process.env.SES_SECRET_ACCESS_KEY as string,
	},
	region: 'us-east-1',
});

const transport = nodemailer.createTransport({
	SES: { ses, aws },
});

const sendMail = buildSendMail({
	transport,
	defaultFrom: 'verification@' + RELAY_DOMAIN,
	configPath: './mailing.config.json',
});

export default sendMail;
