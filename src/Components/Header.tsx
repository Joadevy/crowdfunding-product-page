import { FC, useState } from "react";

import Modal from "./Modal";

const Header: FC = () => {
  const [showModal, toggleModal] = useState<boolean>(false);

  return (
    <header className="flex relative justify-between items-start px-6 py-9 h-80 bg-mobile-hero bg-cover lg:bg-desktop-hero lg:h-[400px] 2xl:h-[500px]">
      <div className="flex justify-between w-full items-center bg-none shadow-hero h-0 lg:mx-40 lg:my-7 lg:shadow-heroDesktop">
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
          <ul className="hidden lg:flex lg:gap-7 lg:text-slate-50 lg:font-medium">
            <li>
              <a href="#About">About</a>
            </li>
            <li>
              <a href="#Discover">Discover</a>
            </li>
            <li>
              <a href="#GetStarted">Get started</a>
            </li>
          </ul>
        </nav>
      </div>
      {showModal && (
        <Modal>
          <ol className="z-10 absolute w-5/6 top-24 right-0 left-0 m-auto bg-slate-50 p-6 rounded-xl shadow-modal font-semibold text-lg flex flex-col gap-10">
            <li>
              <a href="#About">About</a>
            </li>
            <li>
              <a href="#Discover">Discover</a>
            </li>
            <li>
              <a href="#GetStarted">Get started</a>
            </li>
          </ol>
        </Modal>
      )}
    </header>
  );
};

export default Header;
