"use client";
import { useRouter } from "next/navigation";

import axios from "axios";
import React, { useState } from "react";
import { FaEdit, FaInfoCircle, FaTrash } from "react-icons/fa";
import { Comment, User } from "@/generated/prisma";
import UpdateCommentModal from "./Updateaddcommentmodal";
import { toast } from "react-toastify";
import { MdError } from "react-icons/md";
import { ClipLoader } from "react-spinners";
type comeentuser = {
  comment: Comment & { user: User };
  userid: number;
  isadmin: boolean;
};

const Commentdetail = ({ comment, userid, isadmin }: comeentuser) => {
  const [openmodal, setopenmodal] = useState(false);
  const [loadinglogin, setloadinglogin] = useState(false);
  const router = useRouter();

  const handledeletecomment = async () => {
    setloadinglogin(true);

    try {
      const response = await axios.delete(
        `https://cloud-hoisting.vercel.app/api/comments/${comment.id}`
      );
      setloadinglogin(false);

      toast.info("Comment deleted successfully ", {
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
    <div className="bg-gray-50 border border-gray-300 rounded-lg p-4 mb-4 shadow-sm">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
        {/* Left: Name and description */}
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-800">
            {comment.user?.username}
          </h3>
          <p className="text-gray-700"> {comment.text}</p>
        </div>

        {/* Right: Date and buttons */}
        <div className="mt-3 md:mt-0 md:ml-6 text-right">
          <p className="text-sm  bg-amber-500 text-white p-1 text-center rounded">
            {new Date(comment.createdAt).toDateString()}
          </p>
          {(userid === comment.userId || isadmin) && (
            <div className="flex gap-2 justify-end mt-2">
              <button
                className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition  w-[35px] h-[35px] text-center"
                title="Edit"
                onClick={() => {
                  setopenmodal(true);
                }}
              >
                <FaEdit size={20} />
              </button>
              <button
                disabled={loadinglogin}
                onClick={handledeletecomment}
                className="p-2 bg-red-500 text-white rounded hover:bg-red-600   w-[35px] h-[35px] text-center"
                title="Delete"
              >
                {loadinglogin ? (
                  <ClipLoader
                    color="#c9bfbf"
                    loading
                    size={20}
                    speedMultiplier={1}
                  />
                ) : (
                  <FaTrash size={20} />
                )}
              </button>
            </div>
          )}
        </div>
      </div>
      {openmodal && (
        <UpdateCommentModal
          setopenmodal={setopenmodal}
          text={comment.text}
          commentid={comment.id}
        />
      )}
    </div>
  );
};

export default Commentdetail;
