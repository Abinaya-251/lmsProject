import nodemailer from "nodemailer";
import dotenv from "dotenv";
import path from "path";
import ejs from "ejs";
dotenv.config();
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const sendMail = async (options) => {
  try {
    // Create a nodemailer transport object to handle the email sending
    // The transport object is configured with SMTP settings loaded from environment variables
    const transport = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT || "587",
      service: process.env.SMTP_SERVICE,
      auth: {
        user: process.env.SMTP_MAIL,
        pass: process.env.SMTP_PASSWORD,
      },
    });
    // Destructure the options object
    const { email, subject, template, data } = options;

    // Get the template file
    const templateFile = path.join(__dirname, "../Mails", template);

    // Render the EJS template file
    const html = await ejs.renderFile(templateFile, data);

    const mailOptions = {
      from: process.env.SMTP_MAIL,
      to: email,
      subject,
      html,
    };

    await transport.sendMail(mailOptions);
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

export default sendMail;
