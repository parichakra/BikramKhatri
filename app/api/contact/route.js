import { NextResponse } from "next/server"
import nodemailer from "nodemailer"

export async function POST(request) {
  try {
    const body = await request.json()
    const { name, email, subject, message } = body

    // Input validation
    if (!name || !email || !message) {
      return NextResponse.json(
        { message: "Missing required fields. Please provide name, email, and message." },
        { status: 400 },
      )
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ message: "Please provide a valid email address." }, { status: 400 })
    }

    // Sanitize inputs to prevent HTML injection
    const safe = (str) => String(str ?? "").replace(/</g, "&lt;").replace(/>/g, "&gt;")

    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_SERVER_HOST,
      port: Number(process.env.EMAIL_SERVER_PORT),
      secure: Number(process.env.EMAIL_SERVER_PORT) === 465,
      auth: {
        user: process.env.EMAIL_SERVER_USER,
        pass: process.env.EMAIL_SERVER_PASSWORD,
      },
    })

    const emailSubject = subject
      ? `Portfolio Contact: ${subject}`
      : `Portfolio Contact from ${name}`

    const mailOptions = {
      from: `"Bikram Khatri Portfolio" <${process.env.EMAIL_FROM}>`,
      to: process.env.EMAIL_TO,
      replyTo: email,
      subject: emailSubject,
      text: `
New message from your portfolio contact form.

Name:    ${name}
Email:   ${email}
Subject: ${subject || "—"}

Message:
${message}
      `.trim(),
      html: `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="margin:0;padding:0;background:#f6f6f6;font-family:Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f6f6f6;padding:40px 0;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,0.08);">
          <!-- Header -->
          <tr>
            <td style="background:#6d28d9;padding:32px 40px;">
              <h1 style="margin:0;color:#ffffff;font-size:22px;font-weight:700;">New Portfolio Message</h1>
              <p style="margin:6px 0 0;color:#ede9fe;font-size:14px;">Someone reached out via your contact form</p>
            </td>
          </tr>
          <!-- Body -->
          <tr>
            <td style="padding:32px 40px;">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="padding-bottom:16px;border-bottom:1px solid #f0f0f0;">
                    <p style="margin:0 0 4px;font-size:12px;color:#9ca3af;text-transform:uppercase;letter-spacing:0.05em;">From</p>
                    <p style="margin:0;font-size:16px;font-weight:600;color:#111827;">${safe(name)}</p>
                    <a href="mailto:${safe(email)}" style="font-size:14px;color:#6d28d9;text-decoration:none;">${safe(email)}</a>
                  </td>
                </tr>
                ${subject ? `
                <tr>
                  <td style="padding:16px 0;border-bottom:1px solid #f0f0f0;">
                    <p style="margin:0 0 4px;font-size:12px;color:#9ca3af;text-transform:uppercase;letter-spacing:0.05em;">Subject</p>
                    <p style="margin:0;font-size:15px;color:#111827;">${safe(subject)}</p>
                  </td>
                </tr>` : ""}
                <tr>
                  <td style="padding-top:16px;">
                    <p style="margin:0 0 10px;font-size:12px;color:#9ca3af;text-transform:uppercase;letter-spacing:0.05em;">Message</p>
                    <div style="background:#f9fafb;border-left:3px solid #6d28d9;border-radius:4px;padding:16px 20px;font-size:15px;color:#374151;line-height:1.7;">
                      ${safe(message).replace(/\n/g, "<br>")}
                    </div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <!-- Footer -->
          <tr>
            <td style="background:#f9fafb;padding:20px 40px;border-top:1px solid #f0f0f0;">
              <p style="margin:0;font-size:12px;color:#9ca3af;text-align:center;">
                Sent via <a href="https://bikramkhatri.com.np" style="color:#6d28d9;text-decoration:none;">bikramkhatri.com.np</a> · Reply directly to this email to respond to ${safe(name)}
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
      `.trim(),
    }

    await transporter.sendMail(mailOptions)

    return NextResponse.json({ message: "Message sent successfully!" }, { status: 200 })
  } catch (error) {
    console.error("Contact form error:", error)
    return NextResponse.json(
      { message: "Failed to send message. Please try again or contact directly via email." },
      { status: 500 },
    )
  }
}
