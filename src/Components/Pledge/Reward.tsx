import { FC, useState } from "react";

import { RewardModal } from "./RewardModal";

export type infoReward = {
  title: string;
  pledge: number;
  desc: string;
  amount: number;
  id: number;
};

type props = {
  reward: infoReward;
  addPledge: (_id: number, _amount: number) => void;
  toggleThanksModal: () => void;
  pledges: infoReward[];
};

const Reward: FC<props> = ({
  reward,
  addPledge,
  pledges,
  toggleThanksModal,
}) => {
  const { title, pledge, desc, amount, id } = reward;
  const [showModal, toggleModal] = useState<boolean>(false);

  const handleModal = () => {
    toggleModal(!showModal);
  };

  return (
    <div
      className={
        "relative shadow rounded-lg border-2 p-7 flex flex-col gap-7 lg:p-10 " +
        (amount ? "" : "grayscale")
      }
    >
      <header className="flex flex-col lg:flex-row lg:justify-between">
        <h3 className="text-lg font-bold lg:text-xl">{title}</h3>
        <p className="text-lg font-medium text-primary-moderate-cyan">
          Pledge ${pledge} or more
        </p>
      </header>
      <p className="text-neutral-dark-gray text-lg font-normal lg:leading-smooth">
        {desc}
      </p>
      <div className="flex flex-col gap-7 lg:flex-row lg:justify-between">
        <p className="text-neutral-dark-gray flex items-center gap-2 text-xl">
          <span className="text-neutral-black text-4xl font-bold">
            {amount}
          </span>
          left
        </p>
        <button
          className={
            "px-6 py-3 w-2/3 bg-primary-moderate-cyan rounded-3xl text-slate-50 text-lg font-bold transition-colors lg:w-3/12 " +
            (amount ? "hover:bg-primary-dark-cyan" : "cursor-not-allowed")
          }
          onClick={amount ? () => handleModal() : () => null}
          onKeyPress={amount ? () => handleModal() : () => null}
        >
          {amount ? "Select Reward" : "Out of Stock"}
        </button>
      </div>

      {showModal ? (
        <RewardModal
          addPledge={addPledge}
          handleModal={handleModal}
          idSelected={id}
          pledges={pledges}
          toggleThanksModal={toggleThanksModal}
        />
      ) : null}
    </div>
  );
};

export default Reward;
