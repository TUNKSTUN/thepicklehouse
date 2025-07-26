import nodemailer from "nodemailer";
import { environment } from "../environments/environment";

interface EmailParams {
  to_email: string;
  from_name: string;
  from_email: string;
  message: string;
}

/**
 * Sends an email notification using Nodemailer.
 * @param params - Email parameters (to_email, from_name, from_email, message).
 * @throws Error if email sending fails or configuration is missing.
 */
export async function sendContactEmail(params: EmailParams): Promise<void> {
  const { to_email, from_name, from_email, message } = params;

  const smtpHost = environment.SMTP_HOST;
  const smtpPort = environment.SMTP_PORT
    ? parseInt(environment.SMTP_PORT)
    : 587;
  const smtpUser = environment.SMTP_USER;
  const smtpPass = environment.SMTP_PASS;
  const fromEmail = environment.FROM_EMAIL || "no-reply@houseofpickles.in";

  if (!smtpHost || !smtpUser || !smtpPass) {
    throw new Error("Nodemailer SMTP configuration is missing");
  }

  // Create Nodemailer transporter
  const transporter = nodemailer.createTransport({
    host: smtpHost,
    port: smtpPort,
    secure: smtpPort === 465, // Use SSL for port 465, TLS otherwise
    auth: {
      user: smtpUser,
      pass: smtpPass,
    },
  });

  // Email options
  const mailOptions = {
    from: `"${from_name}" <${fromEmail}>`,
    replyTo: from_email,
    to: to_email,
    subject: "New Contact Form Submission",
    text: `
      You have received a new contact form submission:

      Name: ${from_name}
      Email: ${from_email}
      Message: ${message}
    `,
    html: `
      <h2>New Contact Form Submission</h2>
      <p><strong>Name:</strong> ${from_name}</p>
      <p><strong>Email:</strong> ${from_email}</p>
      <p><strong>Message:</strong> ${message}</p>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Email sent successfully to", to_email);
  } catch (error) {
    console.error("Error sending email:", error);
    throw new Error("Failed to send email notification");
  }
}
