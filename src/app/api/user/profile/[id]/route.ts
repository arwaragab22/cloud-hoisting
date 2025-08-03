export const dynamic = "force-dynamic";
import { NextResponse, NextRequest } from "next/server";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import prisma from "@/util/db";
import bcrypt from "bcryptjs";
import z from "zod";
dotenv.config();

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const tokenprofile = request.cookies.get("jwtToken");
    const jwttocken = tokenprofile?.value as string;

    const decoded = jwt.verify(
      jwttocken,
      process.env.JWT_SECRET as string
    ) as jwt.JwtPayload;

    if (!decoded?.id) {
      return NextResponse.json(
        { message: "Invalid token payload." },
        { status: 403 }
      );
    }

    const userIdFromToken = parseInt(decoded.id);
    const userIdFromParams = parseInt(params.id);

    if (userIdFromToken !== userIdFromParams) {
      return NextResponse.json(
        {
          message: "Only the user can delete their own profile. Forbidden.",
        },
        { status: 403 }
      );
    }

    await prisma.user.delete({
      where: { id: userIdFromParams },
    });

    return NextResponse.json(
      { message: "Your profile (account) has been deleted." },
      { status: 200 }
    );
  } catch (error) {
    const err = error as Error;
    return NextResponse.json({ message: err.message }, { status: 500 });
  }
}
//get profile
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const tokenprofile = request.cookies.get("jwtToken");
    const jwttocken = tokenprofile?.value as string;
    const data = await request.json();

    const decoded = jwt.verify(
      jwttocken,
      process.env.JWT_SECRET as string
    ) as jwt.JwtPayload;
    if (+decoded.id == +params.id) {
      if (data?.password) {
        const salt = bcrypt.genSaltSync(10);
        data.password = bcrypt.hashSync(data.password, salt);
      }
      const updatedUser = await prisma.user.update({
        where: { id: parseInt(params.id) },
        data: {
          username: data.username,
          email: data.email,
          password: data.password,
        },
      });
      return NextResponse.json({ message: updatedUser }, { status: 201 });
    }
  } catch (error) {
    const err = error as Error;
    return NextResponse.json({ message: err.message }, { status: 500 });
  }
}
