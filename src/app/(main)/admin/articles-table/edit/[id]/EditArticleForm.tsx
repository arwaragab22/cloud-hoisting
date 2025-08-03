"use client";
import React, { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { useRouter } from "next/navigation";
import { FaInfoCircle } from "react-icons/fa";
import z from "zod";
import { MdError } from "react-icons/md";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ClipLoader } from "react-spinners";
import { Article } from "@/generated/prisma";

interface EditArticleFormProps {
  article: Article;
}
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
const EditArticleForm = ({ article }: EditArticleFormProps) => {
  const router = useRouter();
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
        title: article.title,
        description: article.description,
      },
    });
  const onsubmit = async (data: FormInput) => {
    setloadinglogin(true)
  
    try {
    const response=await axios.put(`http://localhost:3000/api/articles/${article.id}`, {
    title:  data.title,
    description:  data.description,
    });
          setloadinglogin(false);

      toast.info("Article updated successfully ", {
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
      reset({
        title: data.title,
        description: data.description,
      });
      router.refresh();

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
    <form onSubmit={handleSubmit(onsubmit)} className="flex flex-col max-w-xl">
      <input
        className="mb-4 border border-gray-300 rounded p-3 text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        type="text"
        placeholder="Enter Article Title"
        {...register("title")}

      />
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
        type="submit"
        className="text-xl text-white bg-blue-700 hover:bg-blue-900 p-3 rounded-lg font-semibold transition duration-200 cursor-pointer"
      >
        {loadinglogin ? (
          <ClipLoader color="#c9bfbf" loading size={20} speedMultiplier={1} />
        ) : (
          "Edit Article"
        )}
      </button>
    </form>
  );
};

export default EditArticleForm;
