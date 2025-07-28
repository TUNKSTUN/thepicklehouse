import nodemailer from "nodemailer";
import { getEnv } from "../environments/environment";

interface EmailParams {
  to_email: string;
  from_name: string;
  from_email: string;
  phone: string;
  title: string
  message: string;
}

function generateContactEmailTemplate(params: EmailParams) {
  const { from_name, from_email, phone, title, message } = params;

  // Brand colors (converted to hex/rgba for email)
  const colors = {
    olived: "#403322", // hsl(80 30% 25%)
    olivedForeground: "#f8f6f0",
    primary: "#662626", // hsl(0 45% 30%)
    primaryForeground: "#f7f5f5",
    secondary: "#f2e5a0", // hsl(48 85% 75%)
    secondaryForeground: "#4d3d32",
    turmeric: "#f2db80",
    terracotta: "#d99980",
    spiceRed: "#e0664d",
    masalaBrown: "#8c6b4d",
  };

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Contact Form Submission - The House of Pickles</title>
  <style>
    body {
      margin: 0;
      padding: 0;
      font-family: Arial, sans-serif;
      background-color: #f5f5f5;
    }
    .email-container {
      max-width: 600px;
      margin: 20px auto;
      border: 1px solid ${colors.masalaBrown};
      border-radius: 8px;
      overflow: hidden;
      background-color: #ffffff;
    }
    .header {
      background-color: ${colors.primary};
      padding: 20px;
      text-align: center;
    }
    .header img {
      max-height: 60px;
      display: block;
      margin: 0 auto;
    }
    .header h1 {
      color: ${colors.primaryForeground};
      margin: 10px 0 0;
      font-size: 20px;
    }
    .content {
      padding: 20px;
      background-color: ${colors.olivedForeground};
      color: ${colors.olived};
    }
    .content h2 {
      color: ${colors.primary};
      margin-top: 0;
    }
    .content p {
      margin: 10px 0;
      line-height: 1.5;
    }
    .title-badge {
      display: inline-block;
      margin-top: 4px;
      padding: 6px 10px;
      background-color: ${colors.secondary};
      color: ${colors.secondaryForeground};
      border-radius: 4px;
      white-space: pre-wrap;
    }
    .message-box {
      padding: 10px;
      background-color: ${colors.secondary};
      color: ${colors.secondaryForeground};
      border-radius: 4px;
      white-space: pre-wrap;
      margin-top: 5px;
    }
    .footer {
      background-color: ${colors.masalaBrown};
      padding: 10px;
      text-align: center;
      font-size: 12px;
      color: #ffffff;
    }
  </style>
</head>
<body>
  <div class="email-container">
    <div class="header">
      <img src="cid:thoplogo" alt="The House of Pickles Logo" />
      <h1>The House of Pickles</h1>
    </div>

    <div class="content">
      <h2><strong>Title: </strong>${title}</h2>
      <p><strong>Name:</strong> ${from_name}</p>
      <p><strong>Email:</strong> ${from_email}</p>
      <p><strong>Phone:</strong> ${phone}</p>

      <p><strong>Message:</strong></p>
      <div class="message-box">${message}</div>
    </div>

    <div class="footer">
      This is an automated email from The House of Pickles website.
    </div>
  </div>
</body>
</html>
  `;
}

export async function sendContactEmail(params: EmailParams): Promise<void> {
  const env = getEnv();
  const smtpHost = env.SMTP_HOST;
  const smtpPort = env.SMTP_PORT ? parseInt(env.SMTP_PORT) : 587;
  const smtpUser = env.SMTP_USER;
  const smtpPass = env.SMTP_PASS;

  if (!smtpHost || !smtpPort || !smtpUser || !smtpPass) {
    throw new Error("Missing required SMTP configuration (host, port, user, or password)");
  }

  const transporter = nodemailer.createTransport({
    host: smtpHost,
    port: smtpPort,
    secure: smtpPort === 465,
    auth: { user: smtpUser, pass: smtpPass },
  });

  const mailOptions = {
    from: `"${params.from_name}" <${smtpUser}>`,
    replyTo: params.from_email,
    to: params.to_email,
    subject: "New Contact Form Submission - The House of Pickles",
    attachments: [
      {
        filename: "Logo.jpg",
        path: "app/assets/Logo.jpg", // Ensure this exists
        cid: "thoplogo",
      },
    ],
    html: generateContactEmailTemplate(params),
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Email sent successfully to ${params.to_email}`);
  } catch (error: any) {
    console.error("Error sending email:", error.message || error);
    throw new Error(`Failed to send email: ${error.message || "Unknown error"}`);
  }
}