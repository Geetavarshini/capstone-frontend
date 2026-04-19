import React from 'react';

function Footer() {
  const currentYear = new Date().getFullYear();

  const SocialLink = ({ href, icon, text, isExternal = true }) => (
    <li>
      <a 
        href={href}
        target={isExternal ? "_blank" : "_self"}
        rel={isExternal ? "noreferrer" : ""}
        className="group flex items-center text-gray-400 hover:text-white transition-colors text-sm"
      >
        <span className="mr-3 text-gray-500 group-hover:text-blue-400 transition-colors">
          {icon}
        </span>
        {text}
      </a>
    </li>
  );

  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white pt-20 pb-10 mt-auto">
      
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Brand */}
          <div>
            <h3 className="text-2xl font-extrabold tracking-tight mb-4">
              Blog<span className="text-blue-400">App.</span>
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              A modern platform for creators to share ideas, stories, and knowledge with the world.
            </p>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold text-gray-300 mb-6 uppercase text-[10px] tracking-widest">
              Contact
            </h4>
            <ul className="space-y-4">
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

          {/* Developer */}
          <div>
            <h4 className="font-bold text-gray-300 mb-6 uppercase text-[10px] tracking-widest">
              Developer
            </h4>
            <ul className="space-y-4">
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

          {/* Tech Stack */}
          <div>
            <h4 className="font-bold text-gray-300 mb-6 uppercase text-[10px] tracking-widest">
              Built With
            </h4>
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1 bg-white/10 border border-white/10 rounded-full text-xs">React</span>
              <span className="px-3 py-1 bg-white/10 border border-white/10 rounded-full text-xs">Tailwind</span>
              <span className="px-3 py-1 bg-white/10 border border-white/10 rounded-full text-xs">Node.js</span>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-xs">
            © {currentYear} Your Blog App
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-gray-400 hover:text-white text-xs transition">Privacy</a>
            <a href="#" className="text-gray-400 hover:text-white text-xs transition">Terms</a>
          </div>
        </div>

      </div>
    </footer>
  );
}

export default Footer;

