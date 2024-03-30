import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";
import { connectToDatabase } from "../../../lib/db";

async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }
  const client = await connectToDatabase();

  try {
    const session = await getServerSession(req, res, authOptions);
    if (!session) {
      return res.status(401).json({ message: "Not authenticated!" });
    }
    //console.log(session);
    //console.log(session.user);


    if (session.user.image) {
      return res.status(200).json(session.user);
    }

    const userEmail = session.user.email;

    const usersCollection = client.db().collection("users");
    const user = await usersCollection.findOne(
      { email: userEmail },
      { projection: { password: 0 } }
    );

  
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

export default handler;
