import { getResponseDataById } from "../../../lib/db";

async function handler(req, res) {
  const PostId = req.query.postid;
  //console.log(PostId);
  if (req.method === "POST") {
    return;
  }

  if (req.method === "GET") {
    try {
      const documents = await getResponseDataById(PostId);

      res.status(200).json({
        responses: documents,
      });
    } catch (err) {
      res.status(500).json({
        message: "getting response failed",
      });
    }
  }
}

export default handler;
