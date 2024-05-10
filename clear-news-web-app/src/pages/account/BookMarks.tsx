import React, { useEffect, useState } from "react";
import { GetAllBookmarks } from "../../firebase/apiFunctions";

export default function BookMarks() {
  const [bookmarks, setBookmarks] = useState([""]);

  useEffect(() => {
    const onBookmarks = async () => {
      try {
        const data: string[] = await GetAllBookmarks();

        setBookmarks(data);
      } catch (error) {
        console.log(error.message);
      }
    };
    onBookmarks();
  }, []);

  return <div>{bookmarks}</div>;
}
