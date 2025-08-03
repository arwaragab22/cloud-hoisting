import type { Metadata } from "next";
import ".././app/globals.css";

import { Bounce, ToastContainer } from "react-toastify";

export const metadata: Metadata = {
  title: "cloud hosting app",
  description: "this is cloud hosting app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
        <ToastContainer
          position="top-center"
          autoClose={2000}
          hideProgressBar
          newestOnTop
          closeOnClick
          
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="white"
          transition={Bounce}
        />
      </body>
    </html>
  );
}
