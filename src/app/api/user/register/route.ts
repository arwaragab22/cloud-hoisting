export const dynamic = "force-dynamic";

import { NextResponse, NextRequest } from "next/server";
import prisma from "@/util/db";
import z from "zod";
import bcrypt from "bcryptjs";

export async function POST(request: NextRequest) {
  const registerSchema = z.object({
    username: z.string().min(2).max(100), //.optional(),
    email: z.string().min(3).max(200).email(),
    password: z.string().min(6),
  });
  try {
    const body = await request.json();
    const validation = registerSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        { message: validation.error.errors[0].message },
        { status: 400 }
      );
    }

    const user = await prisma.user.findUnique({ where: { email: body.email } });
    if (user) {
      return NextResponse.json(
        { message: "this user already registered" },
        { status: 400 }
      );
    }

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(body.password, salt);

    const newUser = await prisma.user.create({
      data: {
        username: body.username,
        email: body.email,
        password: hash,
      },
      select: {
        username: true,
        isAdmin: true,
        id: true,
      },
    });
    return NextResponse.json({ newUser }, { status: 201 });
  } catch (error) {
    const err = error as Error;
    return NextResponse.json({ message: err.message }, { status: 500 });
  }
}
