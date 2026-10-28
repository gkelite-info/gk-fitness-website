"use server";

import { sendMailViaTransport } from "./mailTransport";

export interface UserRegistrationEmailData {
  name: string;
  email: string;
  phone: string;
  role?: string;
  userId?: string;
  gymName?: string;
  gender?: string;
  dob?: string;
  address?: string;
  city?: string;
  state?: string;
  country?: string;
  pincode?: string;
  memberCount?: string;
  planId?: string | null;
  planName?: string;
  notes?: string;
  loginUrl?: string;
  confirmationUrl?: string;
  isSignup?: boolean;
}

function buildUserCongratulationsEmail(data: UserRegistrationEmailData) {
  const gym = data.gymName || "Your Gym";
  const plan = data.planName || "Basic";
  const city = data.city || "Hyderabad";
  const role = data.role || "Customer";
  const isAccountSignup = data.isSignup || !!data.confirmationUrl;

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.gkgymlife.com";
  const verifyLink =
    data.confirmationUrl ||
    (data.userId
      ? `${siteUrl}/api/auth/verify-email?uid=${encodeURIComponent(data.userId)}&email=${encodeURIComponent(data.email)}`
      : null);

  const formattedDate = new Date().toLocaleString("en-IN", {
    timeZone: "Asia/Kolkata",
    dateStyle: "medium",
    timeStyle: "short",
  });

  const badgeText = isAccountSignup ? "Action Required: Verify Email" : "Status: Registration Confirmed";
  const titleText = isAccountSignup ? "Welcome to GK Gym Life - Confirm Your Email" : "Congratulations on Choosing GK Gym Life!";
  const introMessage = isAccountSignup
    ? `Hello <strong>${data.name}</strong>,<br/><br/>Welcome to <strong>GK- Gym Life</strong>! Your <strong>${role}</strong> account has been created for <strong>${gym}</strong>. Please confirm your email address below to activate your account and unlock access to your portal.`
    : `Hello <strong>${data.name}</strong>,<br/><br/>Congratulations and thank you for selecting <strong>GK- Gym Life</strong> for <strong>${gym}</strong>! We are thrilled to welcome you to our network. You have taken an exciting step towards achieving your fitness and operational goals. Our product specialists and support team are here to guide you every step of the way.`;

  const confirmationButtonHtml = isAccountSignup && verifyLink
    ? `
      <div style="text-align: center; margin: 28px 0 12px 0;">
        <a href="${verifyLink}" style="background-color: #D4FF32; color: #000000; padding: 14px 34px; border-radius: 10px; text-decoration: none; font-weight: 800; font-size: 14px; display: inline-block; letter-spacing: 0.3px;">
          Confirm Email &amp; Activate Account &rarr;
        </a>
      </div>
      <p style="text-align: center; font-size: 12px; color: #94A3B8; margin: 0 0 16px 0;">
        Please click the button above to verify your email. Once confirmed, you will be able to log in.
      </p>
    `
    : "";

  return `
    <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 620px; margin: 0 auto; background-color: #090B10; padding: 24px;">
      <div style="background-color: #121620; border-radius: 14px; overflow: hidden; border: 1px solid #1F2937; box-shadow: 0 10px 25px rgba(0,0,0,0.5);">
        
        <div style="background: linear-gradient(135deg, #161C28 0%, #0D111A 100%); padding: 32px 28px; text-align: center; border-bottom: 1px solid #1F2937;">
          <h1 style="color: #FFFFFF; margin: 0; font-size: 24px; font-weight: 900; letter-spacing: 0.8px;">
            GK <span style="color: #D4FF32;">GYM LIFE</span>
          </h1>
          <div style="display: inline-block; margin-top: 12px; padding: 6px 16px; background: rgba(212, 255, 50, 0.12); border: 1px solid rgba(212, 255, 50, 0.4); border-radius: 20px;">
            <p style="color: #D4FF32; margin: 0; font-size: 12px; font-weight: 700; letter-spacing: 0.3px;">
              ${badgeText}
            </p>
          </div>
        </div>

        <div style="padding: 32px 28px; color: #CBD5E1; line-height: 1.6;">
          <h2 style="color: #FFFFFF; font-size: 19px; margin: 0 0 14px 0; font-weight: 700;">
            ${titleText}
          </h2>
          <p style="font-size: 14px; color: #94A3B8; margin: 0 0 20px 0;">
            ${introMessage}
          </p>

          <div style="background-color: #0A0D14; border: 1px solid #1E2638; border-radius: 10px; padding: 20px; margin: 20px 0;">
            <p style="margin: 0 0 14px 0; font-size: 12px; color: #D4FF32; font-weight: 800; text-transform: uppercase; letter-spacing: 0.6px; border-bottom: 1px solid #1E2638; padding-bottom: 8px;">
              Registration Summary
            </p>
            <table style="width: 100%; border-collapse: collapse; font-size: 13px;">
              <tr><td style="padding: 8px 0; color: #64748B; width: 42%;">Name:</td><td style="padding: 8px 0; color: #FFFFFF; font-weight: 600;">${data.name}</td></tr>
              <tr><td style="padding: 8px 0; color: #64748B;">Registered Email:</td><td style="padding: 8px 0; color: #FFFFFF;">${data.email}</td></tr>
              <tr><td style="padding: 8px 0; color: #64748B;">Phone:</td><td style="padding: 8px 0; color: #FFFFFF;">${data.phone}</td></tr>
              <tr><td style="padding: 8px 0; color: #64748B;">Gym Facility:</td><td style="padding: 8px 0; color: #FFFFFF; font-weight: 600;">${gym}</td></tr>
              <tr><td style="padding: 8px 0; color: #64748B;">Location:</td><td style="padding: 8px 0; color: #FFFFFF;">${city}</td></tr>
              <tr><td style="padding: 8px 0; color: #64748B;">Account Role:</td><td style="padding: 8px 0; color: #D4FF32; font-weight: 700;">${role}</td></tr>
              <tr><td style="padding: 8px 0; color: #64748B;">Interested Plan:</td><td style="padding: 8px 0; color: #FFFFFF;">${plan}</td></tr>
              <tr><td style="padding: 8px 0; color: #64748B;">Registration Date:</td><td style="padding: 8px 0; color: #94A3B8;">${formattedDate}</td></tr>
            </table>
          </div>

          ${confirmationButtonHtml}

          <p style="font-size: 13px; color: #64748B; margin: 24px 0 0 0;">
            Have questions or need immediate assistance? Reach out to our management team anytime at <a href="mailto:gkeliteinfo@gmail.com" style="color: #D4FF32; text-decoration: none;">gkeliteinfo@gmail.com</a>.
          </p>
        </div>

        <div style="background-color: #0D111A; padding: 18px 28px; border-top: 1px solid #1A2233; text-align: center;">
          <p style="margin: 0; color: #64748B; font-size: 12px;">GK-Gym Life &bull; Your fitness journey, our priority.</p>
        </div>
      </div>
    </div>
  `;
}

function buildAdminRegistrationNotificationEmail(data: UserRegistrationEmailData) {
  const gym = data.gymName || "N/A";
  const plan = data.planName || "Basic";
  const city = data.city || "N/A";
  const role = data.role || "Customer";

  const formattedDate = new Date().toLocaleString("en-IN", {
    timeZone: "Asia/Kolkata",
    dateStyle: "medium",
    timeStyle: "short",
  });

  return `
    <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 620px; margin: 0 auto; background-color: #090B10; padding: 24px;">
      <div style="background-color: #121620; border-radius: 14px; overflow: hidden; border: 1px solid #1F2937; box-shadow: 0 10px 25px rgba(0,0,0,0.5);">
        
        <div style="background: linear-gradient(135deg, #161C28 0%, #0D111A 100%); padding: 32px 28px; text-align: center; border-bottom: 1px solid #1F2937;">
          <h1 style="color: #FFFFFF; margin: 0; font-size: 24px; font-weight: 900; letter-spacing: 0.8px;">
            GK <span style="color: #D4FF32;">GYM LIFE</span>
          </h1>
          <div style="display: inline-block; margin-top: 12px; padding: 6px 16px; background: rgba(56, 189, 248, 0.12); border: 1px solid rgba(56, 189, 248, 0.4); border-radius: 20px;">
            <p style="color: #38BDF8; margin: 0; font-size: 12px; font-weight: 700; letter-spacing: 0.3px;">
              Status: New User Registered
            </p>
          </div>
        </div>

        <div style="padding: 32px 28px; color: #CBD5E1; line-height: 1.6;">
          <h2 style="color: #FFFFFF; font-size: 19px; margin: 0 0 14px 0; font-weight: 700;">
            New User Registration Details
          </h2>
          <p style="font-size: 14px; color: #94A3B8; margin: 0 0 20px 0;">
            A user has submitted registration details on GK Gym Life. Here are the user's full details:
          </p>

          <div style="background-color: #0A0D14; border: 1px solid #1E2638; border-radius: 10px; padding: 20px; margin: 20px 0;">
            <p style="margin: 0 0 14px 0; font-size: 12px; color: #D4FF32; font-weight: 800; text-transform: uppercase; letter-spacing: 0.6px; border-bottom: 1px solid #1E2638; padding-bottom: 8px;">
              User Information
            </p>
            <table style="width: 100%; border-collapse: collapse; font-size: 13px;">
              <tr><td style="padding: 8px 0; color: #64748B; width: 42%;">Full Name:</td><td style="padding: 8px 0; color: #FFFFFF; font-weight: 600;">${data.name}</td></tr>
              <tr><td style="padding: 8px 0; color: #64748B;">Email Address:</td><td style="padding: 8px 0; color: #FFFFFF; font-weight: 600;">${data.email}</td></tr>
              <tr><td style="padding: 8px 0; color: #64748B;">Mobile Number:</td><td style="padding: 8px 0; color: #FFFFFF; font-weight: 600;">${data.phone}</td></tr>
              <tr><td style="padding: 8px 0; color: #64748B;">Account Role:</td><td style="padding: 8px 0; color: #D4FF32; font-weight: 700;">${role}</td></tr>
              <tr><td style="padding: 8px 0; color: #64748B;">Gym / Facility:</td><td style="padding: 8px 0; color: #FFFFFF; font-weight: 600;">${gym}</td></tr>
              <tr><td style="padding: 8px 0; color: #64748B;">Location:</td><td style="padding: 8px 0; color: #FFFFFF;">${city}</td></tr>
              <tr><td style="padding: 8px 0; color: #64748B;">Member Count:</td><td style="padding: 8px 0; color: #FFFFFF;">${data.memberCount || "N/A"}</td></tr>
              <tr><td style="padding: 8px 0; color: #64748B;">Plan / Requirement:</td><td style="padding: 8px 0; color: #FFFFFF;">${data.notes || plan}</td></tr>
              <tr><td style="padding: 8px 0; color: #64748B;">Registration Time:</td><td style="padding: 8px 0; color: #94A3B8;">${formattedDate}</td></tr>
            </table>
          </div>

          <p style="font-size: 13px; color: #64748B; margin: 24px 0 0 0;">
            This is an automated administrative notification sent directly to management.
          </p>
        </div>

        <div style="background-color: #0D111A; padding: 18px 28px; border-top: 1px solid #1A2233; text-align: center;">
          <p style="margin: 0; color: #64748B; font-size: 12px;">GK-Gym Life System Administrator &bull; gkeliteinfo@gmail.com</p>
        </div>
      </div>
    </div>
  `;
}

export async function sendUserRegistrationEmails(data: UserRegistrationEmailData) {
  const adminEmail = process.env.ADMIN_NOTIFICATION_EMAIL || "gkeliteinfo@gmail.com";
  const defaultFrom = process.env.RESEND_FROM_EMAIL || "GK Gym Life <noreply@gkeliteinfo.com>";

  const gym = data.gymName || "GK Fitness";
  const userHtml = buildUserCongratulationsEmail(data);
  const adminHtml = buildAdminRegistrationNotificationEmail(data);

  const role = data.role || "Customer";
  const isAccountSignup = data.isSignup || !!data.confirmationUrl;
  const userSubject = isAccountSignup
    ? `Action Required: Confirm Your Email - Welcome to GK- Gym Life`
    : `Congratulations on Choosing GK Gym Life - Registration Confirmed for ${gym}`;
  const adminSubject = `New User Registration: ${data.name} (${role}) | GK- Gym Life`;

  const tasks: Promise<any>[] = [];

  const isValidUserEmail = !!data.email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email) && !data.email.endsWith("@gkgymlife.com");
  if (isValidUserEmail) {
    tasks.push(
      sendMailViaTransport({
        to: data.email,
        subject: userSubject,
        html: userHtml,
        from: defaultFrom,
      })
    );
  }

  tasks.push(
    sendMailViaTransport({
      to: adminEmail,
      subject: adminSubject,
      html: adminHtml,
      from: defaultFrom,
    })
  );

  const results = await Promise.allSettled(tasks);

  const userResult = isValidUserEmail && results[0] ? results[0] : null;
  const adminResult = isValidUserEmail ? results[1] : results[0];

  const userSuccess = userResult?.status === "fulfilled" && (userResult.value as any)?.success;
  const adminSuccess = adminResult?.status === "fulfilled" && (adminResult.value as any)?.success;

  return {
    success: userSuccess || adminSuccess,
    userEmailSent: !!userSuccess,
    adminEmailSent: !!adminSuccess,
    errors: results
      .filter((r) => r.status === "rejected" || (r.status === "fulfilled" && !(r.value as any)?.success))
      .map((r) => (r.status === "rejected" ? String(r.reason) : (r.value as any)?.error)),
  };
}
