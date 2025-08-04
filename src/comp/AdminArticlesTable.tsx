import Link from "next/link";
import { Article as ArticleModel } from "@/generated/prisma";

import { getcount } from "@/util/count";
import Paginatenum from "@/comp/Paginatenum";
import DeleteArticleButton from "@/comp/DeleteArticleButton";

const AdminArticlesTable = async ({ page }: { page: string }) => {
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

  const articles = await data.json();

  return articles.length !== 0 ? (
    <section className="p-5">
      <h1 className="mb-7 text-2xl font-semibold text-gray-700">Articles</h1>
      <table className="table w-full text-left table-fixed">
        <thead className="border-t-2 border-b-2 border-gray-500 lg:text-xl">
          <tr>
            <th className="p-1 lg:p-2">Title</th>
            <th className="hidden lg:inline-block lg:p-2">Created At</th>
            <th>Actions</th>
            <th className="hidden lg:inline-block"></th>
          </tr>
        </thead>
        <tbody>
          {articles?.map((article: ArticleModel) => (
            <tr key={article.id} className="border-b border-t border-gray-300 ">
              <td className="p-3 text-gray-700 w-[25%]">{article.title}</td>
              <td className="hidden lg:inline-block text-gray-700 font-normal p-3  w-[25%]">
                {new Date(article.createdAt).toDateString()}
              </td>
              <td className="p-3  w-[25%]">
                <Link
                  href={`/admin/articles-table/edit/${article.id}`}
                  className="bg-green-600 text-white rounded-lg py-1 px-2 inline-block text-center mb-2 me-2 lg:me-3 hover:bg-green-800 transition"
                >
                  Edit
                </Link>
                <DeleteArticleButton articleId={article.id} />
              </td>
              <td className="hidden lg:inline-block p-3 ">
                <Link
                  href={`../articles/${article.id.toString()}`}
                  className="text-white bg-blue-600 rounded-lg p-2 hover:bg-blue-800"
                >
                  Read More
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Paginatenum
        pagenumb={page}
        pagenumper={pagenumper}
        route="articles-table"
      ></Paginatenum>
    </section>
  ) : (
    <div className="text-center py-16 text-gray-600">
      <h2 className="text-xl md:text-2xl font-semibold mb-4">
        No articles found
      </h2>
      <p className="mb-6">
        You haven't added any articles yet. Start sharing your knowledge by
        creating your first article.
      </p>

      <Link
        href="/admin/articles/new"
        className="inline-block px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
      >
        + Create New Article
      </Link>
    </div>
  );
};

export default AdminArticlesTable;
