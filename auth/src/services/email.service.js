import { google } from "googleapis";
import config from "../config/config.js";

console.log("DEBUG OAUTH PARAMS:", {
  hasClientId: Boolean(config.client_id || process.env.CLIENT_ID),
  hasClientSecret: Boolean(config.client_secret || process.env.CLIENT_SECRET),
  hasRefreshToken: Boolean(process.env.REFRESH_TOKEN),
  refreshTokenSnippet: process.env.REFRESH_TOKEN
    ? process.env.REFRESH_TOKEN.slice(0, 10) + "..."
    : "MISSING",
});

const oauth2Client = new google.auth.OAuth2(
    config.client_id,
    config.client_secret,
  'https://developers.google.com/oauthplayground'
);

oauth2Client.setCredentials({
  refresh_token: config.refresh_token,
});

// // Verify the connection configuration
// transporter.verify((error, success) => {
//   if (error) {
//     console.error("Error connecting to email server:", error);
//   } else {
//     console.log("Email server is ready to send messages");
//   }
// });

const gmail = google.gmail({ version: "v1", auth: oauth2Client });

// Function to send email
// export const sendEmail = async (to, subject, text, html) => {
//   try {
//     const info = await transporter.sendMail({
//       from: `"Your Name" <${config.google_user}>`, // sender address
//       to, // list of receivers
//       subject, // Subject line
//       text, // plain text body
//       html, // html body
//     });

//     console.log("Message sent: %s", info.messageId);
//     console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
//   } catch (error) {
//     console.error("Error sending email:", error);
//   }
// };


export async function sendOtpEmail(to, otp) {
  try {
    const utf8Subject = `=?utf-8?B?${Buffer.from("Your OTP Code").toString("base64")}?=`;
    const messageParts = [
      `From: "Auth Service" <${config.google_user}>`, // Replace with the Google account email that generated the OAuth token
      `To: ${to}`,
      "Content-Type: text/html; charset=utf-8",
      "MIME-Version: 1.0",
      `Subject: ${utf8Subject}`,
      "",
      `<p>Your OTP code is: <strong>${otp}</strong>. It expires in 5 minutes.</p>`,
    ];
    const message = messageParts.join("\n");

    const encodedMessage = Buffer.from(message)
      .toString("base64")
      .replace(/\+/g, "-")
      .replace(/\//g, "_")
      .replace(/=+$/, "");

    return await gmail.users.messages.send({
      userId: "me",
      requestBody: { raw: encodedMessage },
    });
  }
  catch (err) {
    // THIS PRINTS THE REAL GOOGLE API ERROR:
    console.error("--> GOOGLE API CRASH REASON:", JSON.stringify(err.response?.data || err.message, null, 2));
    throw err;
  }
}
