import React, { FC, MouseEvent, useState } from "react";

type props = {
  title: string;
  reward: boolean;
  amount: number;
  selected: boolean;
  id: number;
  pledge?: number;
  desc: string;
  left?: number;
  addPledge: (_id: number, _amount: number) => void;
  toggleModal: () => void;
};

export const RewardSelect: FC<props> = ({
  addPledge,
  toggleModal,
  amount,
  reward,
  title,
  pledge,
  desc,
  left,
  selected,
  id,
}) => {
  const [isSelected, toggleSelected] = useState<boolean>(false);
  const [value, setValue] = useState<number>(pledge!);

  const handleSelect = () => {
    toggleSelected(!isSelected);
  };

  const handleSubmit = (e: MouseEvent) => {
    if (value >= pledge! || !pledge) {
      e.preventDefault();
      console.log(value);
      addPledge(id, value);
      toggleModal();
    }
  };

  return (
    <div
      className={
        "flex flex-col gap-3 z-10 relative border-2 p-6 shadow rounded-md " +
        (isSelected && amount ? "border-primary-moderate-cyan" : "")
      }
    >
      <header className="flex gap-2 mb-4">
        <div className="flex flex-col gap-2 order-2">
          <h2 className="text-neutral-black font-bold text-lg">{title}</h2>
          {reward ? (
            <p className="text-primary-moderate-cyan">
              Pledge ${pledge} or more
            </p>
          ) : null}
        </div>
        <input
          className="order-1 pointer-events-auto"
          type="checkbox"
          onClick={() => (handleSelect(), console.log(id))}
        />
      </header>

      <p className="text-neutral-dark-gray text-lg">{desc}</p>

      {left && left > 0 ? (
        <p>
          <span>{left}</span> left
        </p>
      ) : null}
      {isSelected && amount ? (
        <footer className="flex flex-col items-center">
          <hr className="border-1 my-6 border-neutral-dark-gray" />
          <h3 className="text-neutral-dark-gray text-lg">Enter your pledge</h3>
          <form
            action="/
            "
            className="flex gap-5"
          >
            <input
              className="w-24 text-center outline-primary-moderate-cyan"
              defaultValue={pledge}
              max={5000}
              min={pledge}
              type={"number"}
              onChange={(e) => setValue(parseInt(e.target.value))}
            />
            <input
              className="border-2 bg-primary-moderate-cyan"
              id="continue"
              type="submit"
              value="CONTINUE"
              onClick={(e) => handleSubmit(e)}
            />
          </form>
        </footer>
      ) : null}
    </div>
  );
};
