import { Link } from "react-router-dom";
import { Github, Twitter, Linkedin, Mail, Phone } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-[#0B0C15] border-t border-white/5 pt-16 pb-8 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">

        {/* Brand Section */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <img src="/logo-removebg-preview.png" alt="logo" className="w-8 h-8" />
            <span className="text-xl font-bold text-white">CollabSpace</span>
          </div>
          <p className="text-gray-400 text-sm">
            The #1 platform for student developers to find teammates and ship amazing projects.
          </p>
        </div>

        {/* Quick Links - MAKE THESE WORK */}
        <div>
          <h4 className="text-white font-semibold mb-6">Quick Links</h4>
          <ul className="space-y-4 text-sm text-gray-400">
            <li><Link to="/" className="hover:text-indigo-400 transition-colors">Home</Link></li>
            <li><Link to="/" className="hover:text-indigo-400 transition-colors">Projects</Link></li>
            <li><Link to="/chats" className="hover:text-indigo-400 transition-colors">Teams</Link></li>
            <li><Link to="/developers" className="hover:text-indigo-400 transition-colors">Developers</Link></li>
          </ul>
        </div>

        {/* Community - LINK TO REAL GITHUB */}
        <div>
          <h4 className="text-white font-semibold mb-6">Community</h4>
          <ul className="space-y-4 text-sm text-gray-400">
            <li>
              <a href="https://github.com/your-username/your-repo" target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:text-white transition-colors">
                <Github size={16} /> Github
              </a>
            </li>
            <li>
              <a href="#" className="flex items-center gap-2 hover:text-white transition-colors">
                <Twitter size={16} /> Twitter
              </a>
            </li>
            <li>
              <a href="#" className="flex items-center gap-2 hover:text-white transition-colors">
                <Linkedin size={16} /> LinkedIn
              </a>
            </li>
          </ul>
        </div>

        {/* Contact - UPDATE INFO */}
        <div>
          <h4 className="text-white font-semibold mb-6">Contact</h4>
          <ul className="space-y-4 text-sm text-gray-400">
            <li className="flex items-center gap-2">
              <Mail size={16} /> collabspace.tpoly@gmail.com
            </li>
            <li className="flex items-center gap-2">
              <Phone size={16} /> +91 91XXXXXXXX
            </li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto pt-8 border-t border-white/5 text-center">
        <p className="text-gray-500 text-xs">
          © {new Date().getFullYear()} CollabSpace. All rights reserved.
          <span className="mx-2">|</span>
          <Link to="#" className="hover:text-white">Privacy Policy</Link>
        </p>
      </div>
    </footer>
  );
};

export default Footer;