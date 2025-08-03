import { getarticlesbusearch } from "@/util/getarticlesbyseacrhtext";
import Searcharticlesinput from "../Searcharticlesinput";
import Article from "@/comp/Article";
import { Article as ArticleModel } from "@/generated/prisma";

const SearchArticlePage = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const searchtext = (await searchParams).searchtext;

  if (!searchtext || typeof searchtext !== "string") {
    return (
      <section className="container m-auto px-5 py-10 text-center">
        <h2 className="text-xl text-red-500">Please enter a search term.</h2>
      </section>
    );
  }

  const datas = await getarticlesbusearch(searchtext);

  return (
    <div className="bg-gray-100 py-3">
      {" "}
      <Searcharticlesinput />
      <section className="fix-height container m-auto px-5 py-10">
        {datas.length === 0 ? (
          <h2 className="text-gray-700 text-xl text-center p-5">
            No articles found for
            <span className="text-red-600 font-semibold mx-1">
              {searchtext}
            </span>
          </h2>
        ) : (
          <>
            <h1 className="text-2xl font-bold mb-6 text-gray-800">
              Results for:
              <span className="ms-2 text-green-700 text-3xl font-bold">
                {searchtext}
              </span>
            </h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {datas.map((item: ArticleModel) => (
                <Article key={item.id} data={item} />
              ))}
            </div>
          </>
        )}
      </section>
    </div>
  );
};

export default SearchArticlePage;
