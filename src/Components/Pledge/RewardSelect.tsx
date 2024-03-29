import { FC, MouseEvent, useEffect, useState } from "react";

type props = {
  title: string;
  reward: boolean;
  amount: number;
  selected: number;
  id: number;
  pledge?: number;
  desc: string;
  left?: number;
  addPledge: (_id: number, _amount: number) => void;
  toggleModal: () => void;
  handleSelected: (_id: number) => void;
  toggleThanksModal: () => void;
};

export const RewardSelect: FC<props> = ({
  addPledge,
  toggleModal,
  toggleThanksModal,
  handleSelected,
  amount,
  reward,
  title,
  pledge,
  desc,
  selected,
  id,
}) => {
  const [isSelected, toggleSelected] = useState<boolean>(selected === id);
  const [value, setValue] = useState<number>(pledge!);

  const handleSelect = (id: number) => {
    handleSelected(id);
  };

  useEffect(() => {
    if (selected === id) {
      toggleSelected(true);
    } else {
      toggleSelected(false);
    }
  }, [selected]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleSubmit = (e: MouseEvent) => {
    if (value >= pledge! || (!pledge && value > 0)) {
      e.preventDefault();
      addPledge(id, value);
      toggleModal();
      toggleThanksModal();
    } else {
      e.preventDefault();
    }
  };

  return (
    <div
      className={
        "flex flex-col gap-3 z-10 relative border-2 p-6 shadow rounded-md " +
        (isSelected && amount
          ? "border-primary-moderate-cyan"
          : !amount
          ? "grayscale"
          : "")
      }
    >
      <header className="flex gap-4 items-center mb-4">
        <div className="flex flex-col gap-1 order-2 lg:flex-row lg:gap-3 lg:items-center">
          <h2 className="text-neutral-black font-bold text-lg">{title}</h2>
          {reward && (
            <p className="text-primary-moderate-cyan text-md lg:font-bold">
              Pledge ${pledge} or more
            </p>
          )}
        </div>
        <label
          className={
            "block relative pl-2 text-xl select-none border-2 rounded-full " +
            (!amount ? "cursor-not-allowed" : "cursor-pointer")
          }
        >
          <input
            checked={isSelected}
            className={
              "opacity-0 h-2 w-2 " +
              (!amount ? "cursor-not-allowed" : "cursor-pointer")
            }
            disabled={!amount}
            type="radio"
            onChange={() => handleSelect(id)}
          />
          <span
            className={
              isSelected
                ? "absolute top-0 right-0 left-0 m-auto bottom-0 h-4 w-4 bg-primary-moderate-cyan rounded-full after:hidden after:absolute content-none"
                : ""
            }
          />
        </label>
      </header>

      <p className="text-neutral-dark-gray text-lg">{desc}</p>

      {amount >= 0 && (
        <p className="flex gap-2 items-center text-neutral-dark-gray my-3 lg:absolute lg:right-4 lg:top-2">
          <span className="text-2xl font-bold text-neutral-black">
            {amount}
          </span>{" "}
          left
        </p>
      )}

      <hr className="border-1 w-full mt-4 border-gray-300" />

      {isSelected && amount && (
        <footer className="flex flex-col items-center lg:flex-row lg:justify-between">
          <h3 className="text-neutral-dark-gray text-lg my-6">
            Enter your pledge
          </h3>
          <form
            action="/
            "
            className="flex gap-3 justify-center lg:justify-end"
          >
            <label
              className="text-center outline-primary-moderate-cyan py-4 px-6 lg:py-3 lg:px-2 border-2 rounded-3xl flex gap-2 hover:border-primary-moderate-cyan transition-colors"
              htmlFor="pledge"
            >
              $
              <input
                className="w-full outline-none"
                defaultValue={pledge}
                max={5000}
                min={pledge || 1}
                type={"number"}
                onChange={(e) => setValue(parseInt(e.target.value))}
              />
            </label>

            <input
              className="border-2 bg-primary-moderate-cyan text-slate-50 font-bold text-md py-4 px-6 rounded-3xl lg:py-3 lg:px-4 hover:cursor-pointer hover:bg-primary-dark-cyan transition-colors"
              type="submit"
              value="Continue"
              onClick={(e) => handleSubmit(e)}
            />
          </form>
        </footer>
      )}
    </div>
  );
};
