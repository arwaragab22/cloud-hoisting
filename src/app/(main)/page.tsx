import Hero from "@/comp/Hero/Hero";
import Landing from "@/comp/landing/Landing";
import WebHostingPlan from "@/comp/Webhost";


export default function Home() {
  return (
    <div className="bg-linear-to-r from-blue-900 to-blue-500">
      <Landing></Landing>
      <Hero />
      <WebHostingPlan></WebHostingPlan>
    </div>
  );
}
