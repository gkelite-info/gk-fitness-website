"use server";

import { Resend } from "resend";

export type PaymentEmailOptions = {
  email: string;
  name: string;
  memberCode: string;
  amount: string | number;
  transactionId: string;
  planName?: string;
  date?: string;
  gymName?: string;
};

export async function sendPaymentSuccessEmail({
  email,
  name,
  memberCode,
  amount,
  transactionId,
  planName,
  date,
  gymName,
}: PaymentEmailOptions) {
  if (!email) {
    return { success: false, error: "No email provided for payment confirmation." };
  }

  const formattedDate =
    date ||
    new Date().toLocaleString("en-IN", {
      timeZone: "Asia/Kolkata",
      dateStyle: "medium",
      timeStyle: "short",
    });
  const formattedAmount = typeof amount === "number" ? amount.toFixed(2) : String(amount);
  const planDisplay = planName || "Gym Membership";
  const gymDisplay = gymName || "GK Gym Life";

  const htmlContent = `
    <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 650px; margin: 0 auto; background-color: #0F141F; padding: 20px;">
      <div style="background-color: #161C24; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.3); border: 1px solid #232B35;">
        
        <!-- Header -->
        <div style="background: linear-gradient(135deg, #131926 0%, #0F141F 100%); padding: 32px 30px; text-align: center; border-bottom: 1px solid #1E2638;">
          <h1 style="color: #ffffff; margin: 0; font-size: 26px; font-weight: 700; letter-spacing: 0.5px;">${gymDisplay}</h1>
          <div style="display: inline-block; margin-top: 12px; padding: 6px 14px; background: rgba(204, 255, 0, 0.1); border: 1px solid rgba(204, 255, 0, 0.2); border-radius: 20px;">
            <p style="color: #CCFF00; margin: 0; font-size: 13px; font-weight: 600; letter-spacing: 0.3px;">✓ Payment Successful</p>
          </div>
        </div>

        <!-- Body -->
        <div style="padding: 36px 30px; color: #CBD5E1; line-height: 1.6;">
          <p style="font-size: 18px; margin-top: 0; color: #FFFFFF;">Dear <strong>${name}</strong>,</p>
          
          <p style="font-size: 15px; color: #94A3B8;">
            We have successfully received your payment of <strong style="color: #FFFFFF;">₹${formattedAmount}</strong> for your membership at ${gymDisplay}.
          </p>

          <!-- Receipt Details Card -->
          <div style="background-color: #10141A; border: 1px solid #232B35; border-radius: 10px; padding: 24px; margin: 26px 0;">
            <p style="margin: 0 0 16px 0; font-size: 14px; color: #CCFF00; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; border-bottom: 1px solid #232B35; padding-bottom: 8px;">
              Transaction Receipt
            </p>
            
            <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
              <tr>
                <td style="padding: 8px 0; color: #64748b; width: 45%;">Member ID:</td>
                <td style="padding: 8px 0; color: #FFFFFF; font-weight: 700; font-family: monospace;">${memberCode}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #64748b;">Plan:</td>
                <td style="padding: 8px 0; color: #FFFFFF; font-weight: 600;">${planDisplay}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #64748b;">Transaction ID:</td>
                <td style="padding: 8px 0; color: #FFFFFF; font-family: monospace; font-size: 13px; word-break: break-all;">${transactionId}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #64748b;">Amount Paid:</td>
                <td style="padding: 8px 0; color: #CCFF00; font-weight: 800; font-size: 16px;">₹${formattedAmount}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #64748b;">Payment Status:</td>
                <td style="padding: 8px 0; color: #10B981; font-weight: 700;">Recorded & Verified</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #64748b;">Date & Time:</td>
                <td style="padding: 8px 0; color: #FFFFFF;">${formattedDate}</td>
              </tr>
            </table>
          </div>

          <!-- Note -->
          <div style="background-color: rgba(16, 185, 129, 0.05); border-left: 4px solid #10B981; padding: 16px 18px; margin: 24px 0; border-radius: 0 8px 8px 0;">
            <p style="margin: 0; font-size: 14px; color: #34D399; font-weight: 500;">
              Your membership has been updated and your payment is now marked as <strong>Recorded & Verified</strong>.
            </p>
          </div>

          <p style="font-size: 15px; margin-bottom: 0; color: #94A3B8;">
            If you have any questions or require assistance, feel free to contact our management team.
          </p>
        </div>

        <!-- Footer -->
        <div style="background-color: #0F141F; padding: 22px 30px; border-top: 1px solid #1E2638; text-align: center;">
          <p style="margin: 0; color: #64748b; font-size: 13px; font-weight: 600;">Management Team</p>
          <p style="margin: 4px 0 0 0; color: #475569; font-size: 12px;">${gymDisplay}</p>
        </div>

      </div>
    </div>
  `;

  try {
    const resendApiKey = process.env.RESEND_API_KEY || process.env.RESEND_API;

    if (!resendApiKey) {
      console.error("Resend API key is missing in environment variables (.env)");
      return { success: false, error: "Email service is not configured (Missing API Key)." };
    }

    const resend = new Resend(resendApiKey);
    const { data: resData, error } = await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL || 'GK Gym Life <noreply@gkgymlife.com>',
      to: email,
      subject: `Payment Successful - Receipt ${transactionId} | ${gymDisplay}`,
      html: htmlContent,
    });

    if (error) {
      console.error("Resend error sending payment success email: ", error);
      return { success: false, error: error.message };
    }

    return { success: true, id: resData?.id };
  } catch (error: any) {
    console.error("Unexpected error sending payment success email: ", error);
    return { success: false, error: error.message || "Unknown error" };
  }
}

export type SignupEmailOptions = {
  email: string;
  name: string;
  userId?: string;
  role?: string;
  loginUrl?: string;
};

export async function sendSignupConfirmationEmail({
  email,
  name,
  userId,
  role = "Customer",
  loginUrl,
}: SignupEmailOptions) {
  if (!email) {
    return { success: false, error: "No email provided." };
  }

  const resendApiKey = process.env.RESEND_API_KEY || process.env.RESEND_API;
  if (!resendApiKey) {
    console.error("Resend API key is missing in environment variables (.env)");
    return { success: false, error: "Email service is not configured (Missing API Key)." };
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  const accessUrl =
    loginUrl ||
    (userId
      ? `${siteUrl}/api/auth/verify-email?uid=${encodeURIComponent(userId)}&email=${encodeURIComponent(email)}`
      : `${siteUrl}/choose-account`);

  const htmlContent = `
    <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; background-color: #0F141F; padding: 20px;">
      <div style="background-color: #161C24; border-radius: 12px; overflow: hidden; border: 1px solid #232B35;">
        <div style="background: linear-gradient(135deg, #131926 0%, #0F141F 100%); padding: 30px; text-align: center; border-bottom: 1px solid #1E2638;">
          <h1 style="color: #ffffff; margin: 0; font-size: 24px; font-weight: 800; letter-spacing: 0.5px;">GK <span style="color: #D4FF32;">GYM LIFE</span></h1>
          <div style="display: inline-block; margin-top: 10px; padding: 4px 12px; background: rgba(212, 255, 50, 0.1); border: 1px solid rgba(212, 255, 50, 0.25); border-radius: 16px;">
            <p style="color: #D4FF32; margin: 0; font-size: 12px; font-weight: 700;">Action Required: Accept Invitation</p>
          </div>
        </div>
        <div style="padding: 30px; color: #CBD5E1; line-height: 1.6;">
          <p style="font-size: 17px; margin-top: 0; color: #FFFFFF;">Hi <strong>${name}</strong>,</p>
          <p style="font-size: 14px; color: #94A3B8;">
            Welcome to GK- Gym Life! Your <strong>${role}</strong> account has been created. Please accept your details below to verify your email and unlock access to your portal.
          </p>
          <div style="background-color: #10141A; border: 1px solid #232B35; border-radius: 10px; padding: 20px; margin: 20px 0;">
            <p style="margin: 0 0 10px 0; font-size: 12px; color: #D4FF32; font-weight: 700; text-transform: uppercase;">Registration Details</p>
            <p style="margin: 4px 0; font-size: 14px; color: #FFFFFF;"><strong>Email:</strong> ${email}</p>
            <p style="margin: 4px 0; font-size: 14px; color: #FFFFFF;"><strong>Account Type:</strong> ${role}</p>
            <p style="margin: 4px 0; font-size: 14px; color: #EAB308;"><strong>Status:</strong> Pending Email Acceptance</p>
          </div>
          <div style="text-align: center; margin: 28px 0;">
            <a href="${accessUrl}" style="background-color: #D4FF32; color: #000000; padding: 14px 32px; border-radius: 10px; text-decoration: none; font-weight: 800; font-size: 14px; display: inline-block; letter-spacing: 0.3px;">
              Accept Your Details &rarr;
            </a>
          </div>
          <p style="font-size: 13px; color: #64748B; margin-bottom: 0;">
            If you did not sign up for this account, please contact our support team.
          </p>
        </div>
        <div style="background-color: #0F141F; padding: 16px; border-top: 1px solid #1E2638; text-align: center;">
          <p style="margin: 0; color: #64748b; font-size: 12px;">GK- Gym Life &bull; Your fitness journey, our priority.</p>
        </div>
      </div>
    </div>
  `;

  try {
    const resend = new Resend(resendApiKey);
    const fromAddress =
      process.env.RESEND_FROM_EMAIL || "GK Gym Life <noreply@gkeliteinfo.com>";

    const { data: resData, error } = await resend.emails.send({
      from: fromAddress,
      to: email,
      subject: "Action Required: Accept Your Details - Welcome to GK- Gym Life",
      html: htmlContent,
    });

    if (error) {
      console.error("Resend error sending signup confirmation email:", error);
      return { success: false, error: error.message };
    }

    return { success: true, id: resData?.id };
  } catch (error: any) {
    console.error("Unexpected error sending signup confirmation email:", error);
    return { success: false, error: error.message || "Unknown error" };
  }
}

