import { firebase } from "@/lib/firebase";

export default async (req, res) => {
  const snapshot = await firebase.collection("views").get();
  const obj = {};
  snapshot.docs.forEach((doc) => {
    obj[doc.id] = doc.data().views;
  });
  return res.status(200).json(obj);
};
