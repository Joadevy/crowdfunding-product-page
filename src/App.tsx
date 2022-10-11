import { useEffect, useState } from "react";

function App() {
  const [bookmarked, setBookmarked] = useState<boolean>(false);

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
  }, []);

  return (
    <div className="App">
      <header className="flex justify-between items-start px-6 py-9 h-80 bg-mobile-hero bg-cover brightness-90 border-2 border-primary-moderate-cyan">
        <div className="flex justify-between w-full items-center">
          <img alt="" src="images/logo.svg" />
          <nav>
            <button className="justify-self-center lg:hidden">
              <img
                alt=""
                className="justify-self-center"
                src="images/icon-hamburger.svg"
              />
            </button>
          </nav>
        </div>
      </header>

      <main className="mx-8 mt-[-35px] rounded-lg shadow-lg bg-slate-100 brightness-100">
        <header className="flex flex-col px-5 gap-5 items-center ">
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
            <button
              className={
                bookmarked
                  ? "bg-primary-moderate-cyan rounded-full"
                  : "bg-red-500 rounded-full"
              }
              onClick={() => bookmarkToLocalStorage()}
            >
              {/* <img alt="" src="images/icon-bookmark.svg" /> */}
              BTN CTA
            </button>
          </div>
        </header>
        asd
      </main>
    </div>
  );
}

export default App;
