import app from "./config";
import {
  arrayRemove,
  arrayUnion,
  deleteDoc,
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
import { Title } from "@mui/icons-material";

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
  userEmail: string,
  articleId: string,
  content: string
) => {
  try {
    const docRef = await addDoc(collection(db, "comments"), {
      userId: userId,
      userEmail: userEmail,
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
  const comments = [];
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    // console.log(`${doc.id} => ${doc.data().}`);
    // console.log(doc.id, " => ", doc.data().content);
    comments.push({
      id: doc.id,
      data: doc.data(),
    });
  });
  console.log(comments);

  return comments;
};

// bookmark an article

export const BookmarkArticle = async (
  articleId: string,
  title: string,
  imageUrl: string,
  date: string
) => {
  console.log(user);

  if (user) {
    const uid = user.uid;
    const userDocRef = doc(db, "users", uid);

    try {
      await updateDoc(userDocRef, {
        bookmarks: arrayUnion({
          articleId: articleId,
          title: title,
          imageUrl: imageUrl,
          createdAt: date,
        }),
      });
      console.log("Bookmark added");
    } catch (error) {
      console.error("Error updating document: ", error);
    }
  } else {
    console.log("User is signed out or not available");
  }
};

export const GetAllBookmarks = async (): Promise<
  {
    articleId: string;
    title: string;
    imageUrl: string;
    createdAt: string;
  }[]
> => {
  const bookmarks: {
    articleId: string;
    title: string;
    imageUrl: string;
    createdAt: string;
  }[] = [];

  if (user) {
    const uid = user.uid;
    const q = query(collection(db, "users"), where("uid", "==", uid));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      const userBookmarks = doc.data().bookmarks;
      bookmarks.push(...userBookmarks);
    });
  }

  return bookmarks;
};

export const IsBookmarked = async (
  articleId: string,
  uid: string
): Promise<boolean> => {
  console.log(uid);
  if (!uid) {
    throw new Error("User is not logged in");
  }

  try {
    const userDocRef = doc(db, "users", uid);
    const userDocSnap = await getDoc(userDocRef);

    if (userDocSnap.exists()) {
      const userData = userDocSnap.data();
      if (userData && userData.bookmarks) {
        return userData.bookmarks.some(
          (bookmark: any) => bookmark.articleId === articleId
        );
      }
    }
    return false;
  } catch (error) {
    console.error("Error checking bookmark:", error);
    throw error;
  }
};

export const DeleteComment = async (commentId: string) => {
  try {
    const commentDocRef = doc(db, "comments", commentId);
    const commentDocSnap = await getDoc(commentDocRef);

    if (commentDocSnap.exists()) {
      const userIdFromComment = commentDocSnap.data().userId;

      if (user && userIdFromComment === user.uid) {
        await deleteDoc(commentDocRef);
        console.log("Comment deleted successfully");
      } else {
        console.log("Only the owner of the comment can delete it");
      }
    } else {
      console.log("Comment does not exist");
    }
  } catch (error) {
    console.error("Error deleting comment:", error);
  }
};

export const DeleteBookmark = async (userId: string, articleId: string) => {
  try {
    const userDocRef = doc(db, "users", userId);
    await updateDoc(userDocRef, {
      bookmarks: arrayRemove(articleId),
    });
    console.log("Bookmark deleted");
  } catch (error) {
    console.error("Error deleting bookmark:", error);
    throw error;
  }
};
