
import {FaGithub, FaPhoneAlt, FaDiscord, FaLinkedin} from "react-icons/fa"
import { IoMdMail } from "react-icons/io";
import { RiTwitterXFill } from "react-icons/ri";

export default function Footer() {
  return (
    <div className="bg-white/10 backdrop-blur-md text-white py-12 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">

        <div>
          <h3 className="text-lg font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2 text-gray-200">
            <li>Home</li>
            <li>Projects</li>
            <li>Teams</li>
            <li>About us</li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-3">Resources</h3>
          <ul className="space-y-2 text-gray-200">
            <li>Documentations</li>
            <li>FAQS</li>
            <li>Blog</li>
            <li>API Access</li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-3">Community</h3>
          <ul className="space-y-3 text-gray-200">
            <li className="flex items-center gap-2"> <FaDiscord size={20}/> Discord</li>
            <li className="flex items-center gap-2"> <RiTwitterXFill size={20}/> Twitter</li>
            <li className="flex items-center gap-2"> <FaLinkedin size={20}/> Linkedin</li>
            <li className="flex items-center gap-2"> <FaGithub size={20}/> Github</li>
          </ul>
        </div>


        <div>
          <h3 className="text-lg font-semibold mb-3">Contact</h3>
          <ul className="space-y-4 text-gray-200">
            <li className="flex flex-col justify-center">
              <IoMdMail size={20} /> collabspace@gmail.com
            </li>
            <li className="flex items-center gap-2">
              <FaPhoneAlt size={20} /> +91XXXXXXXXXX
            </li>
          </ul>
        </div>
      </div>


      <div className="border-t border-gray-100 mt-10 pt-6 text-center text-gray-300">
        <p>© 2025 CollabSpace. All rights reserved.</p>
        <p className="mt-2">
          <span className="cursor-pointer hover:underline">Privacy Policy</span> |
          <span className="cursor-pointer hover:underline ml-1">Terms of Use</span>
        </p>
      </div>
    </div>
  );
}
