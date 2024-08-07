import {
  getAuth,
  onAuthStateChanged,
  updatePassword,
  User,
} from "firebase/auth";
import {
  addDoc,
  arrayUnion,
  collection,
  deleteDoc,
  doc,
  DocumentData,
  getDoc,
  getDocs,
  getFirestore,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import app from "./config";

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
  const comments: { id: string; data: DocumentData; }[] = [];
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    // console.log(`${doc.id} => ${doc.data().}`);
    console.log(doc.id, " => ", doc.data().content);
    comments.push({
      id: doc.id,
      data: doc.data(),
    });
  });
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
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
        alert("Only the owner of the comment can delete it");
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
    const userDocSnap = await getDoc(userDocRef);

    if (userDocSnap.exists()) {
      const userData = userDocSnap.data();
      const bookmarks = userData.bookmarks || [];

      const updatedBookmarks = bookmarks.filter(
        (bookmark: DocumentData) => bookmark.articleId !== articleId
      );

      await updateDoc(userDocRef, {
        bookmarks: updatedBookmarks,
      });

      console.log("Bookmark deleted");
    } else {
      console.log("No such document!");
    }
  } catch (error) {
    console.error("Error deleting bookmark:", error);
    throw error;
  }
};

export const ChangePassword = async (newPassword: string) => {
  if (!user) {
    console.error("No authenticated user found.");
    return;
  }

  try {
    await updatePassword(user, newPassword);
    console.log("Password updated successfully.");
  } catch (error) {
    console.error("An error occurred while updating the password:", error);
  }
};

export const ChangeUsername = async (userId: string, newUsername: string) => {
  try {
    const q = query(collection(db, "users"), where("uid", "==", userId));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      const userDocRef = querySnapshot.docs[0].ref;

      await updateDoc(userDocRef, {
        username: newUsername,
      });

      console.log("Username updated successfully.");
    } else {
      console.error("User not found.");
    }
  } catch (error) {
    console.error("An error occurred while updating the username:", error);
  }
};
