// import React from "react";
// import { Link } from "react-router-dom";
// import { Facebook, Twitter, Instagram, Youtube, MapPin, Phone, Mail } from "lucide-react";
// import Logo from "./Logo";

// export default function Footer() {
//   return (
//     <footer className="bg-gray-100 pt-16 pb-8">
//       <div className="container mx-auto px-4">
//         <div className="grid grid-cols-3 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
//           {/* Company Info */}
//           <div>
//             <Logo size="default" className="mb-4" />
//             <p className="text-gray-600 mb-4">
//               Your ultimate destination for fashion and lifestyle. Discover the latest trends and express your unique
//               style with StyleSphere.
//             </p>
//             <div className="flex space-x-4">
//               <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-pink-600 transition-colors">
//                 <Facebook className="h-5 w-5" />
//               </a>
//               <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-pink-600 transition-colors">
//                 <Twitter className="h-5 w-5" />
//               </a>
//               <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-pink-600 transition-colors">
//                 <Instagram className="h-5 w-5" />
//               </a>
//               <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-pink-600 transition-colors">
//                 <Youtube className="h-5 w-5" />
//               </a>
//             </div>
//           </div>

//           {/* Quick Links */}
//           <div>
//             <h4 className="font-semibold text-gray-900 mb-4">Quick Links</h4>
//             <ul className="space-y-2">
//               <li><Link to="/about" className="text-gray-600 hover:text-pink-600 transition-colors">About Us</Link></li>
//               <li><Link to="/contact" className="text-gray-600 hover:text-pink-600 transition-colors">Contact Us</Link></li>
//               {/* <li><Link to="/careers" className="text-gray-600 hover:text-pink-600 transition-colors">Careers</Link></li>
//               <li><Link to="/blog" className="text-gray-600 hover:text-pink-600 transition-colors">Fashion Blog</Link></li> */}
//             </ul>
//           </div>

//           {/* Customer Service */}
//           {/* <div>
//             <h4 className="font-semibold text-gray-900 mb-4">Customer Service</h4>
//             <ul className="space-y-2">
//               <li><Link to="/help" className="text-gray-600 hover:text-pink-600 transition-colors">Help Center</Link></li>
//               <li><Link to="/returns" className="text-gray-600 hover:text-pink-600 transition-colors">Returns & Exchanges</Link></li>
//               <li><Link to="/shipping" className="text-gray-600 hover:text-pink-600 transition-colors">Shipping Info</Link></li>
//               <li><Link to="/size-guide" className="text-gray-600 hover:text-pink-600 transition-colors">Size Guide</Link></li>
//             </ul>
//           </div> */}

//           {/* Contact Info */}
//           <div>
//             <h4 className="font-semibold text-gray-900 mb-4">Get in Touch</h4>
//             <div className="space-y-3">
//               <div className="flex items-start space-x-3">
//                 <MapPin className="h-5 w-5 text-pink-600 mt-0.5" />
//                 <div className="text-gray-600 text-sm">
//                   <p>StyleSphere Fashion Hub</p>
//                   <p>Phoenix MarketCity, Kurla West</p>
//                   <p>Mumbai - 400070, India</p>
//                 </div>
//               </div>
//               <div className="flex items-center space-x-3">
//                 <Phone className="h-5 w-5 text-pink-600" />
//                 <span className="text-gray-600 text-sm">+91 98765 43210</span>
//               </div>
//               <div className="flex items-center space-x-3">
//                 <Mail className="h-5 w-5 text-pink-600" />
//                 <span className="text-gray-600 text-sm">support@stylesphere.in</span>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Bottom Section */}
//         <div className="border-t border-gray-300 pt-8">
//           <div className="flex flex-col md:flex-row justify-between items-center">
//             <div className="text-center md:text-left mb-4 md:mb-0">
//               <p className="text-gray-600">&copy; 2024 StyleSphere. All rights reserved.</p>
//             </div>
//             {/* <div className="flex flex-wrap justify-center md:justify-end space-x-6">
//               <Link to="/privacy" className="text-gray-600 hover:text-pink-600 transition-colors text-sm">Privacy Policy</Link>
//               <Link to="/terms" className="text-gray-600 hover:text-pink-600 transition-colors text-sm">Terms of Service</Link>
//               <Link to="/refund" className="text-gray-600 hover:text-pink-600 transition-colors text-sm">Refund Policy</Link>
//               <Link to="/cookies" className="text-gray-600 hover:text-pink-600 transition-colors text-sm">Cookie Policy</Link>
//             </div> */}
//           </div>
//         </div>
//       </div>
//     </footer>
//   );
// }

import React, { useState } from "react";
import { Facebook, Twitter, Instagram, Youtube, MapPin, Phone, Mail, ArrowUp, Heart, Sparkles } from "lucide-react";
import Logo from "./Logo"

const Link = ({ to, children, className, ...props }) => (
  <a href={to} className={className} {...props}>
    {children}
  </a>
);

export default function Footer() {
  const [hoveredSocial, setHoveredSocial] = useState(null);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const socialLinks = [
    { icon: Facebook, href: "https://facebook.com", name: "Facebook", color: "hover:bg-blue-600" },
    { icon: Twitter, href: "https://twitter.com", name: "Twitter", color: "hover:bg-sky-500" },
    { icon: Instagram, href: "https://instagram.com", name: "Instagram", color: "hover:bg-gradient-to-r hover:from-pink-500 hover:to-purple-600" },
    { icon: Youtube, href: "https://youtube.com", name: "YouTube", color: "hover:bg-red-600" }
  ];

  return (
    <footer className="relative bg-gradient-to-br from-slate-50 via-gray-50 to-slate-100 overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 left-10 w-64 h-64 bg-gradient-to-r from-pink-200 to-purple-200 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-gradient-to-r from-blue-200 to-indigo-200 rounded-full mix-blend-multiply filter blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-purple-100 to-pink-100 rounded-full mix-blend-multiply filter blur-3xl animate-pulse" style={{ animationDelay: '4s' }}></div>
      </div>

      {/* Main footer content */}
      <div className="relative z-10 pt-16 pb-8">
        <div className="container mx-auto px-4">
          {/* Main footer grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
            {/* Company Info */}
            <div className="lg:col-span-2">
              <Logo size="default" className="mb-6" />
              <p className="text-gray-600 mb-6 text-lg leading-relaxed">
                Your ultimate destination for fashion and lifestyle. Discover the latest trends and express your unique
                style with StyleSphere. Where fashion meets innovation.
              </p>
              
              {/* Enhanced social media */}
              <div className="flex flex-wrap gap-4">
                {socialLinks.map((social, index) => {
                  const Icon = social.icon;
                  return (
                    <a
                      key={index}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`group relative w-12 h-12 bg-white rounded-full shadow-lg border border-gray-200 flex items-center justify-center transition-all duration-300 transform hover:scale-110 hover:-translate-y-1 ${social.color} hover:text-white hover:shadow-xl hover:border-transparent`}
                      onMouseEnter={() => setHoveredSocial(index)}
                      onMouseLeave={() => setHoveredSocial(null)}
                    >
                      <Icon className="h-5 w-5 text-gray-600 group-hover:text-white transition-colors duration-300" />
                      
                      {/* Tooltip */}
                      <div className={`absolute -top-12 left-1/2 transform -translate-x-1/2 px-3 py-1 bg-gray-800 text-white text-xs rounded-lg opacity-0 pointer-events-none transition-all duration-300 ${hoveredSocial === index ? 'opacity-100 -translate-y-1' : ''}`}>
                        {social.name}
                        <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-gray-800"></div>
                      </div>
                    </a>
                  );
                })}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-bold text-gray-900 mb-6 text-lg flex items-center gap-2">
                <div className="w-2 h-2 bg-pink-500 rounded-full animate-pulse"></div>
                Quick Links
              </h4>
              <ul className="space-y-4">
                {[
                  { to: "/about", text: "About Us" },
                  { to: "/contact", text: "Contact Us" },
                  { to: "/careers", text: "Careers" },
                  { to: "/blog", text: "Fashion Blog" },
                  { to: "/size-guide", text: "Size Guide" },
                  { to: "/returns", text: "Returns & Exchanges" }
                ].map((link, index) => (
                  <li key={index}>
                    <Link 
                      to={link.to} 
                      className="text-gray-600 hover:text-pink-600 transition-all duration-300 hover:translate-x-2 inline-flex items-center gap-2 group"
                    >
                      <span className="w-1 h-1 bg-gray-400 rounded-full group-hover:bg-pink-500 transition-colors duration-300"></span>
                      {link.text}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h4 className="font-bold text-gray-900 mb-6 text-lg flex items-center gap-2">
                <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
                Get in Touch
              </h4>
              <div className="space-y-6">
                <div className="group flex items-start space-x-4 p-3 rounded-lg hover:bg-white/60 transition-all duration-300">
                  <div className="w-10 h-10 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                    <MapPin className="h-5 w-5 text-white" />
                  </div>
                  <div className="text-gray-600 text-sm">
                    <p className="font-semibold text-gray-800">StyleSphere Fashion Hub</p>
                    <p>Phoenix MarketCity, Kurla West</p>
                    <p>Mumbai - 400070, India</p>
                  </div>
                </div>
                
                <div className="group flex items-center space-x-4 p-3 rounded-lg hover:bg-white/60 transition-all duration-300">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                    <Phone className="h-5 w-5 text-white" />
                  </div>
                  <a href="tel:+919876543210" className="text-gray-600 hover:text-pink-600 transition-colors duration-300 font-medium">
                    +91 98765 43210
                  </a>
                </div>
                
                <div className="group flex items-center space-x-4 p-3 rounded-lg hover:bg-white/60 transition-all duration-300">
                  <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-teal-600 rounded-full flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                    <Mail className="h-5 w-5 text-white" />
                  </div>
                  <a href="mailto:support@stylesphere.in" className="text-gray-600 hover:text-pink-600 transition-colors duration-300 font-medium">
                    support@stylesphere.in
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="border-t border-gray-200 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="text-center md:text-left">
                <p className="text-gray-600 flex items-center gap-2">
                  &copy; 2025 StyleSphere. All rights reserved.
                </p>
              </div>
              
              <div className="flex flex-wrap justify-center md:justify-end gap-6">
                {[
                  { to: "/privacy", text: "Privacy Policy" },
                  { to: "/terms", text: "Terms of Service" },
                  { to: "/refund", text: "Refund Policy" },
                  { to: "/cookies", text: "Cookie Policy" }
                ].map((link, index) => (
                  <Link 
                    key={index}
                    to={link.to} 
                    className="text-gray-600 hover:text-pink-600 transition-all duration-300 text-sm font-medium hover:underline"
                  >
                    {link.text}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll to top button */}
      <button
        onClick={scrollToTop}
        className="fixed bottom-8 right-8 w-12 h-12 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 hover:-translate-y-1 flex items-center justify-center group z-50"
      >
        <ArrowUp className="w-5 h-5 group-hover:animate-bounce" />
      </button>

      <style jsx>{`
        @keyframes bounce-in {
          0% {
            transform: scale(0.3);
            opacity: 0;
          }
          50% {
            transform: scale(1.05);
          }
          70% {
            transform: scale(0.9);
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }

        .animate-bounce-in {
          animation: bounce-in 0.6s ease-out;
        }
      `}</style>
    </footer>
  );
}