import Article from "@/comp/Article";

import type { Article as ArticleType } from "@/generated/prisma";
import Searcharticlesinput from "./Searcharticlesinput";
import Paginatenum from "@/comp/Paginatenum";
import { getcount } from "@/util/count";

export default async function Page({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  console.log("articles page");
  const { page } = searchParams;
  const page1 = Array.isArray(page) ? page[0] : page ?? "1";
  const countsnum = await getcount();
  const pagenumper = Math.ceil(countsnum / 4);

  const data = await fetch(
    `https://cloud-hoisting.vercel.app/api/articles?page=${page1 || 1}`,
    {
      cache: "no-store",
    }
  );
  if (!data.ok) {
    throw new Error("arwa");
  }
  const posts = await data.json();

  return (
    <div className="bg-gray-100 py-3">
      <Searcharticlesinput />
      <div className="grid grid-cols-1 sm:grid-cols-2  md:grid-cols-4 gap-y-4 gap-x-6 px-md-7 w-[100%] md:w-[85%] m-auto py-7">
        {posts &&
          posts.map((post: ArticleType) => (
            <Article data={post} key={post.id}></Article>
          ))}
      </div>
      <Paginatenum
        pagenumb={page1}
        pagenumper={pagenumper}
        route="articles"
      ></Paginatenum>
    </div>
  );
}
