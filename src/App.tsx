import type { infoReward } from "./Components/Pledge/Reward";

import { useState } from "react";

import Header from "./Components/Header";
import StatCard from "./Components/StatCard";
import Reward from "./Components/Pledge/Reward";
import { Thanks } from "./Components/Thanks";
import { usePledge } from "./Hooks/usePledge";
import useBookmark from "./Hooks/useBookmark";

function App() {
  const { bookmarked, handleBookmark } = useBookmark();
  const { addPledge, pledges, status, data } = usePledge();
  const { daysLeft, totalBackers, amountBacked } = data;
  const [thanksModal, toggleThanksModal] = useState<boolean>(false);

  const handleThanksModal = () => {
    toggleThanksModal(!thanksModal);
  };

  if (status === "loading") return <h2 className="text-center"> Loading...</h2>;

  return (
    <div>
      <Header />
      <main className="mx-7 relative flex flex-col gap-10 mb-28 lg:w-[55%] lg:m-auto">
        <header className="shadow-md -mt-9 flex flex-col px-5 pb-7 gap-5 items-center rounded-lg bg-slate-100 lg:bg-slate-50 lg:-mt-28 lg:rounded-xl lg:shadow-none lg:mb-10">
          <div className="mt-[-30px] max-w-max">
            <img alt="" src="images/logo-mastercraft.svg" srcSet="" />
          </div>
          <h1 className="text-center font-bold text-2xl lg:text-3xl lg:mt-6">
            Mastercraft Bamboo Monitor Riser
          </h1>
          <p className="text-neutral-dark-gray text-center lg:text-lg">
            A beautiful & handcrafted monitor stand to reduce neck and eye
            strain.
          </p>

          <div className="flex gap-2 w-full justify-between items-center lg:w-11/12 lg:justify-between lg:mt-4">
            <a
              className="px-7 lg:px-9 py-4 bg-primary-moderate-cyan rounded-3xl text-slate-50 text-lg font-bold hover:bg-primary-dark-cyan transition-colors  "
              href="#selection"
            >
              <p className="text-center text-base lg:text-lg">
                Back this project
              </p>
            </a>
            <button
              className={
                "flex items-center lg:gap-4 lg:w-48 transition-colors " +
                (!bookmarked ? "hover:opacity-60" : "")
              }
              onClick={() => handleBookmark()}
            >
              <svg height="56" width="56" xmlns="http://www.w3.org/2000/svg">
                <g fillRule="evenodd">
                  <circle
                    cx="28"
                    cy="28"
                    fill={bookmarked ? "hsl(176, 72%, 28%)" : "#2F2F2F"}
                    r="28"
                  />
                  <path
                    d="M23 19v18l5-5.058L33 37V19z"
                    fill={bookmarked ? "#FFFFFF" : "#B1B1B1"}
                  />
                </g>
              </svg>
              {bookmarked ? (
                <span className="hidden lg:block text-lg text-primary-dark-cyan font-bold">
                  Bookmarked
                </span>
              ) : (
                <span className="hidden lg:block text-lg text-neutral-dark-gray font-bold">
                  Bookmark
                </span>
              )}
            </button>
          </div>
        </header>

        <article className="bg-slate-100 shadow-md py-5 flex flex-col gap-8 items-center lg:items-start lg:bg-slate-50 lg:shadow-none lg:w-11/12 lg:m-auto lg:mb-20">
          <div className="flex flex-col gap-8 items-center justify-center lg:flex-row lg:gap-20">
            <StatCard
              data={amountBacked.toLocaleString("en-US", {
                style: "currency",
                currency: "USD",
                minimumFractionDigits: 0,
                maximumFractionDigits: 0,
              })}
              desc="of $100,000 backed"
            />

            <hr className="hidden lg:block border-[0.25px] border-text-dark-gray h-16" />

            <StatCard
              data={totalBackers.toLocaleString("en-US")}
              desc="total backers"
            />

            <hr className="hidden lg:block border-[0.25px] border-text-dark-gray h-16" />

            <StatCard data={daysLeft} desc="days left" />
          </div>
          <div className="rounded-xl bg-slate-200 w-full h-4 lg:w-5/6">
            <div
              className="bg-primary-moderate-cyan h-4 rounded-xl"
              style={{ width: `${(amountBacked * 100) / 100000}%` }}
            />
          </div>
        </article>

        <article className="lg:w-11/12 lg:m-auto">
          <h2 className="text-xl font-bold mb-5 lg:text-2xl">
            About this project
          </h2>
          <p className="mb-5 text-neutral-dark-gray lg:text-lg lg:leading-relaxed lg:mt-10">
            The Mastercraft Bamboo Monitor Riser is a sturdy and stylish
            platform that elevates your screen to a more comfortable viewing
            height. Placing your monitor at eye level has the potential to
            improve your posture and make you more comfortable while at work,
            helping you stay focused on the task at hand.
          </p>
          <p className="text-neutral-dark-gray lg:text-lg lg:leading-relaxed lg:mb-10">
            Featuring artisan craftsmanship, the simplicity of design creates
            extra desk space below your computer to allow notepads, pens, and
            USB sticks to be stored under the stand.
          </p>
          <div
            className="mt-10 flex flex-col gap-5 lg:gap-8 lg:mb-40"
            id="selection"
          >
            {pledges.map((pledge: infoReward) => (
              <Reward
                key={pledge.id}
                addPledge={addPledge}
                pledges={pledges}
                reward={pledge}
                toggleThanksModal={handleThanksModal}
              />
            ))}
          </div>
        </article>

        {thanksModal && <Thanks toggleModal={handleThanksModal} />}
      </main>
    </div>
  );
}

export default App;
