"use client"

import { useRouter } from 'next/navigation';
import React, { ChangeEvent, FormEvent, useState } from 'react'
import { toast } from 'react-toastify';

import { FaInfoCircle } from "react-icons/fa";

function Searcharticlesinput() {
  const [Searchtext, Setsearchtext] = useState("");
  const router = useRouter();
  const handlesearcarticles = (e: FormEvent) => {
    e.preventDefault();
    const errorToastId = "empty-search-toast";

    if (Searchtext.length == 0) {
      if (!toast.isActive(errorToastId)) {
        toast.error("Please enter a search term", {
          toastId: "search-tooste",
          icon: <FaInfoCircle color="white" size={24} />,
          style: {
            background: "#83ade8",
            color: "white",
          },
        });
      }
    } else {
      router.push(`/articles/search?searchtext=${Searchtext}`);
    }
  };
  return (
    <form className=" mx-auto mb-3 text-center" onSubmit={handlesearcarticles}
    >
      <input
        className="w-[80%] border-1 border-gray-300 p-2 bg-white"
        type="search"
        placeholder="search for articles"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => { Setsearchtext(e.target.value) }}
      />
    </form>
  );
}

export default Searcharticlesinput