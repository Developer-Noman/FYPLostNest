import { connectToDatabase } from "../../../lib/db";
//import { getSession } from "next-auth/react";
import { authOptions } from "../auth/[...nextauth]";
import { getServerSession } from "next-auth/next";
async function handler(req, res) {
  if (req.method === "POST") {
    const data = req.body;

    const {
      enteredInformations,
      ItemTitle,
      PostID,
      PosterID,
      Question,
      combinedDateTime,
      Answer,
    } = data;

    const enteredContact = enteredInformations
      ? enteredInformations
      : "Responder has nullified the validation.";

    if (!enteredContact) {
      res.status(422).json({
        message: "Please Enter Contact details",
      });
      return;
    }

    const client = await connectToDatabase();

    const db = client.db();

    const result = await db.collection("ValidationResponse").insertOne({
      enteredContact,
      ItemTitle,
      PostID,
      PosterID,
      Question,
      ValidatorDateTime: combinedDateTime,
      Answer,
    });

    res
      .status(201)
      .json({ message: "Contact Information stored successfully" });
  } else {
   // const session = await getSession({ req: req });
   const session = await getServerSession(req, res, authOptions);
    if (!session) {
      res.status(401).json({ message: "Not authenticated!" });
      return;
    }
    const userEmail = session.user.email;
    try {
      //const data = await getPostsByEmail(userEmail);
      const client = await connectToDatabase();

      const usersCollection = client.db().collection("ValidationResponse");

      const data = await usersCollection
        .find({
          PosterID: userEmail,
        })
        .toArray();

      res.status(200).json(data);
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({
        message: "Internal Server Error: Unable to fetch and Display Responses",
      });
      return;
    }
  }
}

export default handler;
