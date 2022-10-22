import { FC } from "react";

import Modal from "./Modal";

type props = {
  toggleModal: () => void;
};

export const Thanks: FC<props> = ({ toggleModal }) => {
  return (
    <Modal>
      <div className="fixed top-0 w-full h-full bg-[rgba(0,0,0,0.5)] overflow-y-auto">
        <article className="bg-slate-50 px-6 py-10 absolute top-0 my-auto left-6 right-6 bottom-0 rounded-lg h-fit flex flex-col gap-8 items-center">
          <header>
            <img alt="" src="images/icon-check.svg" />
          </header>
          <h3 className="text-xl font-bold">Thanks for your support!</h3>
          <p className="text-center text-neutral-dark-gray text-md">
            Your pledge brings us one step closer to sharing Mastercraft Bamboo
            Monitor Riser worldwide. You will get an email once our campaign is
            completed.
          </p>
          <button
            className="bg-primary-moderate-cyan rounded-3xl px-9 py-4 text-slate-100 font-bold text-lg"
            onClick={() => toggleModal()}
          >
            Got it!
          </button>
        </article>
      </div>
    </Modal>
  );
};
