"use client";
import axios from "axios";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { MdError } from "react-icons/md";
import { toast } from "react-toastify";
import { FaInfoCircle } from "react-icons/fa";
import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ClipLoader } from "react-spinners";
export const ArticleFormSchema = z.object({
  title: z
    .string()
    .refine((val) => val.length > 0, {
      message: "Title is required",
    })
    .refine((val) => val.length >= 5, {
      message: "Title must be at least 5 characters",
    }),

  description: z
    .string()
    .refine((val) => val.length > 0, {
      message: "description is required",
    })
    .refine((val) => val.length >= 5, {
      message: "description must be at least 5 characters",
    }),
});

const AddArticleForm = () => {
  const [loadinglogin, setloadinglogin] = useState(false);
  type FormInput = z.infer<typeof ArticleFormSchema>;
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormInput>({
    resolver: zodResolver(ArticleFormSchema),
    mode: "onSubmit", // ← ده بيفرض ظهور الأخطاء عند الضغط

    defaultValues: {
      title: "",
      description: "",
    },
  });

  const onsubmit = async (data: FormInput) => {
    setloadinglogin(true);
    console.log(data);
    try {
      const response = await axios.post(
        "https://cloud-hoisting.vercel.app/api/articles",
        { title: data.title, description: data.description }
      );
      console.log(response);
      setloadinglogin(false);

      toast.info("Article Added successfully ", {
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
      reset();
    } catch (error) {
      setloadinglogin(false);

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
    <div className="min-h-screen  overflow-x-hidden">
      <div className="bg-white rounded-lg p-1 lg:p-8   w-full max-w-xl ">
        <h2 className=" text-xl lg:text-3xl font-bold mb-6 text-center text-gray-800">
          Add New Article
        </h2>
        <form
          onSubmit={handleSubmit(onsubmit)}
          className="flex flex-col max-w-xl	"
        >
          <input
            className="mb-4 border border-gray-300 rounded p-3 text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="text"
            placeholder="Enter Article Title"
            {...register("title")}
          />{" "}
          {errors.title && (
            <p className="text-red-600 bg-red-100 border border-red-300 px-4 py-2 rounded-md mt-2 text-sm shadow-sm my-2">
              {errors.title.message || "This field is required"}
            </p>
          )}
          <textarea
            className="mb-4 border border-gray-300 p-3 text-lg rounded resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows={6}
            placeholder="Enter Article Description"
            {...register("description")}
          ></textarea>
          {errors.description && (
            <p className="text-red-600 bg-red-100 border border-red-300 px-4 py-2 rounded-md mt-2 text-sm shadow-sm  my-2">
              {errors.description.message || "This field is required"}
            </p>
          )}
          <button
            disabled={loadinglogin}
            type="submit"
            className="text-xl text-white bg-blue-700 hover:bg-blue-900 p-3 rounded-lg font-semibold transition duration-200 cursor-pointer"
          >
            {loadinglogin ? (
              <ClipLoader
                color="#c9bfbf"
                loading
                size={20}
                speedMultiplier={1}
              />
            ) : (
              "Add Article"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddArticleForm;
