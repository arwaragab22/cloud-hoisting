import Link from "next/link";
import { FaTachometerAlt, FaRegNewspaper, FaRegComments } from "react-icons/fa";

export  default async function Sideadmin() {
  return (
    <div className=" h-screen bg-gray-100 text-neutral-500 p-1 lg:p-3">
      {/* Top Title */}
      <Link     href="/admin" className="flex items-center gap-1 text-2xl font-bold mb-4 cursor-pointer">
        <FaTachometerAlt />
        <span className="hidden lg:block">Dashboard</span>
</Link>

      {/* Menu Items */}
      <ul className="space-y-4">
        <li className="flex items-center gap-1 hover:text-blue-900 cursor-pointer text-xl font-semibold ">
          <Link
            href="/admin/articles-table?page=1"
            className="flex items-center gap-2"
          >
            {" "}
            <FaRegNewspaper />
            <span className="hidden lg:block ">Articles</span>
          </Link>
        </li>
        <li className="flex items-center gap-1  hover:text-blue-900 cursor-pointer text-xl font-semibold ">
          <Link
            href="/admin/comments-table"
            className="flex items-center gap-2"
          >
            <FaRegComments />
            <span className="hidden lg:block">Comments</span>
          </Link>
        </li>
      </ul>
    </div>
  );
}
