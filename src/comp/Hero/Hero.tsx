// components/Hero.tsx
import Image from "next/image";
import { TiTick } from "react-icons/ti";


const Hero = () => {
  return (
    <section className="bg-white py-16 px-6 md:px-20">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-10 items-center">
        {/* Left Content */}
        <div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
            Cloud Hosting
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            The best web hosting solution for your online success
          </p>

          <div className="space-y-4">
            <ServiceItem text="Easy To Use Control Panel" />
            <ServiceItem text="Secure Hosting" />
            <ServiceItem text="Website Maintenance" />
          </div>
        </div>

        {/* Right Image */}
        <div className="flex justify-center">
          <Image
            src={"/1.png"}
            alt="Cloud"
            width={500}
            height={500}
            className="rounded-xl shadow-md"
          />
        </div>
      </div>
    </section>
  );
};

const ServiceItem = ({ text }: { text: string }) => (
  <div className="flex items-center text-gray-700 text-lg">
    <TiTick className="text-green-500 text-2xl mr-2" />
    {text}
  </div>
);

export default Hero;
