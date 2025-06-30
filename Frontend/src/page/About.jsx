import Header from "../components/Header";
import Footer from "../components/Footer";
import {
  Users,
  Award,
  Globe,
  Heart,
  Target,
  Eye,
  Zap,
  Shield,
} from "lucide-react";

export default function AboutPage() {
  const stats = [
    { number: "2019", label: "Founded", icon: Target },
    { number: "2M+", label: "Happy Customers", icon: Users },
    { number: "50K+", label: "Products", icon: Award },
    { number: "100+", label: "Cities", icon: Globe },
  ];

  const values = [
    {
      icon: Heart,
      title: "Customer First",
      description:
        "Every decision we make is centered around providing the best experience for our customers.",
    },
    {
      icon: Award,
      title: "Quality Assured",
      description:
        "We partner with trusted brands and maintain strict quality standards for all our products.",
    },
    {
      icon: Zap,
      title: "Innovation",
      description:
        "We continuously innovate to bring you the latest fashion trends and shopping experiences.",
    },
    {
      icon: Shield,
      title: "Trust & Security",
      description:
        "Your privacy and security are our top priorities in every transaction.",
    },
  ];

  const team = [
    {
      name: "Priya Sharma",
      role: "Founder & CEO",
      image:"https://images.unsplash.com/photo-1602233158242-3ba0ac4d2167?q=80&w=1036&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      // image: "/placeholder.svg?height=300&width=300",
      bio: "Fashion industry veteran with 15+ years of experience in retail and e-commerce.",
    },
    {
      name: "Rahul Gupta",
      role: "Chief Technology Officer",
      // image: "/placeholder.svg?height=300&width=300",
      image :"https://plus.unsplash.com/premium_photo-1689568126014-06fea9d5d341?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      bio: "Tech enthusiast passionate about creating seamless digital shopping experiences.",
    },
    {
      name: "Anita Patel",
      role: "Head of Design",
      // image: "/placeholder.svg?height=300&width=300",
      image:"https://plus.unsplash.com/premium_photo-1688350839154-1a131bccd78a?q=80&w=1469&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      bio: "Creative director with expertise in fashion trends and user experience design.",
    },
    {
      name: "Vikram Singh",
      role: "Operations Director",
      // image: "/placeholder.svg?height=300&width=300",
      image:"https://plus.unsplash.com/premium_photo-1693258698597-1b2b1bf943cc?q=80&w=1587&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      bio: "Supply chain expert ensuring efficient delivery and customer satisfaction.",
    },
  ];

  const milestones = [
    {
      year: "2020",
      title: "StyleSphere Founded",
      description:
        "Started with a vision to make fashion accessible to everyone across India.",
    },
    {
      year: "2021",
      title: "First Million Customers",
      description: "Reached our first million happy customers milestone.",
    },
    {
      year: "2022",
      title: "Pan-India Expansion",
      description: "Expanded delivery to 500+ cities across India.",
    },
    {
      year: "2023",
      title: "Sustainability Initiative",
      description: "Launched eco-friendly packaging and sustainable fashion lines.",
    },
    {
      year: "2024",
      title: "Mobile App Launch",
      description: "Launched our mobile app with enhanced shopping features.",
    },
    {
      year: "2025",
      title: "AI-Powered Recommendations",
      description: "Introduced AI-powered personalized shopping recommendations.",
    },
    
  ];

  return <div className="min-h-screen bg-white">
    <Header />
{/* Hero Section */}
      <section className="bg-gradient-to-br from-pink-600 to-purple-700 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">About StyleSphere</h1>
          <p className="text-xl md:text-2xl opacity-90 max-w-3xl mx-auto leading-relaxed">
            Redefining fashion retail in India with style, quality, and innovation at the heart of everything we do.
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="mb-12">
                <div className="flex items-center mb-4">
                  <Target className="h-8 w-8 text-pink-600 mr-3" />
                  <h2 className="text-3xl font-bold text-gray-900">Our Mission</h2>
                </div>
                <p className="text-lg text-gray-600 leading-relaxed">
                  To democratize fashion by making the latest trends accessible and affordable for everyone across
                  India, while maintaining the highest standards of quality and customer service.
                </p>
              </div>

              <div>
                <div className="flex items-center mb-4">
                  <Eye className="h-8 w-8 text-purple-600 mr-3" />
                  <h2 className="text-3xl font-bold text-gray-900">Our Vision</h2>
                </div>
                <p className="text-lg text-gray-600 leading-relaxed">
                  To become India's most trusted and loved fashion destination, empowering individuals to express their
                  unique style while building a sustainable and inclusive fashion ecosystem.
                </p>
              </div>
            </div>

            <div className="relative">
            <div className=" bg-gradient-to-br from-pink-100 to-purple-100 rounded-2xl flex items-center justify-center">                <img src="https://images.unsplash.com/photo-1698795635695-29fd61f60edd?q=80&w=1587&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" className="object-cover h-[80%] rounded-2xl " ></img>
              
              
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-blue-100">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Journey in Numbers</h2>
            <p className="text-lg text-gray-600">Milestones that define our growth</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center group">
                <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 group-hover:-translate-y-2">
                  <stat.icon className="h-12 w-12 text-pink-600 mx-auto mb-4" />
                  <div className="text-3xl font-bold text-gray-900 mb-2">{stat.number}</div>
                  <div className="text-gray-600 font-medium">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Core Values</h2>
            <p className="text-lg text-gray-600">The principles that guide everything we do</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="text-center group">
                <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 group-hover:-translate-y-2">
                  <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
                    <value.icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">{value.title}</h3>
                  <p className="text-gray-600">{value.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Meet Our Team</h2>
            <p className="text-lg text-gray-600">The passionate people behind StyleSphere</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group"
              >
                <div className="aspect-square overflow-hidden">
                  <img
                    src={member.image || "/placeholder.svg"}
                    alt={member.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-1">{member.name}</h3>
                  <p className="text-pink-600 font-medium mb-3">{member.role}</p>
                  <p className="text-gray-600 text-sm">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-16 bg-pink-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Journey</h2>
            <p className="text-lg text-gray-600">Key milestones in our growth story</p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="relative">
              
              <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-pink-500 to-purple-600 rounded-full"></div>

              {milestones.map((milestone, index) => (
                <div
                  key={index}
                  className={`relative flex items-center mb-12 ${index % 2 === 0 ? "flex-row" : "flex-row-reverse"}`}
                >
                  <div className={`w-1/2 ${index % 2 === 0 ? "pr-8 text-right" : "pl-8 text-left"}`}>
                    <div className="bg-blue-50 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
                      <div className="text-2xl font-bold text-pink-600 mb-2">{milestone.year}</div>
                      <h3 className="text-xl font-bold text-gray-900 mb-3">{milestone.title}</h3>
                      <p className="text-gray-600">{milestone.description}</p>
                    </div>
                  </div>

                  <div className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 bg-gradient-to-br from-pink-500 to-purple-600 rounded-full border-4 border-white shadow-lg"></div>

                  <div className="w-1/2"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-pink-600 to-purple-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Join the StyleSphere Family</h2>
          <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
            Be part of our journey to revolutionize fashion retail in India. Discover your style with us today!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/products"
              className="bg-white text-pink-600 px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-100 transition-colors"
            >
              Start Shopping
            </a>
            <a
              href="/contact"
              className="border-2 border-white text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white hover:text-pink-600 transition-colors"
            >
              Get in Touch
            </a>
          </div>
        </div>
      </section>

    <Footer />
  </div>;
}
