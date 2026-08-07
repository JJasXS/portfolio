import { NextResponse } from "next/server";

type ContactPayload = {
  name?: string;
  email?: string;
  enquiryType?: string;
  message?: string;
};

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as ContactPayload;
    const name = body.name?.trim() ?? "";
    const email = body.email?.trim() ?? "";
    const enquiryType = body.enquiryType?.trim() ?? "";
    const message = body.message?.trim() ?? "";

    if (!name || !email || !enquiryType || !message) {
      return NextResponse.json(
        { message: "All fields are required." },
        { status: 400 },
      );
    }

    if (!isValidEmail(email)) {
      return NextResponse.json(
        { message: "Invalid email address." },
        { status: 400 },
      );
    }

    if (message.length < 10) {
      return NextResponse.json(
        { message: "Message is too short." },
        { status: 400 },
      );
    }

    /**
     * BACKEND INTEGRATION POINT
     * -------------------------
     * Connect this endpoint to your preferred delivery method:
     *
     * 1. Email service (Resend, SendGrid, Nodemailer/SMTP)
     * 2. n8n webhook
     * 3. Database insert (Postgres, Supabase, etc.)
     *
     * Example (Resend):
     * await resend.emails.send({
     *   from: "portfolio@yourdomain.com",
     *   to: "jason.choo2004@gmail.com",
     *   subject: `[Portfolio] ${enquiryType} from ${name}`,
     *   text: message,
     * });
     *
     * Example (n8n webhook):
     * await fetch(process.env.N8N_WEBHOOK_URL!, {
     *   method: "POST",
     *   headers: { "Content-Type": "application/json" },
     *   body: JSON.stringify({ name, email, enquiryType, message }),
     * });
     */

    // Temporary acknowledgement while no provider is connected.
    console.info("[contact enquiry]", { name, email, enquiryType, message });

    return NextResponse.json({
      message:
        "Enquiry received. Backend delivery is not connected yet. Check server logs, then wire Resend/n8n/SMTP here.",
    });
  } catch {
    return NextResponse.json(
      { message: "Unable to process enquiry." },
      { status: 500 },
    );
  }
}
