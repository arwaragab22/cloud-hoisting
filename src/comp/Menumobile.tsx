"use client";

import React, { useRef, useState } from "react";

import { IoMenuOutline } from "react-icons/io5";
import Sidemenu from "./Sidemenu";
function Menumobile({ username }:{username:string}){
  const refmenuicon = useRef<HTMLDivElement | null>(null);
  const [Openside, Setopenside] = useState(false);
  const closemenu = () => {
    Setopenside(false);
  };
  const openmenu = () => {
    Setopenside(true);
  };
  return (
    <div className="block md:hidden relative" ref={refmenuicon}>
      <IoMenuOutline
        onClick={openmenu}
        className="menuoutline cursor-pointer"
        color="white"
        fontSize={"30px"}
      />
      {Openside && (
        <div>
          {" "}
          <div
            className="fixed inset-0 bg-gray-900/50  z-5"
            onClick={closemenu}
          ></div>
          <Sidemenu
            closemenu={closemenu}
            refmenuicon={refmenuicon}
            username={username}
          ></Sidemenu>
        </div>
      )}
    </div>
  );
}

export default Menumobile;
