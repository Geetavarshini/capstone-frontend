import React from 'react';

function Footer() {
  const currentYear = new Date().getFullYear();

  const SocialLink = ({ href, icon, text, isExternal = true }) => (
    <li>
      <a 
        href={href}
        target={isExternal ? "_blank" : "_self"}
        rel={isExternal ? "noreferrer" : ""}
        className="group flex items-center text-white/70 hover:text-white transition-all duration-300 text-sm"
      >
        <span className="mr-3 text-xl group-hover:scale-125 transition-transform duration-300">
          {icon}
        </span>

        <span className="group-hover:translate-x-1 transition-transform duration-300">
          {text}
        </span>
      </a>
    </li>
  );

  return (
    <footer className="relative overflow-hidden bg-[#111111] text-white pt-24 pb-10 mt-auto">

      {/* BACKGROUND BLOBS */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-pink-500 rounded-full blur-3xl opacity-20"></div>

      <div className="absolute top-10 right-0 w-96 h-96 bg-purple-500 rounded-full blur-3xl opacity-20"></div>

      <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-orange-400 rounded-full blur-3xl opacity-10"></div>

      {/* TOP LINE */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-pink-500 via-orange-400 to-purple-500"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10">

        {/* MAIN GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">

          {/* BRAND */}
          <div>

            <div className="inline-block bg-white/10 backdrop-blur-md px-5 py-2 rounded-full text-sm font-semibold mb-6">
              ✨ Creative Platform
            </div>

            <h3 className="text-4xl font-black tracking-tight mb-5">
              Blog
              <span className="bg-gradient-to-r from-pink-400 via-orange-300 to-purple-400 text-transparent bg-clip-text">
                App.
              </span>
            </h3>

            <p className="text-white/60 leading-relaxed">
              A colorful modern space where creators
              share stories, ideas, and inspiration
              with the world.
            </p>

            {/* FLOATING TAGS */}
            <div className="flex flex-wrap gap-3 mt-8">

              <span className="px-4 py-2 bg-white/10 border border-white/10 rounded-full text-xs backdrop-blur-md">
                ✍️ Writing
              </span>

              <span className="px-4 py-2 bg-white/10 border border-white/10 rounded-full text-xs backdrop-blur-md">
                🚀 Creativity
              </span>

              <span className="px-4 py-2 bg-white/10 border border-white/10 rounded-full text-xs backdrop-blur-md">
                🌎 Community
              </span>
            </div>
          </div>

          {/* CONTACT */}
          <div>

            <h4 className="font-black text-white mb-6 uppercase text-sm tracking-widest">
              📬 Contact
            </h4>

            <ul className="space-y-5">

              <SocialLink 
                href="mailto:geetavarshini29@example.com"
                text="Email"
                icon={<span>📧</span>}
              />

              <SocialLink 
                href="tel:+919390020739"
                text="Phone"
                icon={<span>📞</span>}
              />

            </ul>
          </div>

          {/* DEVELOPER */}
          <div>

            <h4 className="font-black text-white mb-6 uppercase text-sm tracking-widest">
              💻 Developer
            </h4>

            <ul className="space-y-5">

              <SocialLink 
                href="https://github.com/Geetavarshini"
                text="GitHub"
                icon={<span>💻</span>}
              />

              <SocialLink 
                href="#"
                text="Portfolio"
                isExternal={false}
                icon={<span>🌐</span>}
              />

            </ul>
          </div>

          {/* TECH STACK */}
          <div>

            <h4 className="font-black text-white mb-6 uppercase text-sm tracking-widest">
              ⚡ Built With
            </h4>

            <div className="flex flex-wrap gap-3">

              <span className="px-4 py-2 bg-gradient-to-r from-pink-500/20 to-orange-400/20 border border-white/10 rounded-full text-sm backdrop-blur-md">
                React
              </span>

              <span className="px-4 py-2 bg-gradient-to-r from-purple-500/20 to-indigo-400/20 border border-white/10 rounded-full text-sm backdrop-blur-md">
                Tailwind
              </span>

              <span className="px-4 py-2 bg-gradient-to-r from-yellow-400/20 to-pink-400/20 border border-white/10 rounded-full text-sm backdrop-blur-md">
                Node.js
              </span>

              <span className="px-4 py-2 bg-gradient-to-r from-green-400/20 to-emerald-400/20 border border-white/10 rounded-full text-sm backdrop-blur-md">
                Express
              </span>

            </div>

            {/* MINI CARD */}
            <div className="mt-8 bg-white/5 border border-white/10 rounded-3xl p-5 backdrop-blur-md">

              <p className="text-white/70 text-sm leading-relaxed">
                Built with creativity, modern UI,
                and passion for storytelling ✨
              </p>
            </div>
          </div>
        </div>

        {/* BOTTOM */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-5">

          <p className="text-white/40 text-sm">
            © {currentYear} Your Blog App — Made with 💜
          </p>

          <div className="flex gap-6">

            <a
              href="#"
              className="text-white/50 hover:text-white transition text-sm"
            >
              Privacy
            </a>

            <a
              href="#"
              className="text-white/50 hover:text-white transition text-sm"
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