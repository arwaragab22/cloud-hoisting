"use client";

import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { ClipLoader } from "react-spinners";
import { Id, toast } from "react-toastify";
import axios from "axios";
import { MdError } from "react-icons/md";
import { useState } from "react";
import { useRouter } from "next/navigation"; // ✅
import React from "react";
 
import { FaInfoCircle } from "react-icons/fa";

const FormSchema = z.object({
  password: z
    .string({ required_error: "Password is required" })
    .min(6, "Password must be at least 6 characters"),
  email: z
    .string({ required_error: "Email is required" })
    .email("Invalid email format"),
  username: z.string().nonempty("name is required"),
});

export default function RegisterPage() {
  const toastId = React.useRef<Id | null>(null);

  const Routers = useRouter();
  const [loadinglogin, setloadinglogin] = useState(false);
  type FormInput = z.infer<typeof FormSchema>;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInput>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      password: "",
      email: "",
      username: "",
    },
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-600 to-indigo-700  px-4">
      <div className="bg-white shadow-2xl rounded-3xl p-10 w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-purple-800 mb-6">
          Create an Account
        </h2>
        <form
          onSubmit={handleSubmit(async (data) => {
            setloadinglogin(true);
            await axios
              .post("http://localhost:3000/api/user/register", {
                email: data.email,
                password: data.password,
                username: data.username,
              })
              .then(function (response) {
                setloadinglogin(false);
                
                      toast.info("Account created! Please login to continue", {
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
                Routers.push("/Login");
              })
              .catch(function (error) {
                setloadinglogin(false);
                if (error.response.data.message) {
                  if (toastId.current && !toast.isActive(toastId?.current)) {
                    toastId.current = toast.error(error.response.data.message, {
                      icon: MdError,
                      style: {
                        background: "#83ade8",
                        color: "white",
                      },
                    });
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
              });
          })}
          className="space-y-5"
        >
          <div>
            <label className="block mb-1 font-medium text-gray-700">Name</label>
            <input
              {...register("username")}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
            {typeof errors.username?.message === "string" && (
              <p className="text-sm text-red-700">{errors.username.message}</p>
            )}
          </div>
          <div>
            <label className="block mb-1 font-medium text-gray-700">
              Email
            </label>
            <input
              {...register("email")}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
            {typeof errors.email?.message === "string" && (
              <p className="text-sm text-red-700">{errors.email.message}</p>
            )}
          </div>
          <div>
            <label className="block mb-1 font-medium text-gray-700">
              Password
            </label>
            <input
              {...register("password")}
              type="password"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
            {typeof errors.password?.message === "string" && (
              <p className="text-sm text-red-700">{errors.password.message}</p>
            )}
          </div>
          <button
            disabled={loadinglogin}
            type="submit"
            className="w-full bg-purple-700 text-white font-semibold py-2 rounded-lg hover:bg-purple-800 transition duration-300 cursor-pointer"
          >
            {loadinglogin ? (
              <ClipLoader
                color="#c9bfbf"
                loading
                size={20}
                speedMultiplier={1}
              />
            ) : (
              "Register"
            )}
          </button>
        </form>
        <p className="text-center text-sm text-gray-600 mt-6">
          Already have an account?
          <Link
            href="/Login"
            className="text-purple-700 font-semibold hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
