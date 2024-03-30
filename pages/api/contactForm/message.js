import { connectToDatabase } from "../../../lib/db";

async function handler(req, res) {
  if (req.method !== "POST") {
    return;
  }

  const data = req.body;

  const { email, message, enteredName } = data;

  if (!enteredName) {
    res.status(422).json({
      message: "Please Enter your Name",
    });
    return;
  }

  if (!message) {
    res.status(422).json({
      message: "Message not Entered",
    });
    return;
  }
  if (!email.includes("@") || !email) {
    res.status(422).json({
      message: "Invalid Email address",
    });
    return;
  }

  const client = await connectToDatabase();

  const db = client.db();

  const result = await db.collection("ContactForm").insertOne({
    name: enteredName,
    email: email,
    Message: message,
  });

  res.status(201).json({ message: "Created user!" });
}

export default handler;
