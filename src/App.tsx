import { useEffect, useState } from "react";

import Header from "./Components/Header";
import StatCard, { Stat } from "./Components/StatCard";

function App() {
  const [bookmarked, setBookmarked] = useState<boolean>(false);
  const [navbarModal, toggleNavbarModal] = useState<boolean>(false);
  const [data, setData] = useState<Stat[]>([]);
  const [status, setStatus] = useState<"loading" | "success">("loading");

  const bookmarkToLocalStorage = () => {
    const bookmarked = JSON.parse(localStorage.getItem("bookmarked") || "[]");

    if (bookmarked === true) {
      localStorage.removeItem("bookmarked");
      setBookmarked(false);
    } else {
      localStorage.setItem("bookmarked", "true");
      setBookmarked(true);
    }
  };

  useEffect(() => {
    const bookmarked = JSON.parse(localStorage.getItem("bookmarked") || "[]");

    if (bookmarked === true) setBookmarked(true);

    requestData();
  }, []);

  const requestData = async () => {
    const data = await fetch("data.json");
    const res = await data.json();

    if (res) {
      setData(res);
      setStatus("success");
    }
  };

  if (status === "loading") return <h2>Loading...</h2>;

  return (
    <div className={navbarModal ? "App" : "App"}>
      <Header navbarModal={navbarModal} toggleNavbarModal={toggleNavbarModal} />
      <main className="relative flex flex-col gap-10 mb-10">
        <header className="mx-8 shadow-md mt-[-35px] flex flex-col px-5 pb-7 gap-5 items-center rounded-lg bg-slate-100">
          <div className="mt-[-30px] max-w-max">
            <img alt="" src="images/logo-mastercraft.svg" srcSet="" />
          </div>
          <h1 className="text-center font-bold text-2xl">
            Mastercraft Bamboo Monitor Riser
          </h1>
          <p className="text-neutral-dark-gray text-center">
            A beautiful & handcrafted monitor stand to reduce neck and eye
            strain.
          </p>

          <div className="flex gap-2">
            <button className="px-9 bg-primary-moderate-cyan rounded-3xl text-slate-50 text-lg font-bold">
              Back this project
            </button>
            <button onClick={() => bookmarkToLocalStorage()}>
              <svg height="56" width="56" xmlns="http://www.w3.org/2000/svg">
                <g fill="none" fillRule="evenodd">
                  <circle
                    className="text-lg transition-colors"
                    cx="28"
                    cy="28"
                    fill={bookmarked ? "hsl(176, 72%, 28%)" : "#2F2F2F"}
                    r="28"
                  />
                  <path
                    d="M23 19v18l5-5.058L33 37V19z"
                    fill={bookmarked ? "hsl(176, 50%, 47%)" : "#B1B1B1"}
                  />
                </g>
              </svg>
            </button>
          </div>
        </header>

        <article className="mx-8 bg-slate-100 shadow-md p-5 flex flex-col gap-8 items-center justify-center">
          {data.map((element) => (
            <StatCard key={element.data} stats={element} />
          ))}
        </article>
      </main>
    </div>
  );
}

export default App;
