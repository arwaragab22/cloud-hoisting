
import React from "react";
import Registerform from "@/comp/Registerform";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";



export default  async  function RegisterPage() {              

    const cookieStore = await cookies();
    const token = cookieStore.get("jwtToken");
  if (token) {
    redirect("/")
  }

  return (
<Registerform/>
  );
}
