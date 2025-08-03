import { Metadata } from "next";
import Sideadmin from "./Sideadmi";
export const metadata: Metadata = {
  title: "Admin Dashboard -",
  description: "Manage site content, users, and settings from the admin panel.",
};
import  Jwt  from 'jsonwebtoken';
import { cookies } from 'next/headers';
import { redirect } from "next/navigation";
export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
      const cookieStore = await cookies();
      let decoded: Jwt.JwtPayload | null = null;

      const tokenprofile = cookieStore.get("jwtToken");
      const jwttockenuser = tokenprofile?.value as string;
      if (jwttockenuser) {
        decoded = Jwt.verify(
          jwttockenuser,
          process.env.JWT_SECRET as string
        ) as Jwt.JwtPayload;
      }
      console.log(decoded, "dec");
      if (!decoded?.isAdmin) {
        redirect("/");
      }
else{  return (
  <div className="flex gap-1">
    <div className="w-fit  lg:w-1/6">
      <Sideadmin />
    </div>
    <div className="w-5/6">{children}</div>
  </div>
);}
}
