import { FieldValue, ServerValue, firebase } from "@/lib/firebase";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { social, message, name, slug, today, time, isAdmin } = req.body;

    const docRef = firebase.collection("comments").doc(slug);
    await firebase.runTransaction(async (transaction) => {
      const doc = await transaction.get(docRef);
      if (!doc.exists) {
        transaction.set(docRef, {
          comments: [
            {
              slug: slug,
              name: isAdmin ? "Sulaiman Hamouda (Author)" : name,
              social: social,
              message: message,
              status: isAdmin ? "APPROVED" : "NEEDS APPROVAL",
              date: today,
              timestamp: time
            }
          ]
        });
      } else {
        transaction.update(docRef, {
          comments: FieldValue.arrayUnion({
            slug: slug,
            name: isAdmin ? "Sulaiman Hamouda (Author)" : name,
            social: social,
            message: message,
            status: isAdmin ? "APPROVED" : "NEEDS APPROVAL",
            date: today,
            timestamp: time
          })
        });
      }
    });

    return res.status(200).json({ error: "" });
  }

  if (req.method === "GET") {
    const doc = await firebase
      .collection("comments")
      .doc(req.headers.slug)
      .get();

    if (doc.exists) {
      return res.status(200).json({ ...doc.data() });
    } else {
      return res.status(200).json({ comments: [] });
    }
  }
}
