"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import React, { ChangeEvent, useState } from "react";
import { FaInfoCircle } from "react-icons/fa";
import { LiaUserTagSolid } from "react-icons/lia";
import { MdError } from "react-icons/md";
import { ClipLoader } from "react-spinners";
import { toast } from "react-toastify";

function Addcommentform({ articleid }: { articleid: number }) {
  const [Comment, Setcomment] = useState("");
  const Routers = useRouter();
  const [loadinglogin, setloadinglogin] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    setloadinglogin(true);
    e.preventDefault();

    if (Comment) {
      await axios
        .post("https://cloud-hoisting.vercel.app/api/comments", {
          articleId: articleid,
          text: Comment,
        })
        .then(function (response) {
          setloadinglogin(false);
          Setcomment("");
          toast.info("Comment added successfully ", {
            icon: <FaInfoCircle color="white" size={22} />,
            style: {
              background: "#3bb95f", // blue-600
              color: "white",
              borderRadius: "8px",
              padding: "12px 16px",
              fontSize: "16px",
            },
            position: "top-center",
            autoClose: 2000,
          });
          Routers.refresh();
        })
        .catch(function (error) {
          toast.dismiss(); // يغلق أي توستات مفتوحة

          if (error.response.data.message) {
            toast.error(error.response.data.message, {
              icon: MdError,
              style: {
                background: "#83ade8",
                color: "white",
              },
            });
          } else {
            toast.error("Something went wrong", {
              icon: MdError,
              style: {
                background: "#83ade8",
                color: "white",
              },
            });
          }
        });
      Setcomment("");
    } else {
      setloadinglogin(false);

      toast.error("Comment cannot be empty.", {
        toastId: "search-tooste",
        icon: <FaInfoCircle color="white" size={24} />,
        style: {
          background: "#83ade8",
          color: "white",
        },
      });
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-xl mx-auto mt-8  gap-4 px-4"
    >
      <input
        className=" border border-gray-300 p-3 rounded-lg shadow-sm text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-[100%]"
        type="text"
        placeholder="Add a comment..."
        value={Comment}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          Setcomment(e.target.value)
        }
      />
      <button
        type="submit"
        className="bg-green-600 text-white px-3 py-2 rounded-md transition font-semibold text-lg block my-3 min-w-[150px]"
      >
        {loadinglogin ? (
          <ClipLoader color="#c9bfbf" loading size={20} speedMultiplier={1} />
        ) : (
          "Add Comment"
        )}
      </button>
    </form>
  );
}

export default Addcommentform;
