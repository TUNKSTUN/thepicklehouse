import nodemailer from "nodemailer";
import { environment } from "~/environments/environment";

interface EmailParams {
  to_email: string;
  from_name: string;
  from_email: string;
  message: string;
}

export async function sendContactEmail(params: EmailParams): Promise<void> {
  const { to_email, from_name, from_email, message } = params;

  const smtpHost = environment.SMTP_HOST;
  const smtpPort = environment.SMTP_PORT ? parseInt(environment.SMTP_PORT) : 587;
  const smtpUser = environment.SMTP_USER;
  const smtpPass = environment.SMTP_PASS;
  const fromEmail = environment.FROM_EMAIL || smtpUser;

  if (!smtpHost || !smtpPort || !smtpUser || !smtpPass) {
    throw new Error("Missing required SMTP configuration (host, port, user, or password)");
  }

  const transporter = nodemailer.createTransport({
    host: smtpHost,
    port: smtpPort,
    secure: smtpPort === 465, // SSL for 465
    auth: {
      user: smtpUser,
      pass: smtpPass,
    },
  });

  const mailOptions = {
    from: `"${from_name}" <${fromEmail}>`,
    replyTo: from_email,
    to: to_email,
    subject: "New Contact Form Submission",
    text: `
New contact form submission:

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
    console.log(`Email sent successfully to ${to_email}`);
  } catch (error: any) {
    console.error("Error sending email:", error.message || error);
    throw new Error(`Failed to send email: ${error.message || "Unknown error"}`);
  }
}
