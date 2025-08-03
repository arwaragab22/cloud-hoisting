"use client";
import axios, { Axios } from "axios";
import Error from "next/error";
import Link from "next/link";

import { useRouter } from "next/navigation";

import React from "react";
import { MdError } from "react-icons/md";
import { toast } from "react-toastify";

function Logoutbtn() {
  const router = useRouter();
  const logoutfun = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/user/logout");
      router.push("/");
      router.refresh();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          toast.error(error.response.data.message, {
            icon: MdError,
            style: {
              background: "#83ade8",
              color: "white",
            },
          });
        } else {
          toast.error("Network error. Please check your connection or server.");
        }
      } else {
        toast.error("Something went wrong", {
          icon: MdError,
          style: {
            background: "#83ade8",
            color: "white",
          },
        });
      }
    }
  };
  return (
    <button
      className=" text-white px-2 py-1 rounded-sm cursor-pointer border-2 font-semibold  "
      onClick={logoutfun}
    >
      Log out
    </button>
  );
}

export default Logoutbtn;
