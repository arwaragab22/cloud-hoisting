export const dynamic = "force-dynamic";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import z from "zod";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import prisma from "@/util/db";
import bcrypt from "bcryptjs";
dotenv.config();
const commentschems = z.object({
  text: z
    .string()
    .min(1, "Comment cannot be empty")
    .max(200, "Comment must not exceed 200 characters"),
});
export async function PUT(
  request: NextRequest,
  context: { params: { id: string } }
) {
  try {
    const id = context.params.id;

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

    if (token) {
      const privateKey = process.env.JWT_SECRET as string;
      const commentpayload = jwt.verify(token, privateKey) as jwt.JwtPayload;
      const comment1 = await prisma.comment.findUnique({
        where: { id: parseInt(id) },
      });
      if (commentpayload.id == comment1?.userId) {
        const updatedComment = await prisma.comment.update({
          where: { id: parseInt(id) },
          data: { text: body.text },
        });

        return NextResponse.json(updatedComment, { status: 200 });
      } else {
        return NextResponse.json(
          { message: "you are not allowed, access denied" },
          { status: 403 }
        );
      }
    }
  } catch (error) {
    return NextResponse.json({ message: "internal server error", status: 500 });
  }
}
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const jwtToken = request.cookies.get("jwtToken");
    const token = jwtToken?.value as string;

    if (!token) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const privateKey = process.env.JWT_SECRET as string;
    const commentpayload = jwt.verify(token, privateKey) as jwt.JwtPayload;
    const comment1 = await prisma.comment.findUnique({
      where: { id: parseInt(params?.id) },
    });
    if (commentpayload.id == comment1?.userId || commentpayload.isAdmin) {
      const updatedComment = await prisma.comment.delete({
        where: { id: parseInt(params.id) },
      });

      return NextResponse.json({ message: "deleted" }, { status: 200 });
    } else {
      return NextResponse.json(
        { message: "you are not allowed, access denied" },
        { status: 403 }
      );
    }
  } catch (error) {
    const err = error as Error;
    return NextResponse.json({ message: err.message }, { status: 500 });
  }
}
