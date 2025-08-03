import { NextResponse, NextRequest } from "next/server";
import dotenv from "dotenv";

import { serialize } from "cookie";

dotenv.config();

export async function GET(request: NextRequest) {
    try {
      const expiredCookie = serialize("jwtToken", "", {
        httpOnly: true,
        path: "/",
        maxAge: 0,
      });
      return NextResponse.json(
        {
          message: "logout",
        },
        {
          headers: {
            "Set-Cookie": expiredCookie,
          },
        }
      );
    } catch (error) {
      const err = error as Error;
      return NextResponse.json({ message: err.message }, { status: 500 });
    }


}
