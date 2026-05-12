import React from 'react';

function Footer() {
  const currentYear = new Date().getFullYear();

  const SocialLink = ({
    href,
    text,
    isExternal = true,
  }) => (
    <li>
      <a
        href={href}
        target={isExternal ? "_blank" : "_self"}
        rel={isExternal ? "noreferrer" : ""}
        className="text-gray-500 hover:text-gray-900 transition-colors duration-200 text-sm"
      >
        {text}
      </a>
    </li>
  );

  return (
    <footer className="relative overflow-hidden bg-[#fffaf7] border-t border-gray-100 mt-auto">

      {/* BACKGROUND */}
      <div className="absolute top-0 left-0 w-[300px] h-[300px] bg-pink-100 rounded-full blur-3xl opacity-30"></div>

      <div className="absolute top-10 right-0 w-[300px] h-[300px] bg-purple-100 rounded-full blur-3xl opacity-30"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10 py-20">

        {/* TOP */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-14 mb-16">

          {/* BRAND */}
          <div>

            <span className="inline-flex items-center px-4 py-2 rounded-full bg-white/70 backdrop-blur-xl border border-white text-sm text-gray-600 mb-6 shadow-sm">
              Creative publishing platform
            </span>

            <h3 className="text-3xl font-semibold tracking-tight text-gray-900 mb-5">
              BlogApp
            </h3>

            <p className="text-gray-500 leading-relaxed">
              A calm and elegant space for sharing
              stories, ideas, and thoughtful writing.
            </p>
          </div>

          {/* CONTACT */}
          <div>

            <h4 className="text-sm font-medium tracking-wide text-gray-900 mb-6 uppercase">
              Contact
            </h4>

            <ul className="space-y-4">

              <SocialLink
                href="mailto:geetavarshini29@example.com"
                text="Email"
              />

              <SocialLink
                href="tel:+919390020739"
                text="Phone"
              />

            </ul>
          </div>

          {/* LINKS */}
          <div>

            <h4 className="text-sm font-medium tracking-wide text-gray-900 mb-6 uppercase">
              Links
            </h4>

            <ul className="space-y-4">

              <SocialLink
                href="https://github.com/Geetavarshini"
                text="GitHub"
              />

              <SocialLink
                href="#"
                text="Portfolio"
                isExternal={false}
              />

            </ul>
          </div>

          {/* STACK */}
          <div>

            <h4 className="text-sm font-medium tracking-wide text-gray-900 mb-6 uppercase">
              Built with
            </h4>

            <div className="flex flex-wrap gap-3">

              <span className="px-4 py-2 rounded-full bg-white border border-gray-200 text-sm text-gray-600">
                React
              </span>

              <span className="px-4 py-2 rounded-full bg-white border border-gray-200 text-sm text-gray-600">
                Tailwind
              </span>

              <span className="px-4 py-2 rounded-full bg-white border border-gray-200 text-sm text-gray-600">
                Node.js
              </span>

              <span className="px-4 py-2 rounded-full bg-white border border-gray-200 text-sm text-gray-600">
                Express
              </span>

            </div>
          </div>
        </div>

        {/* BOTTOM */}
        <div className="pt-8 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center gap-5">

          <p className="text-gray-400 text-sm">
            © {currentYear} BlogApp
          </p>

          <div className="flex gap-6">

            <a
              href="#"
              className="text-gray-400 hover:text-gray-900 transition text-sm"
            >
              Privacy
            </a>

            <a
              href="#"
              className="text-gray-400 hover:text-gray-900 transition text-sm"
            >
              Terms
            </a>

          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;