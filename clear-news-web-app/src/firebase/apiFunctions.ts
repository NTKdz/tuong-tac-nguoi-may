import app from "./config";
import {
  arrayUnion,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { collection, addDoc } from "firebase/firestore";
import { getAuth, onAuthStateChanged, User } from "firebase/auth";

const db = getFirestore(app);
const auth = getAuth();
// const user = auth.currentUser;
let user: User | null = null;
onAuthStateChanged(auth, (currentUser) => {
  user = currentUser;
  if (user) {
    console.log("User is signed in", user);
  } else {
    console.log("No user signed in");
  }
});

// Create new comment
export const CreateComment = async (
  userId: string,
  articleId: string,
  content: string
) => {
  try {
    const docRef = await addDoc(collection(db, "comments"), {
      userId: userId,
      articleId: articleId,
      content: content,
      createAt: new Date(),
    });
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

// return all comments in a specific article
export const GetAllCommentsOfArticle = async (articleId: string) => {
  const q = query(
    collection(db, "comments"),
    where("articleId", "==", articleId)
  );
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    // console.log(`${doc.id} => ${doc.data().}`);
    console.log(doc.id, " => ", doc.data().content);
  });
};

// bookmark an article
export const BookmarkArticle = async (articleId: string) => {
  console.log(user);

  if (user) {
    const uid = user.uid;
    const userDocRef = doc(db, "users", uid);

    try {
      await updateDoc(userDocRef, {
        // await updateDoc(userDocRef, {
        bookmarks: arrayUnion(articleId),
      });
      console.log("Bookmark added");
    } catch (error) {
      console.error("Error updating document: ", error);
    }
  } else {
    console.log("User is signed out or not available");
  }
};

export const GetAllBookmarks = async () => {
  if (user) {
    const uid = user.uid;
    const q = query(collection(db, "users"), where("uid", "==", uid));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      console.log(doc.id, " => ", doc.data().bookmarks);
    });
  }
};
