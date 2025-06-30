import React from "react";
import { Users, ShoppingBag, Star, Award, Quote, TrendingUp, Flame, Sparkles, ArrowRight } from "lucide-react";
import Hero from "../components/Hero";
import Header from "../components/Header";
import Categories from "../components/Categories";
import FeaturedProducts from "../components/FeaturedProducts";
import Newsletter from "../components/Newsletter";
import Footer from "../components/Footer";

const Homepage = () => {
  const stats = [
    { icon: Users, number: "2M+", label: "Happy Customers", color: "text-blue-600", bgColor: "bg-blue-50", hoverColor: "hover:bg-blue-100" },
    { icon: ShoppingBag, number: "50K+", label: "Products Sold", color: "text-green-600", bgColor: "bg-green-50", hoverColor: "hover:bg-green-100" },
    { icon: Star, number: "4.8", label: "Average Rating", color: "text-yellow-600", bgColor: "bg-yellow-50", hoverColor: "hover:bg-yellow-100" },
    { icon: Award, number: "100+", label: "Brand Partners", color: "text-purple-600", bgColor: "bg-purple-50", hoverColor: "hover:bg-purple-100" },
  ];

  const testimonials = [
    {
      id: 1,
      name: "Anuj Sharma",
      location: "Mumbai, India",
      rating: 5,
      comment: "Amazing quality and fast delivery! StyleSphere has become my go-to for all fashion needs.",
      image: "/user.svg",
    },
    {
      id: 2,
      name: "Arpit Sharma",
      location: "Delhi, India",
      rating: 5,
      comment: "Great collection and excellent customer service. Highly recommend StyleSphere!",
      image: "/user.svg",
    },
    {
      id: 3,
      name: "Shubham Singh",
      location: "UP, India",
      rating: 5,
      comment: "Love the variety and quality. The return policy is also very customer-friendly.",
      image: "/user.svg",
    },
  ];

  const trendingItems = [
    {
      id: 1,
      title: "Oversized Hoodies",
      description: "The comfort trend everyone's talking about",
      image: "/Homepage/OversizeHoodies.png",
      trend: "+45%",
      category: "streetwear",
    },
    {
      id: 2,
      title: "Sustainable Fashion",
      description: "Eco-friendly choices for conscious shoppers",
      image: "/Homepage/Recycle.png",
      trend: "+67%",
      category: "eco-friendly",
    },
    {
      id: 3,
      title: "Vintage Denim",
      description: "Classic styles making a comeback",
      image: "/Homepage/Vintage_Denim.png",
      trend: "+32%",
      category: "vintage",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      <Header />
      <Hero />
      <Categories />
      <FeaturedProducts />
      
      {/* 🔥 Enhanced Trending Section */}
      <section className="py-20 relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-orange-50 via-pink-50 to-purple-50"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-orange-200/20 to-pink-200/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-purple-200/20 to-blue-200/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-orange-500 to-pink-500 text-white rounded-full text-sm font-bold mb-6 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 animate-bounce">
              <Flame className="h-5 w-5 mr-2 animate-pulse" />
              What's Trending
              <Sparkles className="h-4 w-4 ml-2" />
            </div>
            <h2 className="text-5xl font-bold bg-gradient-to-r from-gray-900 via-purple-900 to-pink-900 bg-clip-text text-transparent mb-6">
              Fashion Trends
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Stay ahead of the curve with the latest fashion movements that are reshaping the industry
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {trendingItems.map((item, index) => (
              <div
                key={item.id}
                className="group relative overflow-hidden rounded-3xl bg-white/80 backdrop-blur-sm shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-4 hover:rotate-1"
                style={{ animationDelay: `${index * 200}ms` }}
              >
                {/* Hover Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-pink-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                <div className="aspect-video overflow-hidden relative">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-125 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                
                <div className="absolute top-6 right-6 bg-gradient-to-r from-green-500 to-emerald-500 text-white px-4 py-2 rounded-full text-sm font-bold flex items-center shadow-lg transform group-hover:scale-110 transition-all duration-300">
                  <TrendingUp className="h-4 w-4 mr-1 animate-pulse" />
                  {item.trend}
                </div>
                
                <div className="p-8 relative z-10">
                  <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-purple-700 transition-colors duration-300">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">{item.description}</p>
                  <a
                    href={`/products?category=${item.category}`}
                    className="inline-flex items-center bg-gradient-to-r from-pink-500 to-purple-500 text-white px-6 py-3 rounded-full font-semibold hover:from-pink-600 hover:to-purple-600 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                  >
                    Explore Trend
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-2 transition-transform duration-300" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 📊 Enhanced Stats Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-purple-900 to-pink-900"></div>
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `url('data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'0.05\'%3E%3Ccircle cx=\'30\' cy=\'30\' r=\'2\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')`,
          }}
        ></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-white mb-6">
              Trusted by <span className="bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">Millions</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Join the StyleSphere community and experience fashion like never before
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div 
                key={index} 
                className="text-center group transform hover:scale-110 transition-all duration-500"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div className={`inline-flex items-center justify-center w-20 h-20 ${stat.bgColor} ${stat.hoverColor} rounded-2xl mb-6 group-hover:rotate-12 group-hover:shadow-2xl transition-all duration-500 relative overflow-hidden`}>
                  <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <stat.icon className={`h-10 w-10 ${stat.color} relative z-10 group-hover:scale-110 transition-transform duration-300`} />
                </div>
                <div className="text-4xl font-bold text-white mb-3 group-hover:text-pink-300 transition-colors duration-300">
                  {stat.number}
                </div>
                <div className="text-gray-300 text-lg font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 💬 Enhanced Testimonials Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50"></div>
        <div className="absolute top-0 left-1/4 w-72 h-72 bg-gradient-to-br from-pink-200/30 to-purple-200/30 rounded-full blur-3xl animate-pulse delay-500"></div>
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-gradient-to-br from-blue-200/30 to-pink-200/30 rounded-full blur-3xl animate-pulse delay-1500"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-full text-sm font-bold mb-6 shadow-lg">
              <Quote className="h-4 w-4 mr-2" />
              Customer Stories
            </div>
            <h2 className="text-5xl font-bold bg-gradient-to-r from-gray-900 via-pink-900 to-purple-900 bg-clip-text text-transparent mb-6">
              What Our Customers Say
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Real reviews from real customers who love StyleSphere
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={testimonial.id}
                className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 hover:rotate-1 relative overflow-hidden group"
                style={{ animationDelay: `${index * 200}ms` }}
              >
                {/* Animated Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-pink-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                <div className="flex items-center mb-6 relative z-10">
                  <div className="relative">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-16 h-16 rounded-full mr-4 ring-4 ring-pink-100 group-hover:ring-pink-200 transition-all duration-300"
                    />
                    <div className="absolute -top-1 -right-1 w-6 h-6 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full flex items-center justify-center">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 text-lg">{testimonial.name}</h4>
                    <p className="text-sm text-gray-600 font-medium">{testimonial.location}</p>
                  </div>
                </div>

                <div className="flex mb-6 relative z-10">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star 
                      key={i} 
                      className="h-6 w-6 text-yellow-400 fill-current transform hover:scale-125 transition-transform duration-200" 
                      style={{ animationDelay: `${i * 100}ms` }}
                    />
                  ))}
                </div>

                <div className="relative z-10">
                  <Quote className="h-10 w-10 text-pink-200 absolute -top-3 -left-3 group-hover:text-pink-300 transition-colors duration-300" />
                  <p className="text-gray-700 italic pl-8 text-lg leading-relaxed group-hover:text-gray-800 transition-colors duration-300">
                    {testimonial.comment}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      <Newsletter />
      <Footer />
    </div>
  );
};

export default Homepage;
