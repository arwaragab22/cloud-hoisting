import type { Metadata } from "next";

import "@/app/globals.css";
import Header from "@/comp/header/Header";
import Footer from "../../comp/Footer";

export const metadata = {
  title: "Cloud Hosting Articles Dashboard",
  description: "An admin dashboard built with Next.js and React to manage cloud hosting articles and comments."

};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-dvh flex flex-col">
      <div>
        <Header></Header>
      </div>
      <div className="flex-1"> {children}</div>
      <Footer></Footer>
    </div>
  );
}
