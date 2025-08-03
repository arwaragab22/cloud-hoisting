import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white text-gray-800 px-4">
      <h1 className="text-[100px] font-extrabold text-red-500 leading-none">
        404
      </h1>
      <h2 className="text-3xl font-semibold mt-4">Page Not Found</h2>
      <p className="text-gray-600 mt-2 text-center max-w-md">
        Sorry, the page you&apos;re looking for doesn &apos;t exist or has been moved.
        Please check the URL or return to the homepage.
      </p>
      <Link
        href="/"
        className="mt-6 inline-block px-6 py-3 bg-red-500 text-white rounded-xl shadow hover:bg-red-600 transition"
      >
        Back to Home
      </Link>
    </div>
  );
}
