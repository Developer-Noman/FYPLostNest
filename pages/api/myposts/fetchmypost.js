//import { getSession } from "next-auth/react";
import { connectToDatabase } from "../../../lib/db";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";

async function handler(req, res) {
  if (req.method === "POST") {
    return;
  } else {
    //const session = await getSession({ req: req });
    const session = await getServerSession(req, res, authOptions);
    if (!session) {
      res.status(401).json({ message: "Not authenticated!" });
      return;
    }
    const userEmail = session.user.email;
    try {
   
      const client = await connectToDatabase();

      const usersCollection = client.db().collection("PostedItem");

      const data = await usersCollection
        .find({
          posterEmail: userEmail,
        })
        .toArray();

      res.status(200).json(data);
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({
        message:
          "Internal Server Error: Unable to fetch and Display Specific Posts",
      });
      return;
    }
  }
}

export default handler;
