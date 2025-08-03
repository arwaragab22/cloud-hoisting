import { NextRequest, NextResponse } from "next/server";
import  Jwt  from "jsonwebtoken";
import z from "zod";
import prisma from "@/util/db";
type SearchParams = { [key: string]: string | string[] | undefined };

export async function GET(
  request: NextRequest

) {
  
  try {
    const pagenum = request.nextUrl.searchParams.get("page") ?? "1";
    const articles = await prisma.article.findMany({
      take: 4,
      skip: 4 * (+pagenum - 1),
    });
    //return Response.json(articles, { status: 200 })
    return NextResponse.json(articles, { status: 200 });
  } catch (error) {
    const err = error as Error;
    return NextResponse.json({ message: err.message }, { status: 500 });
  }

}
const articledata = z.object({
  title: z.string().nonempty("please enter title"),
  description: z.string().nonempty("please enter body"),
});
export async function POST(request: NextRequest) {
  try {
    const tokenprofile = request.cookies.get("jwtToken");
    const jwttockenuser = tokenprofile?.value as string;

    if (!jwttockenuser) {
      return NextResponse.json(
        { message: "Missing or invalid token" },
        { status: 401 }
      );
    }

    const body = await request.json();
    const decoded = Jwt.verify(
      jwttockenuser,
      process.env.JWT_SECRET as string
    ) as Jwt.JwtPayload;
    const result = articledata.safeParse(body);
    console.log(decoded, result, "res");
    if (result.success) {
      if (decoded.isAdmin) {
        const newArticle = await prisma.article.create({
          data: {
            title: body.title,
            description: body.description,
          },
        });
        console.log(newArticle, "new");
        return NextResponse.json({ message: body }, { status: 200 });
      } else {
        return NextResponse.json(
          { message: "only admin, access denied" },
          { status: 403 }
        );
      }
    } else {
      return NextResponse.json(
        { message: result.error.issues[0].message },
        { status: 400 }
      );
    }
  } catch (error) {
    const err = error as Error;
    return NextResponse.json({ message: err.message }, { status: 500 });
  }

}
