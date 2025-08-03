import { NextResponse, NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
        const tokenprofile = request.cookies.get("jwtToken");
        if (!tokenprofile) {
          return NextResponse.json(
            { message: "Access Denied. No token provided. from middle ware" },
            { status: 401 }
          );
        }
}

// ينفذ الميدل وير فقط على /dashboard و /api/private
export const config = {
  matcher: ["/api/user/profile/:path*", "/api/comments/:path*"],
};