

import Loginform from "@/comp/Loginform";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";


export default async function LoginPage() {
    const cookieStore = await cookies();
    const token = cookieStore.get("jwtToken");
  if (token) {
    redirect("/")
  }
  return (
<Loginform/>
  );
}
