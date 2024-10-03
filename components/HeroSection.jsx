export default function HeroSection() {
  return (
    <div className="relative h-screen flex items-center justify-center bg-cover bg-center bg-fixed transition-all duration-1000 ease-in-out bg-hero-pattern">
      {/* Background with rounded corners */}
      <div className="absolute inset-0 rounded-2xl [background:radial-gradient(125%_125%_at_50%_10%,#000_30%,#63e_70%)]"></div>

      {/* Text content */}
      <div className="text-center text-white z-10">
        <h1 className="text-5xl md:text-7xl font-bold mb-4 animate-fadeInUp">
          Elevate Your Style
        </h1>
        <p className="text-lg md:text-2xl mb-8 animate-fadeInUp delay-500">
          Discover the latest trends and shop exclusive collections.
        </p>
        <button className="px-8 py-4 bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-700 hover:to-blue-700 transition-all duration-500 ease-in-out rounded-lg text-white font-semibold animate-fadeInUp delay-1000">
          Shop Now
        </button>
      </div>
    </div>
  );
}
