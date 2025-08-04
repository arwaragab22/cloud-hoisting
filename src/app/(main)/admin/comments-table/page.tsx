import axios from "axios";
import { cookies } from "next/headers";
import DeleteCommentButton from "./DeleteCommentButton";
import { Comment } from "@/generated/prisma";

const AdminCommentsTable = async () => {
  const cookieStore = await cookies();

  const jwtttok = cookieStore.get("jwtToken");
  const jwtToken = jwtttok?.value;
  const res = await fetch("https://cloud-hoisting.vercel.app/api/comments", {
    headers: {
      Cookie: `jwtToken=${jwtToken}`,
    },
    cache: "no-store",
  });
  const comments = await res.json();

  return comments.length !== 0 ? (
    <section className="p-5">
      <h1 className="mb-7 text-2xl font-semibold text-gray-700">Comments</h1>
      <table className="table w-full text-left">
        <thead className="border-t-2 border-b-2 border-gray-500 text-xl">
          <tr>
            <th className="p-2">Comment</th>
            <th className="hidden lg:inline-block p-3">Created At</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {comments.length > 0 &&
            comments?.map((comment: Comment) => (
              <tr
                key={comment.id}
                className="border-b border-t border-gray-300"
              >
                <td className="p-3 text-gray-700">{comment.text}</td>
                <td className="text-gray-700 p-3 font-normal hidden lg:inline-block">
                  {new Date(comment.createdAt).toDateString()}
                </td>
                <td>
                  <DeleteCommentButton commentId={comment.id} />
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </section>
  ) : (
    <div className="text-center py-10 text-gray-600">
      <div className="text-3xl mb-2">💬</div>
      <p className="text-base md:text-lg mb-2">No comments yet.</p>
      <p className="text-sm md:text-base">Be the first to leave a comment!</p>
    </div>
  );
};

export default AdminCommentsTable;
