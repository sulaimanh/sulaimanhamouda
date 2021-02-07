import { firebase } from "@/lib/firebase";

export default async function handler(req, res) {
  if (req.method === "GET") {
    const snapshot = await firebase.collection("comments").get();

    const arr = [];
    snapshot.docs.forEach((doc) => {
      arr.push(...doc.data().comments);
    });
    return res.status(200).json({ arr });
  }

  if (req.method === "POST") {
    const slug = req.body.slug;
    const timestamp = req.body.timestamp;
    const status = req.body.status;

    const docRef = firebase.collection("comments").doc(slug);
    const arr = await firebase.runTransaction(async (transaction) => {
      const doc = await transaction.get(docRef);
      const comments = doc.data().comments.map((comment) => {
        if (comment.timestamp === timestamp) {
          comment.status = status;
        }
        return comment;
      });
      transaction.update(docRef, { comments: comments });
      return comments;
    });
    return res.status(200).json({ arr });
  }
}
