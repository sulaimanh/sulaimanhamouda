import { firebase } from "@/lib/firebase";

export default async function handler(req, res) {
  if (req.method === "GET") {
    const doc = await firebase.collection("upcoming").doc("description").get();

    return res.status(200).json(doc.data().desc);
  }

  if (req.method === "POST") {
    const { description } = req.body;
    const docRef = firebase.collection("upcoming").doc("description");
    await docRef.update({ desc: description });

    return res.status(200).json({ status: "Upcoming post message updated" });
  }
}
