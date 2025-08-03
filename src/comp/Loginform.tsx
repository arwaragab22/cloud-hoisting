"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { redirect, useRouter } from "next/navigation";
import axios from "axios";
import { Router } from "next/router";
import { toast } from "react-toastify";
import { MdError } from "react-icons/md";
import { useState } from "react";
import { ClipLoader } from "react-spinners";

const FormSchema = z.object({
  password: z
    .string({ required_error: "Password is required" })
    .min(6, "Password must be at least 6 characters"),
  email: z
    .string({ required_error: "Email is required" })
    .email("Invalid email format"),
});

export default function LoginPage() {
  const Routers = useRouter();
  const [loadinglogin, setloadinglogin] = useState(false);
  type FormInput = z.infer<typeof FormSchema>;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInput>({
    resolver: zodResolver(FormSchema),
    mode: "onSubmit", // ← ده بيفرض ظهور الأخطاء عند الضغط

    defaultValues: {
      password: "",
      email: "",
    },
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 to-indigo-700 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
        <h2 className="text-3xl font-bold text-center text-purple-800 mb-6">
          Welcome Back
        </h2>

        <form
          onSubmit={handleSubmit((data) => {
            setloadinglogin(true);
            axios
              .post("http://localhost:3000/api/user/login", {
                email: data.email,
                password: data.password,
              })
              .then(function (response) {
                console.log(response);
                setloadinglogin(false);
                Routers.push("/");
              })
              .catch(function (error) {
                setloadinglogin(false);
console.log(error?.response)
                if (error?.response?.data?.message) {
                  toast.error(error.response.data.message, {
                    icon: <MdError size={20} color="white" />,
                    style: {
                      background: "#83ade8",
                      color: "white",
                      marginBottom: "10px",
                      borderRadius: "8px",
                      padding: "12px 16px",
                      fontSize: "16px",
                    },
                    autoClose: 3000, // ← الإغلاق التلقائي بعد 3 ثواني
                    closeButton: ({ closeToast }) => (
                      <span
                        onClick={closeToast}
                        style={{
                          color: "white",
                          fontSize: "20px",
                          marginRight: "12px",
                          cursor: "pointer",
                          fontWeight: "bold",
                        }}
                      >
                        ✕
                      </span>
                    ),
                    position: "top-center",
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
          })}
          className="space-y-5"
        >
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              {...register("email")}
            />
            {typeof errors.email?.message === "string" && (
              <p className="text-sm text-red-700">{errors.email.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              {...register("password")}
              required
              autoComplete="current-password"
            />
            {typeof errors.password?.message === "string" && (
              <p className="text-sm text-red-700">{errors.password.message}</p>
            )}
          </div>

          <button
            disabled={loadinglogin}
            type="submit"
            className=" disabled:cursor-not-allowed  w-full mt-4 bg-purple-700 hover:bg-purple-800 text-white font-semibold py-2 rounded-lg transition duration-300 cursor-pointer"
          >
            {loadinglogin ? (
              <ClipLoader
                color="#c9bfbf"
                loading
                size={20}
                speedMultiplier={1}
              />
            ) : (
              "login"
            )}
          </button>
        </form>

        <div className="mt-4 text-center text-sm text-gray-500">
          <span>Dont have an account?</span>
          <a href="/Register" className="text-purple-600 hover:underline">
            Sign up
          </a>
        </div>
      </div>
    </div>
  );
}
