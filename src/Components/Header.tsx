import { FC, useState } from "react";

import Modal from "./Modal";

const Header: FC = () => {
  const [showModal, toggleModal] = useState<boolean>(false);

  return (
    <header className="flex relative justify-between items-start px-6 py-9 h-80 bg-mobile-hero bg-cover">
      <div className="flex justify-between w-full items-center bg-none shadow-hero h-0">
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
      {showModal && (
        <Modal>
          <ol className="z-10 absolute w-5/6 top-24 right-0 left-0 m-auto bg-slate-50 p-6 rounded-xl shadow-modal font-semibold text-lg flex flex-col gap-10">
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
      )}
    </header>
  );
};

export default Header;
