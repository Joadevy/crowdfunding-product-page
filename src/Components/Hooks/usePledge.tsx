import { useEffect, useState } from "react";

import { infoBackers } from "../../types";
import { infoReward } from "../Pledge/Reward";

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
  const [amountBacked, setAmountBacked] = useState<number>(0);
  const [totalBackers, setTotalBackers] = useState<number>(0);
  const [daysLeft, setDaysLeft] = useState<number>(0);
  const [status, setStatus] = useState<"loading" | "success">("loading");
  const [pledges, setPledges] = useState<infoReward[]>([]);

  useEffect(() => {
    requestData();
  }, []);

  const requestData = async () => {
    const data = await fetch("data.json");
    const dataRes: data = await data.json();

    if (dataRes) {
      // Seria mejor almacenar todo en el useState de data para tener menos estados.
      setPledges(dataRes.pledges);
      setAmountBacked(dataRes.amountBacked);
      // setData({...,dataRes.amountBacked,...});
      setTotalBackers(dataRes.totalBackers);
      setDaysLeft(dataRes.daysLeft);
      setStatus("success");
    }
  };

  const addBacker = () => {
    if (amountBacked !== 100000) setTotalBackers(totalBackers + 1);
  };

  const addAmountBacked = (amount: number) => {
    if (amountBacked + amount <= 100000) {
      setAmountBacked(amountBacked + amount);

      return true;
    } else if (amountBacked !== 100000) {
      setAmountBacked(100000);

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
    if (idPledge === 0 && addAmountBacked(amount)) {
      addBacker();
    } else {
      for (let pledge of pledges!) {
        if (pledge.id === idPledge && addAmountBacked(amount)) {
          addBacker();
          updateStock(idPledge);
        }
      }
    }
  };

  return { addPledge, pledges, amountBacked, totalBackers, daysLeft, status };
};
