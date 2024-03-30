import { connectToDatabase } from "../../../lib/db";
const { ObjectId } = require("mongodb");

async function handler(req, res) {
  if (req.method === "DELETE") {
    const data = req.body;

    const { DeleteResponse } = data;
    //console.log(DeleteResponse);
    const responseobjectId = new ObjectId(DeleteResponse);
    const client = await connectToDatabase();

    const db = client.db();

    const result = await db.collection("ValidationResponse").deleteOne({
      _id: responseobjectId,
    });
    res.status(201).json({ message: "Response Deleted successfully" });
  } else {
    return;
  }
}

export default handler;
