"use client";
import { ClipLoader } from "react-spinners";

export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <ClipLoader color="#2c1f63" size={36} speedMultiplier={2} />
    </div>
  );
}
