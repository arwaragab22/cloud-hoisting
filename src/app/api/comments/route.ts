import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import z from "zod"; import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import prisma from "@/util/db";
import bcrypt from "bcryptjs";
dotenv.config();
const commentschems = z.object({
    text: z
        .string()
        .min(1, "Comment cannot be empty")
        .max(200, "Comment must not exceed 200 characters"),

    articleId: z.number().min(1, "Invalid or missing article ID"),
});
//add comment 
export async function POST(request: NextRequest) {
    try {
      const body = await request.json();

      const validation = commentschems.safeParse(body);
      if (!validation.success) {
        return NextResponse.json(
          { message: validation.error.errors[0].message },
          { status: 400 }
        );
      }
      const jwtToken = request.cookies.get("jwtToken");
      const token = jwtToken?.value as string;
      if (!token) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
      }

      const privateKey = process.env.JWT_SECRET as string;
      const userPayload = jwt.verify(token, privateKey) as jwt.JwtPayload;
      if (userPayload) {
        const newComment = await prisma.comment.create({
          data: {
            text: body.text,
            articleId: body.articleId,
            userId: userPayload.id,
          },
        });
        return NextResponse.json(newComment, { status: 201 });
      } else {
        return NextResponse.json(
          { message: "only logged in user, access denied" },
          { status: 401 }
        );
      }
    } catch (error) {
      const err = error as Error;
      return NextResponse.json({ message: err.message }, { status: 500 });
    }

}
export async function GET(request: NextRequest) {
    try {
      const jwtToken = request.cookies.get("jwtToken");
      const token = jwtToken?.value as string;
      if (!token) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
      }

      const privateKey = process.env.JWT_SECRET as string;
      const userPayload = jwt.verify(token, privateKey) as jwt.JwtPayload;
      if (userPayload.isAdmin) {
        const comments = await prisma.comment.findMany({});
        return NextResponse.json(comments, { status: 201 });
      } else {
        return NextResponse.json(
          { message: "only admin get comments, access denied" },
          { status: 401 }
        );
      }
    } catch (error) {
      const err = error as Error;
      return NextResponse.json({ message: err.message }, { status: 500 });
    }

}