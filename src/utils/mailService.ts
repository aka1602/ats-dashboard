import nodemailer from 'nodemailer';
import pug from 'pug';
import { htmlToText } from 'html-to-text';

export class Email {
	to: string;
	firstName: string;
	url: string;
	from: string;

	constructor(user: Record<string, any>, url: string) {
		this.to = user.email;
		this.firstName = user.name.split(' ')[0];
		this.url = url;
		this.from = `Abhijeet singh<${process.env.SMTP_USER}>`;
	}

	newTransport() {
		return nodemailer.createTransport({
			host: 'smtp.gmail.com',
			port: 587,
			auth: {
				user: process.env.SMTP_USER,
				pass: process.env.SMTP_PASS,
			},
		});
	}

	// Send the actual email
	async send(template: string, subject: string) {
		// 1) Render HTML based on a pug template
		const html = pug.renderFile(`${__dirname}/../views/email/${template}.pug`, {
			firstName: this.firstName,
			url: this.url,
			subject,
		});

		// 2) Define email options
		const mailOptions = {
			from: this.from,
			to: this.to,
			subject,
			html,
			text: htmlToText(html, {
				wordwrap: 130,
			}),
		};

		// 3) Create a transport and send email
		await this.newTransport().sendMail(mailOptions);
	}

	async sendWelcome() {
		await this.send('welcome', 'Welcome to the Natours Family!');
	}

	async sendVerifyEmail() {
		await this.send('verifyProfile', 'Verify Email');
	}
}
