import { FC, useState } from "react";

import Modal from "./Moda";

export type infoReward = {
  title: string;
  pledge: number;
  desc: string;
  amount: number;
};

type props = { reward: infoReward };

const Reward: FC<props> = ({ reward }) => {
  const { title, pledge, desc, amount } = reward;
  const [showModal, toggleModal] = useState<boolean>(false);

  return (
    <div
      className={
        "relative shadow rounded-lg border-2 p-7 flex flex-col gap-7 " +
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
        onClick={amount ? () => toggleModal(true) : () => null}
        onKeyPress={amount ? () => toggleModal(true) : () => null}
      >
        {amount ? "Select Reward" : "Out of Stock"}
      </button>

      {showModal ? (
        // This can be a component separated like RewardSelection.
        <Modal>
          <div className="fixed top-0 w-full h-full bg-[rgba(0,0,0,0.5)]">
            <div className="z-10 relative border-2 border-red-500 bg-slate-50 h-72 m-4">
              <p>MODAL TEST</p>
              <button
                onClick={() => toggleModal(false)}
                onKeyPress={() => toggleModal(false)}
              >
                X
              </button>
            </div>
          </div>
        </Modal>
      ) : null}
    </div>
  );
};

export default Reward;
