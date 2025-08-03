"use client";
import { getcount } from "@/util/count";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";


function Paginatenum({
  route,
  pagenumb,
  pagenumper,
}: {
  pagenumb: string;
  route:string,
  pagenumper: number;
}) {
  const [currentPage, setCurrentPage] = useState(+pagenumb);
  const router = useRouter();
  const [paginatenum, setpaginatenum] = useState<number[]>([]);
  useEffect(() => {
    const gungetcount = async () => {
      const paginatenum1 = Array.from({ length: pagenumper }, (_, i) => i + 1);

      setpaginatenum([...paginatenum1]);
    };
    gungetcount();
  }, [pagenumper, pagenumb]);

  const goPrev = () => {
    if (+pagenumb > 1) setCurrentPage(+pagenumb - 1);
    router.push(`articles?page=${+pagenumb - 1}`);
  };

  const goNext = () => {
    if (+pagenumb < paginatenum.length) setCurrentPage(+pagenumb + 1);
    router.push(`articles?page=${+pagenumb + 1}`);
  };

  return (
    <div className="flex items-center justify-center gap-2 mt-6">
      {+pagenumb !== 1 && (
        <button
          onClick={goPrev}
          className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
          disabled={+pagenumb === 1}
        >
          Prev
        </button>
      )}

      {paginatenum.map((numb) => {
        return (
          <Link
            key={numb}
            href={`${route}?page=${numb}`}
            prefetch
            className={`px-4 py-2 hidden md:block rounded-full cursor-pointer  text-sm md:text-base ${
              +pagenumb === numb
                ? "bg-blue-600 text-white font-bold"
                : "bg-gray-100 hover:bg-gray-200"
            }`}
          >
            {numb}
          </Link>
        );
      })}
      <span className="text-sm font-medium  md:hidden">
        Page {pagenumb} of {pagenumper}
      </span>
      {+pagenumb !== paginatenum.length && (
        <button
          onClick={goNext}
          className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
          disabled={+pagenumb === paginatenum.length}
        >
          Next
        </button>
      )}
    </div>
  );
}

export default Paginatenum;
