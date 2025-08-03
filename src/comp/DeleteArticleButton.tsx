"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { FaInfoCircle } from "react-icons/fa";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

interface DeleteArticleButtonProps {
    articleId: number;
}

const DeleteArticleButton = ({ articleId }: DeleteArticleButtonProps) => {
    const router = useRouter();

    const deleteArticleHandler = async () => {
        try {
    
            Swal.fire({
              title: "Are you sure?",
              text: "This article will be permanently deleted!",
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
                  `http://localhost:3000/api/articles/${articleId}`
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
        } catch (error: any) {
            toast.error(error?.response?.data.message);
        }
    }

    return (
        <div onClick={deleteArticleHandler} className="bg-red-600 text-white rounded-lg cursor-pointer inline-block text-center py-1 px-2 hover:bg-red-800 transition">
            Delete
        </div>
    )
}

export default DeleteArticleButton