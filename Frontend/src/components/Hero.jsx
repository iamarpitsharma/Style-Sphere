import React, { useState, useEffect } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Star,
  Sparkles,
  ShoppingBag,
  Zap,
  TrendingUp,
} from "lucide-react";

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      id: 1,
      title: "Summer Collection 2025",
      subtitle: "Discover the latest trends",
      description: "Up to 70% off on selected items",
      image: "/placeholder.svg?height=600&width=1200",
      cta: "Shop Now",
      bgColor: "bg-gradient-to-br from-pink-500 via-purple-500 to-indigo-600",
      features: ["Free Shipping", "Easy Returns", "Premium Quality"],
    },
    {
      id: 2,
      title: "Premium Quality Fashion",
      subtitle: "Luxury meets affordability",
      description: "Curated collection from top brands",
      image: "/placeholder.svg?height=600&width=1200",
      cta: "Explore Collection",
      bgColor: "bg-gradient-to-br from-blue-500 via-teal-500 to-green-600",
      features: ["Authentic Brands", "Quality Assured", "Trending Styles"],
    },
    {
      id: 3,
      title: "New Arrivals Daily",
      subtitle: "Fresh styles every week",
      description: "Be the first to wear the latest fashion",
      image: "/placeholder.svg?height=600&width=1200",
      cta: "View Collection",
      bgColor: "bg-gradient-to-br from-orange-500 via-red-500 to-pink-600",
      features: ["Latest Trends", "Celebrity Styles", "Fashion Forward"],
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <section className="relative h-[500px] md:h-[700px] overflow-hidden">
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
            index === currentSlide
              ? "translate-x-0 opacity-100"
              : index < currentSlide
              ? "-translate-x-full opacity-0"
              : "translate-x-full opacity-0"
          }`}
        >
          <div className={`${slide.bgColor} h-full flex items-center justify-center text-white relative`}>
            {/* Floating Icons */}
            <div className="absolute inset-0">
              <div className="absolute top-10 left-10 animate-bounce">
                <Sparkles className="h-8 w-8 text-white/30" />
              </div>
              <div className="absolute top-20 right-20 animate-pulse">
                <Star className="h-6 w-6 text-white/20" />
              </div>
              <div className="absolute bottom-20 left-20 animate-bounce delay-1000">
                <ShoppingBag className="h-6 w-6 text-white/25" />
              </div>
              <div className="absolute bottom-10 right-10 animate-pulse delay-500">
                <TrendingUp className="h-8 w-8 text-white/20" />
              </div>
              <div className="absolute top-1/2 left-10 animate-ping">
                <Zap className="h-4 w-4 text-white/15" />
              </div>
              <div className="absolute top-1/4 right-1/4 w-20 h-20 border-2 border-white/10 rounded-full animate-spin-slow" />
              <div className="absolute bottom-1/4 left-1/4 w-16 h-16 border-2 border-white/10 rotate-45 animate-pulse" />
            </div>

            {/* Slide Content */}
            <div className="text-center px-4 z-10 max-w-6xl mx-auto animate-fade-in-up">
              <div className="inline-flex items-center px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium mb-6">
                <Sparkles className="h-4 w-4 mr-2" />
                New Collection
              </div>

              <h1 className="text-5xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-white via-gray-100 to-white bg-clip-text text-transparent leading-tight">
                {slide.title}
              </h1>
              <p className="text-2xl md:text-4xl mb-4 font-light opacity-90">{slide.subtitle}</p>
              <p className="text-lg md:text-2xl mb-8 text-white/80 max-w-2xl mx-auto">{slide.description}</p>

              {/* Features */}
              <div className="flex flex-wrap justify-center gap-4 mb-8">
                {slide.features.map((feature, idx) => (
                  <div key={idx} className="flex items-center bg-white/10 backdrop-blur-sm px-3 py-2 rounded-full">
                    <div className="w-2 h-2 bg-white rounded-full mr-2"></div>
                    <span className="text-sm font-medium">{feature}</span>
                  </div>
                ))}
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <button className="group bg-white text-gray-900 px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl">
                  <span className="group-hover:mr-2 transition-all duration-300">{slide.cta}</span>
                  <span className="inline-block group-hover:translate-x-1 transition-transform duration-300">→</span>
                </button>
                <button className="group border-2 border-white text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white hover:text-gray-900 transition-all duration-300 transform hover:scale-105">
                  Learn More
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-6 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 rounded-full p-4 transition-all duration-300 hover:scale-110 backdrop-blur-sm group"
      >
        <ChevronLeft className="h-6 w-6 text-white group-hover:scale-110 transition-transform" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-6 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 rounded-full p-4 transition-all duration-300 hover:scale-110 backdrop-blur-sm group"
      >
        <ChevronRight className="h-6 w-6 text-white group-hover:scale-110 transition-transform" />
      </button>

      {/* Slide Dots */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-4">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`transition-all duration-300 ${
              index === currentSlide
                ? "w-12 h-3 bg-white rounded-full"
                : "w-3 h-3 bg-white/50 hover:bg-white/75 rounded-full hover:scale-125"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
