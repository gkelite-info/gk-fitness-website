"use server";

import { sendMailViaTransport } from "./mailTransport";
import { getDemoBookingsClient } from "./demoBookings/demoBookingsHelper";
import {
  parseEmailFromRequirement,
  parsePlanFromRequirement,
  formatDbDateToUi,
  formatDbTimeToUi,
} from "@/app/actions/demoRequestsHelpers";

export interface DemoStatusEmailOptions {
  email: string;
  name: string;
  gymName?: string;
  gymCity?: string;
  planName?: string;
  status: string;
  scheduledDate?: string | null;
  scheduledTime?: string | null;
}

function getStatusDetails(status: string, gymName: string, name: string, planName: string) {
  const s = status.toLowerCase().replace(/\s+/g, "");
  switch (s) {
    case "contacted":
      return {
        subject: `We've Reached Out - Demo Request for ${gymName} | GK Gym Life`,
        badge: "Status: Contacted",
        badgeColor: "#A855F7",
        badgeBg: "rgba(168, 85, 247, 0.12)",
        title: "We've Reached Out to You",
        message: `Hello <strong>${name}</strong>,<br/><br/>A representative from GK-Gym Life has initiated contact regarding your demo request for <strong>${gymName}</strong>. We look forward to discussing how our gym management platform can streamline your fitness operations, biometric attendance, and revenue.`,
      };
    case "demoscheduled":
    case "scheduled":
      return {
        subject: `Demo Confirmed: GK-Gym Life Live Walkthrough for ${gymName}`,
        badge: "Status: Demo Scheduled",
        badgeColor: "#D4FF32",
        badgeBg: "rgba(212, 255, 50, 0.12)",
        title: "Your Demo is Scheduled!",
        message: `Hello <strong>${name}</strong>,<br/><br/>Great news! Your live product walkthrough for <strong>${gymName}</strong> has been scheduled. Our specialist will guide you through all features including member management, subscriptions, staff coordination, and biometric access.`,
      };
    case "converted":
      return {
        subject: `Welcome to GK-Gym Life! Partnership Confirmed for ${gymName}`,
        badge: "Status: Converted",
        badgeColor: "#10B981",
        badgeBg: "rgba(16, 185, 129, 0.12)",
        title: "Welcome to GK-Gym Life!",
        message: `Congratulations <strong>${name}</strong>!<br/><br/>We are thrilled to welcome <strong>${gymName}</strong> to the GK-Gym Life network on the <strong>${planName}</strong> plan. Our onboarding team will assist you in configuring your facility profile, trainer logins, and member lists.`,
      };
    case "notinterested":
      return {
        subject: `Update Regarding Your Demo Request | GK Gym Life`,
        badge: "Status: Closed",
        badgeColor: "#EF4444",
        badgeBg: "rgba(239, 68, 68, 0.12)",
        title: "Demo Request Status Update",
        message: `Hello <strong>${name}</strong>,<br/><br/>Thank you for taking the time to explore GK-Gym Life for <strong>${gymName}</strong>. We have updated your demo request status to closed. If your gym requirements evolve or if you need assistance in the future, please do not hesitate to contact us.`,
      };
    case "pending":
    default:
      return {
        subject: `Demo Request Received - Thank you for registering | GK Gym Life`,
        badge: "Status: Request Received",
        badgeColor: "#06B6D4",
        badgeBg: "rgba(6, 182, 212, 0.12)",
        title: "Thank You for Registering!",
        message: `Hello <strong>${name}</strong>,<br/><br/>Thank you for registering your demo request for <strong>${gymName}</strong> with GK-Gym Life! We have received your interest in the <strong>${planName}</strong> plan. Our product specialist is reviewing your requirements and will reach out to you shortly.`,
      };
  }
}

function buildHtmlTemplate(options: DemoStatusEmailOptions) {
  const gym = options.gymName || "Your Gym";
  const plan = options.planName || "Basic";
  const city = options.gymCity || "N/A";
  const details = getStatusDetails(options.status, gym, options.name, plan);

  const scheduleBox = options.scheduledDate
    ? `
      <div style="background-color: rgba(212, 255, 50, 0.08); border: 1px solid rgba(212, 255, 50, 0.35); border-radius: 10px; padding: 18px 20px; margin: 20px 0;">
        <p style="margin: 0 0 6px 0; font-size: 11px; color: #D4FF32; font-weight: 800; text-transform: uppercase; letter-spacing: 0.8px;">
          Confirmed Demo Session
        </p>
        <p style="margin: 0; color: #FFFFFF; font-size: 16px; font-weight: 700;">
          ${options.scheduledDate} &bull; ${options.scheduledTime || "11:00 AM"}
        </p>
      </div>
    `
    : "";

  const scheduleRow = options.scheduledDate
    ? `<tr><td style="padding: 8px 0; color: #64748B;">Scheduled Date:</td><td style="padding: 8px 0; color: #D4FF32; font-weight: 700;">${options.scheduledDate}</td></tr><tr><td style="padding: 8px 0; color: #64748B;">Scheduled Time:</td><td style="padding: 8px 0; color: #D4FF32; font-weight: 700;">${options.scheduledTime || "11:00 AM"}</td></tr>`
    : `<tr><td style="padding: 8px 0; color: #64748B;">Scheduled Session:</td><td style="padding: 8px 0; color: #94A3B8;">Pending schedule confirmation</td></tr>`;

  return `
    <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 620px; margin: 0 auto; background-color: #090B10; padding: 24px;">
      <div style="background-color: #121620; border-radius: 14px; overflow: hidden; border: 1px solid #1F2937; box-shadow: 0 10px 25px rgba(0,0,0,0.5);">
        <div style="background: linear-gradient(135deg, #161C28 0%, #0D111A 100%); padding: 32px 28px; text-align: center; border-bottom: 1px solid #1F2937;">
          <h1 style="color: #FFFFFF; margin: 0; font-size: 24px; font-weight: 900; letter-spacing: 0.8px;">
            GK <span style="color: #D4FF32;">GYM LIFE</span>
          </h1>
          <div style="display: inline-block; margin-top: 12px; padding: 6px 16px; background: ${details.badgeBg}; border: 1px solid ${details.badgeColor}40; border-radius: 20px;">
            <p style="color: ${details.badgeColor}; margin: 0; font-size: 12px; font-weight: 700; letter-spacing: 0.3px;">
              ${details.badge}
            </p>
          </div>
        </div>

        <div style="padding: 32px 28px; color: #CBD5E1; line-height: 1.6;">
          <h2 style="color: #FFFFFF; font-size: 19px; margin: 0 0 14px 0; font-weight: 700;">
            ${details.title}
          </h2>
          <p style="font-size: 14px; color: #94A3B8; margin: 0 0 20px 0;">
            ${details.message}
          </p>

          ${scheduleBox}

          <div style="background-color: #0A0D14; border: 1px solid #1E2638; border-radius: 10px; padding: 20px; margin: 20px 0;">
            <p style="margin: 0 0 14px 0; font-size: 12px; color: #D4FF32; font-weight: 800; text-transform: uppercase; letter-spacing: 0.6px; border-bottom: 1px solid #1E2638; padding-bottom: 8px;">
              Request Summary
            </p>
            <table style="width: 100%; border-collapse: collapse; font-size: 13px;">
              <tr><td style="padding: 8px 0; color: #64748B; width: 42%;">Gym Facility:</td><td style="padding: 8px 0; color: #FFFFFF; font-weight: 600;">${gym}</td></tr>
              <tr><td style="padding: 8px 0; color: #64748B;">Location:</td><td style="padding: 8px 0; color: #FFFFFF;">${city}</td></tr>
              <tr><td style="padding: 8px 0; color: #64748B;">Interested Plan:</td><td style="padding: 8px 0; color: #FFFFFF;">${plan}</td></tr>
              ${scheduleRow}
            </table>
          </div>

          <p style="font-size: 13px; color: #64748B; margin: 24px 0 0 0;">
            Have questions or need immediate assistance? Reach out to our management team anytime.
          </p>
        </div>

        <div style="background-color: #0D111A; padding: 18px 28px; border-top: 1px solid #1A2233; text-align: center;">
          <p style="margin: 0; color: #64748B; font-size: 12px;">GK-Gym Life &bull; Your fitness journey, our priority.</p>
        </div>
      </div>
    </div>
  `;
}

export async function sendDemoStatusEmail(options: DemoStatusEmailOptions) {
  if (!options.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(options.email)) {
    return { success: false, error: "Invalid or missing recipient email address." };
  }

  const gym = options.gymName || "Your Gym";
  const plan = options.planName || "Basic";
  const details = getStatusDetails(options.status, gym, options.name, plan);
  const html = buildHtmlTemplate(options);

  return await sendMailViaTransport({
    to: options.email,
    subject: details.subject,
    html,
  });
}

export async function sendDemoBookingStatusNotification(demoBookingId: string, newStatus: string) {
  try {
    const client = getDemoBookingsClient();
    const { data: booking } = await client
      .from("demo_bookings")
      .select("*, subscriptions(*), demo_bookings_history(*)")
      .eq("demoBookingId", demoBookingId)
      .maybeSingle();

    if (!booking) return { success: false, error: "Booking not found" };

    let recipientEmail = parseEmailFromRequirement(booking.requirement);

    if (!recipientEmail) {
      const cleanMobile = (booking.mobile || "").replace(/\D/g, "");
      const { data: usersMatch } = await client
        .from("users")
        .select("email, phone, name")
        .eq("phone", cleanMobile)
        .limit(1);

      if (usersMatch && usersMatch.length > 0 && usersMatch[0].email) {
        recipientEmail = usersMatch[0].email;
      }
    }

    if (!recipientEmail) {
      return { success: false, error: "No recipient email found for this demo booking." };
    }

    const historyItems = (booking.demo_bookings_history || [])
      .filter((h: { deletedAt?: string | null }) => !h.deletedAt)
      .sort((a: { createdAt: string }, b: { createdAt: string }) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

    const latest = historyItems[0] as { rescheduleDate?: string | null; rescheduleTime?: string | null } | undefined;
    const planName =
      booking.subscriptions?.label ||
      booking.subscriptions?.planName ||
      parsePlanFromRequirement(booking.requirement) ||
      "Basic";

    const result = await sendDemoStatusEmail({
      email: recipientEmail,
      name: booking.name,
      gymName: booking.gymName,
      gymCity: booking.gymCity,
      planName,
      status: newStatus,
      scheduledDate: latest?.rescheduleDate ? formatDbDateToUi(latest.rescheduleDate) : null,
      scheduledTime: latest?.rescheduleTime ? formatDbTimeToUi(latest.rescheduleTime) : null,
    });

    return {
      success: result.success,
      emailSent: result.success,
      recipientEmail,
      error: result.error,
    };
  } catch (err: unknown) {
    const errMsg = err instanceof Error ? err.message : "Failed to send notification";
    console.error("sendDemoBookingStatusNotification error:", errMsg);
    return { success: false, error: errMsg };
  }
}
