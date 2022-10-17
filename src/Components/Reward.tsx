import { FC, useState } from "react";

import Modal from "./Moda";
import { RewardSelect } from "./RewardSelect";

export type infoReward = {
  title: string;
  pledge: number;
  desc: string;
  amount: number;
  id: number;
};

type props = {
  reward: infoReward;
  addBacker: () => void;
  increaseAmount: (_amount: number) => boolean;
  // pledges: infoReward[];
};

const Reward: FC<props> = ({ reward, addBacker, increaseAmount }) => {
  const { title, pledge, desc, amount } = reward;
  const [showModal, toggleModal] = useState<boolean>(false);
  const [stock, setStock] = useState<number>(amount);

  const updateStock = () => {
    setStock(stock - 1);
  };

  const addPledge = (amount: number) => {
    if (increaseAmount(amount)) {
      addBacker();
      updateStock();
    }
  };

  return (
    <div
      className={
        "relative shadow rounded-lg border-2 p-7 flex flex-col gap-7 " +
        (stock ? "" : "grayscale")
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
        <span className="text-neutral-black text-4xl font-bold">{stock}</span>{" "}
        left
      </p>
      <button
        className="px-6 py-3 w-2/3 bg-primary-moderate-cyan rounded-3xl text-slate-50 text-lg font-bold"
        onClick={stock ? () => toggleModal(true) : () => null}
        onKeyPress={stock ? () => toggleModal(true) : () => null}
      >
        {stock ? "Select Reward" : "Out of Stock"}
      </button>

      {showModal ? (
        <Modal>
          <div className="fixed top-0 w-full h-full bg-[rgba(0,0,0,0.5)] overflow-y-auto">
            <article className="bg-slate-50 p-6 m-4 absolute top-32 bottom-4 rounded-lg overflow-y-scroll">
              <h2 className="font-bold text-xl mb-4">Back this project</h2>
              <p className="text-neutral-dark-gray text-md mb-8">
                Want to support us in bringing Mastercraft Bamboo Monitor Riser
                out in the world?
              </p>
              <button
                className="absolute top-8 right-8"
                onClick={() => toggleModal(false)}
                onKeyPress={() => toggleModal(false)}
              >
                <img alt="" src="images/icon-close-modal.svg" />
              </button>
              <div className="flex flex-col gap-8">
                <RewardSelect
                  addPledge={addPledge}
                  desc={
                    "Choose to support us without a reward if you simply believe in our project. As a backer, you will be signed up to receive product updates via email."
                  }
                  reward={false}
                  selected={false}
                  title={"Piedge with no reward"}
                />
                <RewardSelect
                  addPledge={addPledge}
                  desc={
                    "Choose to support us without a reward if you simply believe in our project. As a backer, you will be signed up to receive product updates via email."
                  }
                  reward={false}
                  selected={false}
                  title={"Piedge with no reward"}
                />
              </div>
            </article>
          </div>
        </Modal>
      ) : null}
    </div>
  );
};

export default Reward;
