import { NextRequest, NextResponse } from "next/server";
import prisma from "@/util/db";


export async function GET(request: NextRequest) {
  try {
    const count = await prisma.article.count();
    return NextResponse.json({ count }, { status: 200 });
  } catch (error) {
    const err = error as Error;
    return NextResponse.json({ message: err.message }, { status: 500 });
  }

}
