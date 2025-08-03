import Link from "next/link";
import React from "react";
import { cookies } from "next/headers";
import Jwt from "jsonwebtoken";
import { GrTechnology } from "react-icons/gr";

import Menumobile from "../Menumobile";
import Logoutbtn from "@/util/Buttons/Logoutbtn";

const Header = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get("jwtToken")?.value as string;
  
  let decoded = null;
  if (token) {
    try {
      decoded = Jwt.verify(
        token,
        process.env.JWT_SECRET as string
      ) as Jwt.JwtPayload;
    } catch {}
  }

  return (
    <div className="py-3 p-2 md:px-6 bg-linear-to-r from-blue-900 to-blue-500">
      <nav className="flex justify-between items-center ">
        <div className="flex justify-center items-center text-white text-2xl capitalize space-x-1 cursor-pointer font-bold">
          <span>cloud</span>
          <GrTechnology /> <span>hoisting</span>
        </div>
        <ul className="font-bold   grow justify-center sm:gap-1  md:gap-6 text-white  hidden md:flex">
          <Link href="/" className="hover:scale-125 hover:transition-all ">
            Home
          </Link>
          <Link href="/about" className="hover:scale-125 hover:transition-all ">
            About
          </Link>
          <Link
            href="/articles?page=1"
            className="hover:scale-125 hover:transition-all "
          >
            Articles
          </Link>
          {decoded?.isAdmin && (
            <Link
              href="/admin"
              className="hover:scale-125 hover:transition-all "
            >
              Admin Dashboard
            </Link>
          )}
        </ul>
        <div className="hidden md:block">
          {decoded?.username ? (
            <div className="flex gap-2 items-center">
              {" "}
              <p className="capitalize font-bold text-white">
                Hello, {decoded?.username}
              </p>{" "}
              <Logoutbtn />{" "}
            </div>
          ) : (
            <>
              <Link
                className=" text-white px-1 py-1 rounded-sm cursor-pointer "
                href="/Login"
              >
                Sign in
              </Link>
              <Link
                className=" text-white px-2 py-1 rounded-sm cursor-pointer border-2 font-semibold"
                href="/Register"
              >
                Sign up free
              </Link>
            </>
          )}
        </div>
        <Menumobile username={decoded?.username}></Menumobile>
      </nav>
    </div>
  );
};

export default Header;
