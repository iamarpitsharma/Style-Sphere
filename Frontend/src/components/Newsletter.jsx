// import React, { useState } from "react";

// export default function Newsletter() {
//   const [email, setEmail] = useState("");

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log("Newsletter subscription:", email);
//     setEmail("");
//     alert("Thank you for subscribing!");
//   };

//   return (
//     <section className="bg-gray-900 text-white py-16">
//       <div className="container mx-auto px-4 text-center">
//         <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
//         <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
//           Subscribe to our newsletter and be the first to know about new arrivals, exclusive offers, and fashion trends.
//         </p>

//         <form onSubmit={handleSubmit} className="max-w-md mx-auto flex flex-col sm:flex-row gap-4">
            
//             <input
//             type="email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             placeholder="Enter your email"
//             required
//             className="flex-1 px-4 py-3 bg-white rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-pink-500"
//           />
//           <button
//             type="submit"
//             className="bg-pink-600 hover:bg-pink-700 px-6 py-3 rounded-lg font-medium transition-colors"
//           >
//             Subscribe
//           </button>
//         </form>
//       </div>
//     </section>
//   );
// }

import React, { useState } from "react";
import { Star, Send, Check } from "lucide-react";

export default function NewsletterSignup() {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const benefits = [
    { icon: "✨", text: "Exclusive Offers", colorClass: "text-pink-600" },
    { icon: "👗", text: "New Arrivals", colorClass: "text-purple-600" },
    { icon: "📈", text: "Trend Alerts", colorClass: "text-indigo-600" },
    { icon: "🎁", text: "Special Discounts", colorClass: "text-blue-600" },
  ];

  const handleNewsletterSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;

    setIsLoading(true);
    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1500));

    console.log("Newsletter subscription:", email);
    setIsLoading(false);
    setIsSubscribed(true);
    setEmail("");

    // Reset subscribed state after 4 seconds
    setTimeout(() => setIsSubscribed(false), 4000);
  };

  return (
    <section className="relative bg-gradient-to-br from-gray-50 via-white to-gray-50 py-20 overflow-hidden">
      {/* Decorative background blobs */}
      <div className="absolute inset-0 opacity-40 pointer-events-none">
        <div className="absolute top-10 left-10 w-72 h-72 bg-gradient-to-r from-pink-200 to-rose-200 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
        <div
          className="absolute bottom-10 right-10 w-80 h-80 bg-gradient-to-r from-purple-200 to-indigo-200 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>
        <div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-blue-100 to-cyan-100 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"
          style={{ animationDelay: "4s" }}
        ></div>
      </div>

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div
          className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=&quot;60&quot; height=&quot;60&quot; viewBox=&quot;0 0 60 60&quot; xmlns=&quot;http://www.w3.org/2000/svg&quot;%3E%3Cg fill=&quot;none&quot; fill-rule=&quot;evenodd&quot;%3E%3Cg fill=&quot;%23000000&quot; fill-opacity=&quot;0.1&quot;%3E%3Ccircle cx=&quot;7&quot; cy=&quot;7&quot; r=&quot;1&quot;/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] bg-repeat"
          aria-hidden="true"
        ></div>
      </div>

      <div className="container mx-auto px-4 text-center relative z-10 max-w-4xl">
        {/* Header */}
        <div className="mb-12">
          <div className="inline-flex items-center gap-3 mb-6 px-6 py-3 bg-white/80 backdrop-blur-sm rounded-full border border-pink-200/50 shadow-lg hover:shadow-xl transition-all duration-300 group">
            <Star
              className="w-5 h-5 text-pink-500 animate-spin group-hover:animate-pulse"
              style={{ animationDuration: "3s" }}
            />
            <span className="text-sm font-bold text-pink-600 tracking-wide">
              STAY UPDATED
            </span>
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-gray-800 mb-6 leading-tight">
            Never Miss a{" "}
            <span className="bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent animate-pulse">
              Trend
            </span>
          </h2>

          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            Subscribe to our newsletter and be the first to know about{" "}
            <span className="text-pink-600 font-semibold">exclusive offers</span>,{" "}
            <span className="text-purple-600 font-semibold">new arrivals</span>, and{" "}
            <span className="text-indigo-600 font-semibold">fashion insights</span>.
          </p>

          {/* Benefits */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {benefits.map(({ icon, text, colorClass }, index) => (
              <div
                key={index}
                className="flex items-center gap-2 px-4 py-2 bg-white/60 backdrop-blur-sm rounded-full border border-gray-200/50 shadow-sm hover:shadow-md transition-all duration-300 hover:scale-105"
              >
                <span className="text-lg">{icon}</span>
                <span className={`text-sm font-semibold ${colorClass}`}>{text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Newsletter signup form */}
        <div className="max-w-lg mx-auto">
          {!isSubscribed ? (
            <form onSubmit={handleNewsletterSubmit} className="relative group" noValidate>
              {/* Glowing border effect */}
              <div className="absolute -inset-1 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 rounded-2xl blur opacity-25 group-hover:opacity-50 transition-opacity duration-300"></div>

              <div className="relative bg-white/90 backdrop-blur-md rounded-2xl p-2 shadow-xl border border-gray-200/50">
                <div className="flex flex-col sm:flex-row gap-2">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    required
                    disabled={isLoading}
                    className="flex-1 w-full px-6 py-4 bg-white/90 rounded-xl text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:bg-white transition-all duration-300 disabled:opacity-50 font-medium shadow-inner"
                  />
                  <button
                    type="submit"
                    disabled={isLoading || !email}
                    className="group bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-600 hover:from-pink-600 hover:via-purple-600 hover:to-indigo-700 px-8 py-4 rounded-xl font-bold transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 disabled:opacity-50 disabled:transform-none disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg hover:shadow-pink-500/25 text-white relative overflow-hidden"
                  >
                    {/* Button shine effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>

                    {isLoading ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        <span>Subscribing...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
                        <span>Subscribe Now</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </form>
          ) : (
            // Success state
            <div className="relative transform animate-bounce-in">
              <div className="absolute -inset-1 bg-gradient-to-r from-green-400 to-emerald-500 rounded-2xl blur opacity-50 animate-pulse"></div>
              <div className="relative bg-white/90 backdrop-blur-md rounded-2xl p-8 shadow-xl border border-green-400/30">
                <div className="flex flex-col items-center gap-4">
                  <div className="relative">
                    <div className="w-16 h-16 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center animate-bounce shadow-xl">
                      <Check className="w-8 h-8 text-white" />
                    </div>
                    <div className="absolute -inset-2 bg-green-400 rounded-full opacity-30 animate-ping"></div>
                  </div>
                  <div className="text-center space-y-2">
                    <h3 className="text-2xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                      Welcome aboard! 🎉
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      Thank you for subscribing! Get ready for amazing content delivered straight to your inbox.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Trust indicators */}
        <div className="mt-12 flex flex-wrap justify-center items-center gap-8 text-gray-500">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-sm font-medium">50,000+ subscribers</span>
          </div>
          <div className="flex items-center gap-2">
            <div
              className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"
              style={{ animationDelay: "0.5s" }}
            ></div>
            <span className="text-sm font-medium">Weekly updates</span>
          </div>
          <div className="flex items-center gap-2">
            <div
              className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"
              style={{ animationDelay: "1s" }}
            ></div>
            <span className="text-sm font-medium">Unsubscribe anytime</span>
          </div>
          <div className="flex items-center gap-2">
            <div
              className="w-2 h-2 bg-pink-500 rounded-full animate-pulse"
              style={{ animationDelay: "1.5s" }}
            ></div>
            <span className="text-sm font-medium">No spam guaranteed</span>
          </div>
        </div>

        {/* Floating decorative dots */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-gradient-to-r from-pink-400 to-purple-400 rounded-full animate-float opacity-30"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 4}s`,
                animationDuration: `${3 + Math.random() * 3}s`,
              }}
            ></div>
          ))}
        </div>
      </div>

      {/* CSS styles */}
      <style>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px) rotate(0deg);
          }
          25% {
            transform: translateY(-15px) rotate(90deg);
          }
          50% {
            transform: translateY(-5px) rotate(180deg);
          }
          75% {
            transform: translateY(-20px) rotate(270deg);
          }
        }

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

        .animate-float {
          animation: float 6s ease-in-out infinite;
        }

        .animate-bounce-in {
          animation: bounce-in 0.6s ease-out;
        }
      `}</style>
    </section>
  );
}
