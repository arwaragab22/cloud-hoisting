import Logoutbtn from "@/util/Buttons/Logoutbtn";
import Link from "next/link";
import React, { useEffect, useRef } from "react";
import { IoMdClose } from "react-icons/io";

type Props = {
  closemenu: () => void;
  username: string;
  refmenuicon: React.RefObject<HTMLDivElement | null>;
};

function Sidemenu({ closemenu, refmenuicon, username }: Props) {
  const refside = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleclickmenu = (e: MouseEvent) => {
      if (
        !refside.current?.contains(e.target as Node) &&
        !refmenuicon.current?.contains(e.target as Node)
      ) {
        closemenu();
      }
    };
    document.addEventListener("click", handleclickmenu);
    return () => {
      document.removeEventListener("click", handleclickmenu);
    };
  }, [closemenu, refmenuicon]);

  return (
    <div
      
      ref={refside}
      className={` text-white flex flex-col gap-2  absolute top-[-13px] right-[-23px] transition-all duration-2000 ease-in-out 
      bg-linear-to-r from-blue-900 to-blue-900 p-2 z-10 shadow-[0_35px_35px_rgba(0,0,0,0.25)]  w-[285px] h-dvh p-3`}
    >
      <IoMdClose className="font-bold text-3xl self-end cursor-pointer" onClick={closemenu}/>

      <ul>
        <ul className="border-b-1 border-b-indigo-50 flex flex-col gap-3 ">
          {!username ? (
            <>
      
              <li className="cursor-pointer">Sign up free </li>{" "}
              <li className="mb-3 cursor-pointer">Sign in</li>
            </>
          ) : (
            <Logoutbtn />
          )}
        </ul>
        <ul className="flex flex-col gap-3 ">
          <Link href="/" className="mt-3">
            Home
          </Link>
          <Link href="/about">About</Link>
          <Link href="/articles">Articles</Link>
          <Link href="/admin">Admin Dashboard</Link>
        </ul>
      </ul>
    </div>
  );
}

export default Sidemenu;
