import { useEffect, useState } from "react";

import { infoBackers } from "../types";
import { infoReward } from "../Components/Pledge/Reward";

type data = {
  amountBacked: number;
  totalBackers: number;
  daysLeft: number;
  pledges: infoReward[];
};

export const usePledge = () => {
  const [data, setData] = useState<infoBackers>({
    amountBacked: 0,
    totalBackers: 0,
    daysLeft: 0,
  });
  const [status, setStatus] = useState<"loading" | "success">("loading");
  const [pledges, setPledges] = useState<infoReward[]>([]);

  useEffect(() => {
    requestData();
  }, []);

  const requestData = async () => {
    const data = await fetch("data.json");
    const dataRes: data = await data.json();

    if (dataRes) {
      setPledges(dataRes.pledges);
      setData({
        amountBacked: dataRes.amountBacked,
        totalBackers: dataRes.totalBackers,
        daysLeft: dataRes.daysLeft,
      });
      setStatus("success");
    }
  };

  const addBack = (amount: number) => {
    if (data.amountBacked + amount <= 100000) {
      setData({
        amountBacked: data.amountBacked + amount,
        totalBackers: data.totalBackers + 1,
        daysLeft: data.daysLeft,
      });

      return true;
    } else if (data.amountBacked !== 100000) {
      setData({ ...data, amountBacked: 100000 });

      return true;
    }

    return false;
  };

  const updateStock = (id: number) => {
    let pledgesUpdated = pledges.map((pledge) => {
      if (pledge.id === id && pledge.amount) {
        pledge.amount--;
      }

      return pledge;
    });

    setPledges(pledgesUpdated);
  };

  const addPledge = (idPledge: number, amount: number) => {
    // Pledge with id = 0 doesn't have reward so doesn't need to update stock
    if (idPledge === 0) {
      addBack(amount);
    } else {
      for (let pledge of pledges) {
        if (pledge.id === idPledge && addBack(amount)) {
          updateStock(idPledge);
        }
      }
    }
  };

  return {
    addPledge,
    pledges,
    status,
    data,
  };
};
