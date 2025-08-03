
export const dynamic = "force-dynamic";

import { NextResponse, NextRequest } from "next/server";
import prisma from "@/util/db";
import z from "zod";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { serialize } from "cookie";
dotenv.config();

export async function POST(request: NextRequest) {
 const loginSchema = z.object({
    email: z.string().min(3).max(200).email(),
    password: z.string().min(6),
  });
  try {
    const body = await request.json();
    const validation = loginSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        { message: validation.error.errors[0].message },
        { status: 400 }
      );
    }

    const user = await prisma.user.findUnique({ where: { email: body.email } });
    console.log(user);
    if (user) {
      const check = bcrypt.compareSync(body.password, user.password); // true
      console.log(check);
      if (check) {
        const bodyjwt = {
          id: user.id,
          isAdmin: user.isAdmin,
          username: user.username,
        };
        console.log(bodyjwt);
        const token = jwt.sign(bodyjwt, process.env.JWT_SECRET as string, {
          expiresIn: "7d",
        });
        console.log(token, "token55555555");
        const cookie = serialize("jwtToken", token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production", // development=http, production= https
          sameSite: "strict",
          path: "/",
          maxAge: 60 * 60 * 24 * 30, // 30 days
        });
        console.log(cookie, "cookie");
        return NextResponse.json(
          { message: "login", token },
          {
            status: 201,
            headers: {
              "Set-Cookie": cookie,
            },
          }
        );
      } else {
        return NextResponse.json(
          { message: "invalid email or password" },
          { status: 400 }
        );
      }
    } else {
      return NextResponse.json(
        { message: "Invalid email or password. Please try again." },
        { status: 401 }
      );
    }
  } catch (error) {
    const err = error as Error;
    return NextResponse.json({ message: err.message }, { status: 500 });
  }

}
