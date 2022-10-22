import { useState, type FC } from "react";

import Modal from "../Modal";

import { RewardSelect } from "./RewardSelect";
import { infoReward } from "./Reward";

type props = {
  addPledge: (_id: number, _amount: number) => void;
  pledges: infoReward[];
  idSelected: number;
  handleModal: () => void;
  toggleThanksModal: () => void;
};

export const RewardModal: FC<props> = ({
  addPledge,
  pledges,
  idSelected,
  handleModal,
  toggleThanksModal,
}) => {
  const [selected, setSelected] = useState<number>(idSelected);

  const handleSelected = (id: number) => {
    setSelected(id);
  };

  return (
    <Modal>
      <div className="fixed top-0 w-full h-full bg-[rgba(0,0,0,0.5)] overflow-y-auto">
        <article className="bg-slate-50 p-7 m-4 absolute top-32 bottom-4 rounded-lg overflow-y-scroll">
          <h2 className="font-bold text-2xl mb-4">Back this project</h2>
          <p className="text-neutral-dark-gray text-md mb-8">
            Want to support us in bringing Mastercraft Bamboo Monitor Riser out
            in the world?
          </p>
          <button
            className="absolute top-9 right-9"
            onClick={() => handleModal()}
            onKeyPress={() => handleModal()}
          >
            <img alt="" src="images/icon-close-modal.svg" />
          </button>
          <div className="flex flex-col gap-8">
            <RewardSelect
              addPledge={addPledge}
              amount={-1}
              desc={
                "Choose to support us without a reward if you simply believe in our project. As a backer, you will be signed up to receive product updates via email."
              }
              handleSelected={handleSelected}
              id={0}
              reward={false}
              selected={selected!}
              title={"Piedge with no reward"}
              toggleModal={handleModal}
              toggleThanksModal={toggleThanksModal}
            />
            {pledges.map((pledge) => (
              <RewardSelect
                key={pledge.id}
                addPledge={addPledge}
                amount={pledge.amount}
                desc={pledge.desc}
                handleSelected={handleSelected}
                id={pledge.id}
                pledge={pledge.pledge}
                reward={true}
                selected={selected!}
                title={pledge.title}
                toggleModal={handleModal}
                toggleThanksModal={toggleThanksModal}
              />
            ))}
          </div>
        </article>
      </div>
    </Modal>
  );
};
