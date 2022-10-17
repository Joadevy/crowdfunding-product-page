import React, { FC } from "react";

type props = {
  title: string;
  reward: boolean;
  pledge?: string;
  desc: string;
  left?: number;
  addPledge: (_amount: number) => void;
};

export const RewardSelect: FC<props> = ({
  addPledge,
  reward,
  title,
  pledge,
  desc,
  left,
}) => {
  return (
    <div className="flex flex-col gap-3 z-10 relative border-2 p-6 shadow">
      <header className="flex gap-2 mb-4">
        <div className="flex flex-col gap-2 order-2">
          <h2 className="text-neutral-black font-bold text-lg">{title}</h2>
          {reward ? (
            <p className="text-primary-moderate-cyan">{pledge}</p>
          ) : null}
        </div>
        <input className="order-1" type="checkbox" />
      </header>

      <p className="text-neutral-dark-gray text-lg">{desc}</p>

      {left && left > 0 ? (
        <p>
          <span>{left}</span> left
        </p>
      ) : null}
      <button onClick={() => addPledge(1000)}>ADD MONEY</button>
    </div>
  );
};
