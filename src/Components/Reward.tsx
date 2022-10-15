import { FC } from "react";

export type infoReward = {
  title: string;
  pledge: number;
  desc: string;
  amount: number;
};

type props = { reward: infoReward };

const Reward: FC<props> = ({ reward }) => {
  const { title, pledge, desc, amount } = reward;

  return (
    <div
      className={
        "shadow rounded-lg border-2 p-7 flex flex-col gap-7 " +
        (amount ? "" : "grayscale")
      }
    >
      <header>
        <h3 className="text-lg font-bold">{title}</h3>
        <p className="text-lg font-semibold text-primary-moderate-cyan">
          Pledge ${pledge} or more
        </p>
      </header>
      <p className="text-neutral-dark-gray text-lg font-normal">{desc}</p>
      <p className="text-neutral-dark-gray flex items-center gap-2 text-xl">
        <span className="text-neutral-black text-4xl font-bold">{amount}</span>{" "}
        left
      </p>
      <button
        className="px-6 py-3 w-2/3 bg-primary-moderate-cyan rounded-3xl text-slate-50 text-lg font-bold"
        onClick={amount ? () => console.log("OPEN MODAL") : () => null}
        onKeyPress={amount ? () => console.log("OPEN MODAL") : () => null}
      >
        {amount ? "Select Reward" : "Out of Stock"}
      </button>
    </div>
  );
};

export default Reward;
