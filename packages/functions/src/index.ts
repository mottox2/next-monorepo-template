import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//

admin.initializeApp();

export const helloWorld = functions.https.onRequest((request, response) => {
  functions.logger.info("Hello logs!", { structuredData: true });
  response.send("Hello from Firebase!");
});

// emulator環境においてfunction emulator以外からidTokenのverifyが取れないため
export const getUid = functions.https.onRequest(async (request, response) => {
  const token = request.query.token as string;
  let uid: string | null = null;
  try {
    const decoded = await admin.auth().verifyIdToken(token);
    uid = decoded.uid;
  } catch (e) {
    console.error(e);
  }
  response.json({ uid });
});

export const createUser = functions.auth.user().onCreate((user) => {
  const { uid, email, displayName } = user;
  return admin.firestore().collection("users").doc(uid).create({
    uid,
    email,
    displayName,
  });
});

export const deleteUser = functions.auth.user().onDelete((user) => {
  return admin.firestore().collection("users").doc(user.uid).delete();
});
