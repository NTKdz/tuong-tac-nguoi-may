import React, { useEffect, useState } from "react";
import { GetAllBookmarks } from "../../firebase/apiFunctions";
import NewsCardHori from "../../components/news-card/NewsCardHori";

export default function BookMarks() {
  const [bookmarks, setBookmarks] = useState([
    {
      articleId: "",
      title: "",
      imageUrl: "",
      createdAt: "",
    },
  ]);

  useEffect(() => {
    const onBookmarks = async () => {
      try {
        const data: {
          articleId: string;
          title: string;
          imageUrl: string;
          createdAt: string;
        }[] = await GetAllBookmarks();

        setBookmarks(data);
      } catch (error: any) {
        console.log(error.message);
      }
    };
    onBookmarks();
  }, []);

  return (
    <div>
      {bookmarks.map((bookmark) => {
        return (
          <NewsCardHori
            key={bookmark.articleId}
            id={bookmark.articleId}
            title={bookmark.title}
            dateTime={{ date: bookmark.createdAt, time: bookmark.createdAt }}
          />
        );
      })}
    </div>
  );
}
