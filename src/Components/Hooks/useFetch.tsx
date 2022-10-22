import { useEffect, useState } from "react";

function useFetch(url: string) {
  const [fetchData, setFetchData] = useState(null); // we set it to null since we don't know what type of data we will receive
  const [loading, setLoading] = useState<"success" | "loading">("loading");

  useEffect(() => {
    requestData();
  }, [url]); //dependency array will be url since we just wanna make new request only when the url changes

  const requestData = async () => {
    const data = await fetch(url);
    const dataRes = await data.json();

    if (dataRes) {
      setFetchData(dataRes);
      setLoading("success");
    }
  };

  return { fetchData, loading, setFetchData }; // we return the state and data we fetched
}
export default useFetch;
