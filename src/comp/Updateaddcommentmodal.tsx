"use client";
import React, { useState, FormEvent, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";

import { IoMdCloseCircleOutline } from "react-icons/io";
import { ClipLoader } from "react-spinners";
import { toast } from "react-toastify";
import { FaInfoCircle } from "react-icons/fa";
import axios from "axios";
import { MdError } from "react-icons/md";

const UpdateCommentModal = ({
  setopenmodal,
  text,
  commentid,
}: {
  setopenmodal: React.Dispatch<React.SetStateAction<boolean>>;
  text: string;
  commentid: number;
}) => {
  const [updatedText, setUpdatedText] = useState(text);
  const router = useRouter();
  const refform = useRef<HTMLDivElement | null>(null);

  const [loadinglogin, setloadinglogin] = useState(false);

  useEffect(() => {
    const handleclickoutside = (e: MouseEvent) => {
      if (refform.current && !refform?.current?.contains(e.target as Node)) {
        setopenmodal(false);
      }
    };
    document.addEventListener("click", handleclickoutside);
    return () => {
      document.removeEventListener("click", handleclickoutside);
    };
  }, []);
  const formSubmitHandler = async (e: FormEvent) => {
    e.preventDefault();
    if (updatedText) {
      setloadinglogin(true);

      try {
        const response = await axios.put(
          `https://cloud-hoisting.vercel.app/api/comments/${commentid}`,
          {
            text: updatedText,
          }
        );

        setloadinglogin(false);

        toast.info("Comment updated successfully ", {
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
        setopenmodal(false);
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
            toast.error(
              "Network error. Please check your connection or server."
            );
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
    <div className=" form1 fixed top-0 left-0 bottom-0 right-0 z-10 bg-black bg-opacity-40 flex items-center justify-center">
      <div ref={refform} className="w-11/12 lg:w-2/4 bg-white rounded-lg p-3">
        <div className="flex justify-end items-start mb-5">
          <IoMdCloseCircleOutline
            className="text-red-500 cursor-pointer text-3xl"
            onClick={() => {
              setopenmodal(false);
            }}
          />
        </div>
        <form onSubmit={formSubmitHandler}>
          <input
            type="text"
            placeholder="Edit Comment..."
            className="text-xl rounded-lg p-2 w-full bg-white mb-2"
            value={updatedText}
            onChange={(e) => {
              setUpdatedText(e.target.value);
            }}
          />
          <button
            type="submit"
            className="bg-green-700 w-full text-white mt-2 p-1 text-xl rounded-lg hover:bg-green-900 transition "
          >
            {loadinglogin ? (
              <ClipLoader
                color="#c9bfbf"
                loading
                size={20}
                speedMultiplier={1}
              />
            ) : (
              "Edit"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateCommentModal;
