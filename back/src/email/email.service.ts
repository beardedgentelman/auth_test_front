import {
  generateConfirmEmailTemp,
  generateResetPassTemplate,
} from '../utils/template-generator';
import { Injectable } from '@nestjs/common';
import { createTransport, TransportOptions } from 'nodemailer';
require('dotenv').config();

const SMTP_HOST = process.env.SMTP_HOST;
const SMTP_PORT = process.env.SMTP_PORT;
const EMAIL_USER = process.env.EMAIL_USER;
const EMAIL_PASSWORD = process.env.EMAIL_PASSWORD;
const EMAIL_USER_DEFAULT = process.env.EMAIL_USER_DEFAULT;

@Injectable()
export class EmailService {
  private readonly nodemailerTransport: any;

  constructor() {
    this.nodemailerTransport = createTransport({
      service: 'gmail',
      host: SMTP_HOST,
      port: SMTP_PORT,
      secure: false,
      auth: {
        user: EMAIL_USER,
        pass: EMAIL_PASSWORD,
      },
    } as TransportOptions);
  }

  public async sendForgotPasswordMail(
    email: string,
    link: string,
  ): Promise<void> {
    await this.nodemailerTransport.sendMail({
      from: EMAIL_USER_DEFAULT,
      to: email,
      date: new Date(),
      subject: 'Reset password',
      html: generateResetPassTemplate(email, link),
    });
  }

  public async sendConfirmEmailMail(
    email: string,
    link: string,
  ): Promise<void> {
    await this.nodemailerTransport.sendMail({
      from: EMAIL_USER_DEFAULT,
      to: email,
      date: new Date(),
      subject: 'Email confirmation',
      html: generateConfirmEmailTemp(link),
    });
  }
}
