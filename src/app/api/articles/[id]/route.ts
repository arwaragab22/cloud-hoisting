export const dynamic = "force-dynamic";

import { NextRequest, NextResponse } from "next/server";
import Jwt from "jsonwebtoken";
import prisma from "@/util/db";
import z from "zod";
const articledata = z.object({
  title: z.string().nonempty("please enter title"),
  description: z.string().nonempty("please enter body"),
});
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    if (!params?.id || isNaN(Number(params.id))) {
      return NextResponse.json(
        { message: "Invalid article ID" },
        { status: 400 }
      );
    }

    const article = await prisma.article.findUnique({
      where: { id: parseInt(params?.id) },
      include: {
        comments: {
          include: {
            user: {
              select: {
                username: true,
              },
            },
          },
          orderBy: {
            createdAt: "desc",
          },
        },
      },
    });

    if (!article) {
      return NextResponse.json(
        { message: "article not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(article, { status: 200 });
  } catch (error) {
    const err = error as Error;
    return NextResponse.json({ message: err.message }, { status: 500 });
  }
}
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
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
    const result = articledata.safeParse(body);
    if (!params?.id || isNaN(Number(params.id))) {
      return NextResponse.json(
        { message: "Invalid article ID" },
        { status: 400 }
      );
    }

    if (result.success) {
      const article = await prisma.article.findUnique({
        where: { id: parseInt(params.id) },
      });

      if (!article) {
        return NextResponse.json(
          { message: "article not found" },
          { status: 404 }
        );
      }

      const decoded = Jwt.verify(
        jwttockenuser,
        process.env.JWT_SECRET as string
      ) as Jwt.JwtPayload;

      if (decoded.isAdmin) {
        const updatedArticle = await prisma.article.update({
          where: { id: parseInt(params.id) },
          data: {
            title: body.title,
            description: body.description,
          },
        });

        return NextResponse.json({ message: updatedArticle }, { status: 200 });
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
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const tokenprofile = request.cookies.get("jwtToken");
    const jwttockenuser = tokenprofile?.value as string;

    if (!jwttockenuser) {
      return NextResponse.json(
        { message: "Missing or invalid token" },
        { status: 401 }
      );
    }

    if (params.id) {
      const article = await prisma.article.findUnique({
        where: { id: parseInt(params.id) },
        include: { comments: true },
      });

      if (article) {
        const decoded = Jwt.verify(
          jwttockenuser,
          process.env.JWT_SECRET as string
        ) as Jwt.JwtPayload;

        if (decoded.isAdmin) {
          const articledel = await prisma.article.delete({
            where: {
              id: parseInt(params.id),
            },
          });

          return NextResponse.json({ message: "deleted" }, { status: 200 });
        } else {
          return NextResponse.json(
            { message: "only admin, access denied" },
            { status: 403 }
          );
        }
      } else {
        return NextResponse.json(
          { message: "article not found" },
          { status: 404 }
        );
      }
    }
  } catch (error) {
    const err = error as Error;
    return NextResponse.json({ message: err.message }, { status: 500 });
  }
}
