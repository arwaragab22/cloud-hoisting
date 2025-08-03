// components/Footer.tsx

import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-12 px-4">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Logo & Description */}
        <div>
          <h2 className="text-2xl font-bold text-white">CloudHub</h2>
          <p className="mt-2 text-sm text-gray-400">
            Explore cloud platforms, tutorials, and comparisons — all in one
            place.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-white text-lg font-semibold mb-3">Sections</h3>
          <ul className="space-y-2">
            <li>
              <a href="/providers" className="hover:text-white">
                Providers
              </a>
            </li>
            <li>
              <a href="/tutorials" className="hover:text-white">
                Tutorials
              </a>
            </li>
            <li>
              <a href="/compare" className="hover:text-white">
                Compare
              </a>
            </li>
            <li>
              <a href="/about" className="hover:text-white">
                About
              </a>
            </li>
          </ul>
        </div>

        {/* Resources */}
        <div>
          <h3 className="text-white text-lg font-semibold mb-3">Resources</h3>
          <ul className="space-y-2">
            <li>
              <a
                href="https://aws.amazon.com/"
                className="hover:text-white"
                target="_blank"
              >
                AWS
              </a>
            </li>
            <li>
              <a
                href="https://azure.microsoft.com/"
                className="hover:text-white"
                target="_blank"
              >
                Azure
              </a>
            </li>
            <li>
              <a
                href="https://cloud.google.com/"
                className="hover:text-white"
                target="_blank"
              >
                Google Cloud
              </a>
            </li>
          </ul>
        </div>

        {/* Social */}
        <div>
          <h3 className="text-white text-lg font-semibold mb-3">Follow Us</h3>
          <div className="flex space-x-4 text-xl">
            <a
              href="https://github.com/"
              target="_blank"
              className="hover:text-white"
            >
              <FaGithub />
            </a>
            <a
              href="https://linkedin.com/"
              target="_blank"
              className="hover:text-white"
            >
              <FaLinkedin />
            </a>
            <a
              href="https://twitter.com/"
              target="_blank"
              className="hover:text-white"
            >
              <FaTwitter />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="mt-12 text-center text-sm text-gray-500 border-t border-gray-700 pt-6">
        © {new Date().getFullYear()} CloudHub. All rights reserved.
      </div>
    </footer>
  );
}
