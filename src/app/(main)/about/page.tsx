// app/about/page.tsx
import { Metadata } from "next";
import Image from "next/image";
import { ClipLoader } from "react-spinners";
export const metadata: Metadata = {
  title: "About Us - cloudhoisting",
  description: "Learn more about our mission, vision, and team.",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white py-16 px-2 md:px-4 sm:px-6 lg:px-20">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Image Section */}
          <div>
            <Image
              src="/1.png"
              alt="Cloud Technology"
              className="rounded-2xl shadow-lg"
              width={600}
              height={400}
            />
          </div>

          {/* Text Section */}
          <div>
            <h1 className="text-xl md:text-4xl font-bold text-gray-800 mb-4 font-bold">
              About Our Cloud Technology
            </h1>
            <p className="text-gray-600 text-lg mb-6 leading-relaxed">
              Cloud computing is transforming the way businesses scale, store
              data, and deliver services. At the heart of our platform is a
              powerful cloud infrastructure that enables flexibility, speed, and
              global reach.
            </p>

            <div className="space-y-4">
              <Feature
                title="Scalability"
                desc="Easily scale your resources up or down based on demand."
              />
              <Feature
                title="Security"
                desc="Our cloud platform uses end-to-end encryption and strict access controls."
              />
              <Feature
                title="Global Access"
                desc="Access data and services anytime, anywhere, from any device."
              />
              <Feature
                title="Cost Efficiency"
                desc="Pay only for what you use, with no hidden infrastructure costs."
              />
            </div>
  
          </div>
        </div>
      </div>
    </div>
  );
}

function Feature({ title, desc }: { title: string; desc: string }) {
  return (
    <div>
      <h3 className="text-xl font-semibold text-blue-600">{title}</h3>
      <p className="text-gray-500">{desc}</p>
    </div>
  );
}
