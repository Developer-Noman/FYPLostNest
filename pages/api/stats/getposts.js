import { connectToDatabase } from "../../../lib/db";

async function handler(req, res) {
  if (req.method === "POST") {
    return;
  } else {
    try {
      const client = await connectToDatabase();

      const postedItemCollection = client.db().collection("PostedItem");
      const totalPostsCount = await postedItemCollection.countDocuments();
      const lostPostsCount = await postedItemCollection.countDocuments({
        Type: "Lost",
      });
      const foundPostsCount = await postedItemCollection.countDocuments({
        Type: "Found",
      });

      res.status(200).json({
        totalPosts: totalPostsCount,
        lostPosts: lostPostsCount,
        foundPosts: foundPostsCount,
      });
    } catch (error) {
      res.status(500).json({
        message:
          "Internal Server Error: Unable to fetch and Display Specific Posts",
      });
      return;
    }
  }
}

export default handler;
