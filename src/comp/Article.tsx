import React from "react";
import { Article  as Article1} from "@/generated/prisma";

import { FaInfoCircle } from "react-icons/fa";
import Link from "next/link";
function Article({ data }: { data: Article1 }) {
  return (
    <div className="border border-gray-200 rounded-xl p-5 flex flex-col gap-4 shadow-sm hover:shadow-md transition-shadow duration-200">
      {/* Icon + Title */}
      <div className="flex items-center gap-3 mb-2">
        <FaInfoCircle className="text-blue-600 text-2xl" />
        <h3 className="text-lg font-semibold text-blue-800">
          {data.title.split(" ", 3).join(" ")}
        </h3>
      </div>

      {/* Description */}
      <p className="text-gray-600 text-sm leading-relaxed">
        {data.title.split(" ", 5).join(" ")}
      </p>

      {/* Button */}
      <Link
        href={`/articles/${data.id}`}
        className="inline-block self-start bg-blue-900 text-white px-4 py-2 rounded-md capitalize font-medium text-sm hover:bg-blue-800 transition-colors duration-200"
      >
        Read more
      </Link>
    </div>
  );
}

export default Article;
