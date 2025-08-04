"use client";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { FaInfoCircle } from "react-icons/fa";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

interface DeleteCommentButtonProps {
  commentId: number;
}

const DeleteCommentButton = ({ commentId }: DeleteCommentButtonProps) => {
  const router = useRouter();

  const deleteCommentHandler = async () => {
    try {
      Swal.fire({
        title: "Are you sure?",
        text: "This comment will be permanently deleted!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33", // red for delete
        cancelButtonColor: "#3085d6", // blue for cancel
        confirmButtonText: "Yes, delete it",
        cancelButtonText: "Cancel",
        reverseButtons: true,
      }).then(async (result) => {
        if (result.isConfirmed) {
          await axios.delete(
            `https://cloud-hoisting.vercel.app/api/comments/${commentId}`
          );
          router.refresh();
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
        }
      });
    } catch (error) {
      const err = error as AxiosError<any>;
      toast.error(err.response?.data?.message || "Something went wrong.");
    }
  };

  return (
    <div
      onClick={deleteCommentHandler}
      className="bg-red-600 text-white rounded-lg inline-block py-1 px-2 cursor-pointer hover:bg-red-800 transition"
    >
      Delete
    </div>
  );
};

export default DeleteCommentButton;
