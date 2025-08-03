import EditArticleForm from "./EditArticleForm";
import { Article } from "@/generated/prisma";

const EditArticlePage = async ({ params }: any
) => {
  let article: Article | null = null;
  const { id } = await params; // ✅ دلوقتي صح
  const articleId = Number(id);
  try {
    const res = await fetch(`http://localhost:3000/api/articles/${articleId}`, {
      cache: "no-store",
    });
    article = await res.json();
  } catch (error) {
    console.error(error);
    // يمكنك استخدام notFound() إذا لزم الأمر
  }

  return (
    <section className="fix-height flex items-center px-5 lg:px-20">
      <div className="p-4 rounded w-full max-w-xl">
        <h2 className="text-xl lg:text-3xl font-bold mb-6 text-center text-gray-800">
          Edit Article
        </h2>
        {article ? (
          <EditArticleForm article={article} />
        ) : (
          <p className="text-center text-gray-600">Article not found.</p>
        )}
      </div>
    </section>
  );
};

export default EditArticlePage;
