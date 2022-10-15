import type { FC } from "react";
import type { Stat } from "../types";

const StatCard: FC<Stat> = ({ data, desc }) => {
  return (
    <div className="text-center">
      <h2 className="font-bold text-4xl">{data}</h2>
      <p className="text-md text-neutral-dark-gray">{desc}</p>
    </div>
  );
};

export default StatCard;
