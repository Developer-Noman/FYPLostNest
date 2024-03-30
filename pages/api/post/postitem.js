import { connectToDatabase, getAllPosts } from "../../../lib/db";

import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";

async function handler(req, res) {
  if (req.method === "POST") {
    const data = req.body;

    const session = await getServerSession(req, res, authOptions);
    if (!session) {
      res.status(401).json({ message: "Not authenticated!" });
      return;
    }

    const posterEmail = session.user.email;
    const { Type, Category, Title, Description, Question, Date, ReducedImg } =
      data;

    if (!ReducedImg) {
      return res
        .status(400)
        .json({ message: "Please upload an image to continue." });
    }

    if (
      !Type ||
      !Category ||
      !Title ||
      !Description ||
      !Question ||
      !Date ||
      !ReducedImg
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const client = await connectToDatabase();

    const db = client.db();

    const result = await db.collection("PostedItem").insertOne({
      Type: Type,
      Category: Category,
      Title: Title,
      Description: Description,
      Question: Question,
      Date: Date,
      ReducedImg: ReducedImg,
      posterEmail: posterEmail,
    });

    res.status(201).json({ message: "Item Posted Successfully!" });
  } else {
    try {
      const data = await getAllPosts();
      res.status(200).json(data);
      
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({
        message: "Internal Server Error: Unable to fetch and Display Posts",
      });
    }
  }
}

export default handler;
