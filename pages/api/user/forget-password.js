import { connectToDatabase } from "../../../lib/db";
import Cryptr from "cryptr";
import cryptoRandomString from "crypto-random-string";
import { render } from "@react-email/render";
import Forget from "../../../components/ForgetEmail/forget";
const nodemailer = require("nodemailer");

async function handler(req, res) {
  if (req.method !== "POST") {
    return;
  }

  const userEmail = req.body.email;
  if (!userEmail) {
    res.status(404).json({ message: "Please enter email." });
    return;
  }
  //console.log(userEmail);
  const client = await connectToDatabase();

  const usersCollection = client.db().collection("users");

  const user = await usersCollection.findOne({ email: userEmail });

  if (!user) {
    res.status(404).json({ message: "No user found with this email." });
    return;
  }

  //   * Generate random string
  const randomStr = cryptoRandomString({
    length: 64,
    type: "alphanumeric",
  });
  const result = await usersCollection.updateOne(
    { email: userEmail },
    { $set: { randomString: randomStr } }
  );
  const crypt = new Cryptr(process.env.NEXTAUTH_SECRET);
  const encryptedEmail = crypt.encrypt(userEmail);

  const url = `${process.env.LOSTNESTAPP_URL}/reset-password/${encryptedEmail}?signature=${randomStr}`;
  const senderName = user.name;
  try {
    const html = render(
      Forget({
        url,
        senderName,
      })
    );

    const emailsender = "uettaxila@lostnest.xyz";
    const transporter = nodemailer.createTransport({
      port: 2525,
      secure: false,
      host: process.env.password_changehost,
      auth: {
        user: process.env.password_changeusername,
        pass: process.env.password_changepass,
      },
    });

    const to = userEmail;
    const subject = "LostNest - Password Reset Alert";

    // Set up email options
    const mailOptions = {
      from: emailsender,
      to,
      subject: subject,
      html: html,
    };

    const info = await transporter.sendMail(mailOptions);
    res.status(200).json({
      success: true,
      message: "Email sent successfully. Please check your inbox.",
    });
  } catch (error) {
    res.status(500).json({ error: "Something went wrong.please try again!" });
  }
}

export default handler;
