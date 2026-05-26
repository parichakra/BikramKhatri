import { NextResponse } from "next/server"
import nodemailer from "nodemailer"

export async function POST(request) {
  try {
    const body = await request.json()
    const { name, email, message } = body

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

    // Create a transporter using the environment variables
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_SERVER_HOST,
      port: Number(process.env.EMAIL_SERVER_PORT),
      secure: Number(process.env.EMAIL_SERVER_PORT) === 465, // true for 465, false for other ports
      auth: {
        user: process.env.EMAIL_SERVER_USER,
        pass: process.env.EMAIL_SERVER_PASSWORD,
      },
    })

    // Create email content
    const mailOptions = {
      from: process.env.EMAIL_FROM,
      to: process.env.EMAIL_FROM, // Send to yourself
      replyTo: email,
      subject: `Portfolio Contact: ${name}`,
      text: `
Name: ${name}
Email: ${email}

Message:
${message}
      `,
      html: `
<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
  <h2 style="color: #6d28d9;">New Contact Form Submission</h2>
  <p><strong>Name:</strong> ${name}</p>
  <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
  <div style="margin-top: 20px; padding: 15px; background-color: #f3f4f6; border-radius: 5px;">
    <p><strong>Message:</strong></p>
    <p>${message.replace(/\n/g, "<br>")}</p>
  </div>
</div>
      `,
    }

    // Send the email
    await transporter.sendMail(mailOptions)

    return NextResponse.json({ message: "Message sent successfully!" }, { status: 200 })
  } catch (error) {
    console.error("Error sending message:", error)
    return NextResponse.json(
      { message: "Failed to send message. Please try again or contact directly via email." },
      { status: 500 },
    )
  }
}
