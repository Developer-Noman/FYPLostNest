import { connectToDatabase } from "../../../lib/db";
import { hashPassword } from "../../../lib/auth";
import Cryptr from "cryptr";

async function handler(req, res) {
  if (req.method !== "POST") {
    return;
  }

  const encryptedEmailId = req.body.email;
  const signature = req.body.signature;
  const OPass = req.body.password;
  const CPass = req.body.password_confirmation;

  if (OPass !== CPass) {
    res.status(404).json({ message: "Passwords entered do not match." });
    return;
  }
  if (!CPass || CPass.trim().length < 7) {
    res.status(422).json({
      message: "Invalid - Password should be at least 7 characters.",
    });
    return;
  }

  if (!encryptedEmailId || !signature) {
    res.status(404).json({ message: "Something is missing in URL." });
    return;
  }

  const crypt = new Cryptr(process.env.NEXTAUTH_SECRET);
  const encryptedEmail = crypt.decrypt(encryptedEmailId);

  const client = await connectToDatabase();

  const usersCollection = client.db().collection("users");

  const user = await usersCollection.findOne({
    email: encryptedEmail,
    randomString: signature,
  });

  if (!user || user == null || user == undefined) {
    res
      .status(404)
      .json({ message: "Reset url is not correct. pls double check it." });
    return;
  }

  const hashedPassword = await hashPassword(CPass);

  const result = await usersCollection.updateOne(
    { email: encryptedEmail },
    { $set: { password: hashedPassword, randomString: null } }
  );

  res.status(200).json({ message: "Password updated!" });
}

export default handler;
