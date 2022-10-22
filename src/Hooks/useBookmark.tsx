import { useEffect, useState } from "react";

const useBookmark = () => {
  const [bookmarked, setBookmarked] = useState<boolean>(false);

  useEffect(() => {
    const bookmarked = JSON.parse(localStorage.getItem("bookmarked") || "[]");

    if (bookmarked === true) setBookmarked(true);
  }, []);

  const handleBookmark = () => {
    const bookmarked = JSON.parse(localStorage.getItem("bookmarked") || "[]");

    if (bookmarked === true) {
      localStorage.removeItem("bookmarked");
      setBookmarked(false);
    } else {
      localStorage.setItem("bookmarked", "true");
      setBookmarked(true);
    }
  };

  return { bookmarked, handleBookmark };
};

export default useBookmark;
