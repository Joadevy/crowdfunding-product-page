import { FC } from "react";

import Modal from "./Moda";

type props = {
  navbarModal: boolean;
  toggleNavbarModal: (_x: boolean) => void;
};

const Header: FC<props> = ({
  navbarModal: showModal,
  toggleNavbarModal: toggleModal,
}) => {
  return (
    <header className="flex relative justify-between items-start px-6 py-9 h-80 bg-mobile-hero bg-cover brightness-90 border-2 border-primary-moderate-cyan">
      <div className="flex justify-between w-full items-center">
        <img alt="" src="images/logo.svg" />
        <nav>
          <button
            className="justify-self-center lg:hidden"
            onClick={() => {
              toggleModal(!showModal);
            }}
          >
            {showModal ? (
              <img alt="" src="images/icon-close-menu.svg" />
            ) : (
              <img alt="" src="images/icon-hamburger.svg" />
            )}
          </button>
        </nav>
      </div>
      {showModal ? (
        <Modal>
          <ol className="z-10 absolute w-5/6 top-20 right-0 left-0 m-auto bg-slate-50 p-7 rounded-xl font-semibold  text-lg flex flex-col gap-8">
            <li>
              <a href="#c">About</a>
            </li>
            <li>
              <a href="#b">Discover</a>
            </li>
            <li>
              <a href="#a">Get started</a>
            </li>
          </ol>
        </Modal>
      ) : null}
    </header>
  );
};

export default Header;
