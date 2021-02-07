import admin from "firebase-admin";

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      project_id: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
      private_key: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/gu, "\n"),
      client_email: process.env.FIREBASE_CLIENT_EMAIL
    }),
    databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL
  });
}

const firebase = admin.firestore();
const FieldValue = admin.firestore.FieldValue;
const ServerValue = admin.firestore.ServerValue;

export { firebase, ServerValue, FieldValue };
