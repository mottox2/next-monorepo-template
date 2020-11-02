import type { NextApiRequest, NextApiResponse } from "next";
import admin from "firebase-admin";

const projectId = "mottox2-sandbox";

if (!admin.apps.length) {
  admin.initializeApp({
    projectId,
  });
}

// emulator環境でidTokenからuidを取り出すためのworkaround
// https://firebase.google.com/docs/auth/admin/verify-id-tokens#node.js
const getUidFromFunctions = async (token: string) => {
  const uidRes = await fetch(
    `http://localhost:5001/${projectId}/us-central1/getUid?token=${token}`
  );
  const { uid } = await uidRes.json();
  return uid;
};

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const token = req.query.token as string;

  let uid: string | null = null;
  if (process.env.NODE_ENV === "development") {
    uid = await getUidFromFunctions(token);
  } else {
    const decoded = await admin.auth().verifyIdToken(token);
    if (decoded) uid = decoded.uid;
  }

  res.statusCode = 200;
  res.json({ name: "John Doe", uid });
};
