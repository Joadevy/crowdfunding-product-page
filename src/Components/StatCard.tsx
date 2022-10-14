import type { FC } from "react";

export type Stat = {
  data: string;
  desc: string;
};

type props = {
  stats: Stat;
};

const StatCard: FC<props> = ({ stats }) => {
  const { data, desc } = stats;

  return (
    <div className="text-center">
      <h2 className="font-bold text-4xl">{data}</h2>
      <p className="text-md text-neutral-dark-gray">{desc}</p>
    </div>
  );
};

export default StatCard;
