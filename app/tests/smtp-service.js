import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // TLS
    auth: {
        user: "ykinwork1@gmail.com",
        pass: "nrkteykeunutrtfo", // 16-char Google App Password
    },
});

async function main() {
    try {
        await transporter.verify();
        console.log("SMTP connection successful.");
    } catch (err) {
        console.error("SMTP connection failed:", err);
    }
}

main();
