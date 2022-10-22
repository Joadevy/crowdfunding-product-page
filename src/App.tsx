import type { infoBackers } from "./types";
import type { infoReward } from "./Components/Reward";

import { useEffect, useState } from "react";

import Header from "./Components/Header";
import StatCard from "./Components/StatCard";
import Reward from "./Components/Reward";
import { Thanks } from "./Components/Thanks";

function App() {
  const [bookmarked, setBookmarked] = useState<boolean>(false);
  const [data, setData] = useState<infoBackers>({
    amountBacked: 0,
    totalBackers: 0,
    daysLeft: 0,
  });
  const [pledges, setPledges] = useState<infoReward[]>([]);
  const [status, setStatus] = useState<"loading" | "success">("loading");
  const [amountBacked, setAmountBacked] = useState<number>(0);
  const [totalBackers, setTotalBackers] = useState<number>(0);
  const [thanksModal, toggleThanksModal] = useState<boolean>(false);

  useEffect(() => {
    const bookmarked = JSON.parse(localStorage.getItem("bookmarked") || "[]");

    if (bookmarked === true) setBookmarked(true);

    requestData();
  }, []);

  const requestData = async () => {
    const data = await fetch("data.json");
    const dataRes = await data.json();
    const pledges = await fetch("pledges.json");
    const dataPledges = await pledges.json();

    if (dataRes && dataPledges) {
      setPledges(dataPledges);
      setData(dataRes);
      setAmountBacked(dataRes.amountBacked);
      setTotalBackers(dataRes.totalBackers);
      setStatus("success");
    }
  };

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

  const addBacker = () => {
    if (amountBacked !== 100000) setTotalBackers(totalBackers + 1);
  };

  const addAmountBacked = (amount: number) => {
    if (amountBacked + amount <= 100000) {
      setAmountBacked(amountBacked + amount);

      return true;
    } else if (amountBacked !== 100000) {
      setAmountBacked(100000);

      return true;
    }

    return false;
  };

  const updateStock = (id: number) => {
    let pledgesUpdated = pledges.map((pledge) => {
      if (pledge.id === id && pledge.amount) {
        pledge.amount--;
      }

      return pledge;
    });

    setPledges(pledgesUpdated);
  };

  const addPledge = (idPledge: number, amount: number) => {
    // Pledge with id = 0 doesn't have reward so doesn't need to update stock
    if (idPledge === 0 && addAmountBacked(amount)) {
      addBacker();
    } else {
      for (let pledge of pledges) {
        if (pledge.id === idPledge && addAmountBacked(amount)) {
          addBacker();
          updateStock(idPledge);
        }
      }
    }
  };

  const handleThanksModal = () => {
    toggleThanksModal(!thanksModal);
  };

  if (status === "loading") return <h2 className="text-center"> Loading...</h2>;

  return (
    <div>
      <Header />
      <main className="mx-10 relative flex flex-col gap-10 mb-28">
        <header className="shadow-md mt-[-35px] flex flex-col px-5 pb-7 gap-5 items-center rounded-lg bg-slate-100">
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

          <div className="flex gap-2 items-center">
            <a
              className="px-9 py-4 bg-primary-moderate-cyan rounded-3xl text-slate-50 text-lg font-bold hover:bg-primary-dark-cyan transition-colors  "
              href="#selection"
            >
              <p>Back this project</p>
            </a>
            <button onClick={() => bookmarkToLocalStorage()}>
              <svg height="56" width="56" xmlns="http://www.w3.org/2000/svg">
                <g className="hover:grayscale" fill="none" fillRule="evenodd">
                  <circle
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

        <article className="bg-slate-100 shadow-md py-5 flex flex-col gap-8 items-center justify-center">
          <StatCard
            data={amountBacked.toLocaleString("en-US", {
              style: "currency",
              currency: "USD",
              minimumFractionDigits: 0,
              maximumFractionDigits: 0,
            })}
            desc="of $100,000 backed"
          />
          <StatCard
            data={totalBackers.toLocaleString("en-US")}
            desc="total backers"
          />
          <StatCard data={data.daysLeft} desc="days left" />
          <div className="rounded-xl bg-slate-200 w-full h-4">
            <div
              className="bg-primary-moderate-cyan h-4 rounded-xl"
              style={{ width: `${(amountBacked * 100) / 100000}%` }}
            />
          </div>
        </article>

        <article>
          <h2 className="text-xl font-bold mb-5">About this project</h2>
          <p className="mb-5 text-neutral-dark-gray">
            The Mastercraft Bamboo Monitor Riser is a sturdy and stylish
            platform that elevates your screen to a more comfortable viewing
            height. Placing your monitor at eye level has the potential to
            improve your posture and make you more comfortable while at work,
            helping you stay focused on the task at hand.
          </p>
          <p className="text-neutral-dark-gray">
            Featuring artisan craftsmanship, the simplicity of design creates
            extra desk space below your computer to allow notepads, pens, and
            USB sticks to be stored under the stand.
          </p>
          <div className="mt-10 flex flex-col gap-5" id="selection">
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

        {thanksModal ? <Thanks toggleModal={handleThanksModal} /> : null}
      </main>
    </div>
  );
}

export default App;
