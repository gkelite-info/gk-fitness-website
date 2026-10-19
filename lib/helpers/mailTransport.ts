import nodemailer from "nodemailer";
import { Resend } from "resend";

export interface SendMailOptions {
  to: string;
  subject: string;
  html: string;
  from?: string;
}

export interface SendMailResult {
  success: boolean;
  id?: string;
  provider?: "smtp" | "resend";
  error?: string;
}

export async function sendMailViaTransport({
  to,
  subject,
  html,
  from,
}: SendMailOptions): Promise<SendMailResult> {
  const smtpHost = process.env.SMTP_HOST;
  const smtpUser = process.env.SMTP_USER;
  const smtpPass = process.env.SMTP_PASS || process.env.SMTP_PASSWORD;
  const smtpPort = process.env.SMTP_PORT ? parseInt(process.env.SMTP_PORT, 10) : 587;
  const smtpSecure = process.env.SMTP_SECURE === "true" || smtpPort === 465;

  if (smtpHost && smtpUser && smtpPass) {
    try {
      const transporter = nodemailer.createTransport({
        host: smtpHost,
        port: smtpPort,
        secure: smtpSecure,
        auth: { user: smtpUser, pass: smtpPass },
      });

      const fromAddress =
        from ||
        process.env.SMTP_FROM ||
        process.env.RESEND_FROM_EMAIL ||
        `"GK Gym Life" <${smtpUser}>`;

      const info = await transporter.sendMail({
        from: fromAddress,
        to,
        subject,
        html,
      });

      return { success: true, id: info.messageId, provider: "smtp" };
    } catch (smtpErr: unknown) {
      const errMsg = smtpErr instanceof Error ? smtpErr.message : "SMTP transport failure";
      console.error("[SMTP Error] Failed to send email via SMTP, trying fallback:", errMsg);
    }
  }

  const resendApiKey = process.env.RESEND_API;
  if (resendApiKey) {
    try {
      const resend = new Resend(resendApiKey);
      const fromAddress =
        from ||
        process.env.RESEND_FROM_EMAIL ||
        "GK Gym Life <noreply@gkeliteinfo.com>";

      const { data: resData, error } = await resend.emails.send({
        from: fromAddress,
        to,
        subject,
        html,
      });

      if (error) {
        return { success: false, error: error.message };
      }

      return { success: true, id: resData?.id, provider: "resend" };
    } catch (resendErr: unknown) {
      const errMsg = resendErr instanceof Error ? resendErr.message : "Resend error";
      return { success: false, error: errMsg };
    }
  }

  return {
    success: false,
    error: "No email service configured. Please provide SMTP credentials or Resend API key.",
  };
}
