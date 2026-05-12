import React from 'react';

function Footer() {
  const currentYear = new Date().getFullYear();

  const SocialLink = ({
    href,
    text,
    icon,
    isExternal = true,
  }) => (
    <li>
      <a
        href={href}
        target={isExternal ? "_blank" : "_self"}
        rel={isExternal ? "noreferrer" : ""}
        className="flex items-center gap-2.5 text-gray-500 hover:text-gray-900 transition-colors duration-200 text-sm"
      >
        <span className="text-sm opacity-70">
          {icon}
        </span>

        {text}
      </a>
    </li>
  );

  return (
    <footer className="relative overflow-hidden bg-[#f7f1eb] border-t border-[#e8dfd8] mt-auto">

      {/* SOFT BACKGROUND */}
      <div className="absolute top-0 left-0 w-[220px] h-[220px] bg-pink-100 rounded-full blur-3xl opacity-20"></div>

      <div className="absolute bottom-0 right-0 w-[220px] h-[220px] bg-purple-100 rounded-full blur-3xl opacity-20"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10 py-12">

        {/* TOP */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-10">

          {/* BRAND */}
          <div>

            <span className="inline-flex items-center px-3 py-1.5 rounded-full bg-white/80 backdrop-blur-xl border border-white text-xs text-gray-600 mb-4 shadow-sm">
              Creative publishing platform
            </span>

            <h3 className="text-2xl font-semibold tracking-tight text-gray-900 mb-3">
              BlogApp
            </h3>

            <p className="text-sm text-gray-500 leading-relaxed max-w-xs">
              A calm and elegant space for sharing
              stories and thoughtful writing.
            </p>
          </div>

          {/* CONTACT */}
          <div>

            <h4 className="text-xs font-medium tracking-[0.2em] text-gray-900 mb-5 uppercase">
              Contact
            </h4>

            <ul className="space-y-3">

              <SocialLink
                href="mailto:geetavarshini29@example.com"
                text="Email"
                icon="✉"
              />

              <SocialLink
                href="tel:+919390020739"
                text="Phone"
                icon="⌁"
              />

            </ul>
          </div>

          {/* LINKS */}
          <div>

            <h4 className="text-xs font-medium tracking-[0.2em] text-gray-900 mb-5 uppercase">
              Links
            </h4>

            <ul className="space-y-3">

              <SocialLink
                href="https://github.com/Geetavarshini"
                text="GitHub"
                icon="⌘"
              />

              <SocialLink
                href="#"
                text="Portfolio"
                icon="◌"
                isExternal={false}
              />

            </ul>
          </div>

          {/* STACK */}
          <div>

            <h4 className="text-xs font-medium tracking-[0.2em] text-gray-900 mb-5 uppercase">
              Built with
            </h4>

            <div className="flex flex-wrap gap-2">

              <span className="px-3 py-1.5 rounded-full bg-white/90 border border-[#ece5df] text-xs text-gray-600 shadow-sm">
                React
              </span>

              <span className="px-3 py-1.5 rounded-full bg-white/90 border border-[#ece5df] text-xs text-gray-600 shadow-sm">
                Tailwind
              </span>

              <span className="px-3 py-1.5 rounded-full bg-white/90 border border-[#ece5df] text-xs text-gray-600 shadow-sm">
                Node.js
              </span>

              <span className="px-3 py-1.5 rounded-full bg-white/90 border border-[#ece5df] text-xs text-gray-600 shadow-sm">
                Express
              </span>

            </div>
          </div>
        </div>

        {/* BOTTOM */}
        <div className="pt-6 border-t border-[#e5ddd6] flex flex-col md:flex-row justify-between items-center gap-4">

          <p className="text-gray-400 text-xs">
            © {currentYear} BlogApp
          </p>

          <div className="flex gap-5">

            <a
              href="#"
              className="text-gray-400 hover:text-gray-900 transition text-xs"
            >
              Privacy
            </a>

            <a
              href="#"
              className="text-gray-400 hover:text-gray-900 transition text-xs"
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