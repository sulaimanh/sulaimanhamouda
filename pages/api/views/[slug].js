import { firebase } from "@/lib/firebase";

export default async (req, res) => {
  if (req.method === "POST") {
    const slug = req.query.slug;
    const docRef = firebase.collection("views").doc(slug);

    const views = await firebase.runTransaction(async (transaction) => {
      // This code may get re-run multiple times if there are conflicts.
      const doc = await transaction.get(docRef);
      if (!doc.exists) {
        docRef.set({ views: 2 });
        return 2;
      }
      transaction.update(docRef, { views: doc.data().views + 1 });
      return doc.data().views + 1;
    });

    return res.status(200).json({
      views: views
    });
  }

  if (req.method === "GET") {
    const doc = await firebase.collection("views").doc(req.query.slug).get();
    return res.status(200).json({ ...doc.data() });
  }
};
