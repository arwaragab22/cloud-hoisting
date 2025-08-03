import Addcommentform from "@/comp/Addcommentform";
import Jwt from "jsonwebtoken";

import Commentdetail from "@/comp/Comments";
import { Article } from "@/generated/prisma";
import { singlearticle } from "@/util/type";
import axios from "axios";
import { cookies } from "next/headers";

type Props = {
  params: { id: string };
};

const SingleArticlePage = async ({
  params,
}: {
  params: Promise<{ id: string }>
}) => {
  const cookieStore = await cookies();
  let decoded: Jwt.JwtPayload | null = null;

  const tokenprofile = cookieStore.get("jwtToken");
  const jwttockenuser = tokenprofile?.value as string;
  if (jwttockenuser) {
    decoded = Jwt.verify(
      jwttockenuser,
      process.env.JWT_SECRET as string
    ) as Jwt.JwtPayload;
  }

  let singlearticledata: singlearticle | null = null;

  const { id } = await params;
  try {
    const res = await axios.get(`http://localhost:3000/api/articles/${id}`);
    singlearticledata = res.data;
  } catch  {
  }

  return (
    <section className="fix-height container m-auto w-full px-5 pt-8 md:w-3/4">
      {singlearticledata && (
        <div className="bg-gray-100 p-7 rounded-lg mb-7">
          <h1 className="text-3xl font-bold text-gray-700 mb-2">
            {singlearticledata?.title}
          </h1>
          <div className="text-gray-400">
            {new Date(singlearticledata?.createdAt).toLocaleString("en-EG", {
              dateStyle: "medium",
              timeStyle: "short",
            })}
          </div>
          <p className="text-gray-800 text-xl mt-5">
            {singlearticledata?.description}
          </p>
        </div>
      )}
      <div className="mt-7">
        {decoded && singlearticledata ? (
          <Addcommentform articleid={singlearticledata?.id} />
        ) : (
          <p className="text-blue-600 md:text-xl m-6">
            to write a comment you should log in first
          </p>
        )}
      </div>
      {singlearticledata?.comments.map((ele) => {
        return (
          <Commentdetail
            isadmin={decoded?.isAdmin}
            key={ele.id}
            comment={ele}
            userid={decoded?.id}
          ></Commentdetail>
        );
      })}
    </section>
  );
};

export default SingleArticlePage;
