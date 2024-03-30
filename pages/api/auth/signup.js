import { hashPassword } from "../../../lib/auth";
import { connectToDatabase } from "../../../lib/db";

async function handler(req, res) {
  if (req.method !== "POST") {
    return;
  }

  const data = req.body;

  const { email, password, enteredName } = data;

  if (!enteredName) {
    res.status(422).json({
      message: "Username not entered",
    });
    return;
  }

  if (!email || !email.includes("@")) {
    res.status(422).json({
      message: "Invalid Email",
    });
    return;
  }

  if (!password || password.trim().length < 7) {
    res.status(422).json({
      message:
        "Invalid input - password should also be at least 7 characters long.",
    });
    return;
  }

  const client = await connectToDatabase();
  if (client) {
    const db = client.db();

    const existingUser = await db.collection("users").findOne({ email: email });

    if (existingUser) {
      res.status(422).json({ message: "User exists already!" });

      return;
    }

    const hashedPassword = await hashPassword(password);

    const result = await db.collection("users").insertOne({
      name: enteredName,
      email: email,
      password: hashedPassword,
    });

    res.status(201).json({ message: "Created user!" });
  } else {
    console.error("Failed to connect to the database");
  }
}

export default handler;
