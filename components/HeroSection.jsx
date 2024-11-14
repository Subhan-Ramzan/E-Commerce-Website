"use client"
export default function HeroSection() {
  const handleScrollToBottom = () => {
    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: "smooth", // Smooth scrolling effect
    });
  };

  return (
    <div className="relative h-[80vh] flex items-center justify-center bg-cover bg-center bg-fixed transition-all duration-1000 ease-in-out bg-hero-pattern">
      {/* Background with rounded corners */}
      <div className="absolute inset-0 rounded-sm bg-[#000000] bg-[radial-gradient(#ffffff33_1px,#00091d_1px)] bg-[size:20px_20px]"></div>

      {/* Text content */}
      <div className="text-center text-white z-10">
        <h1 className="text-5xl md:text-7xl font-bold mb-4 animate-fadeInUp">
          Elevate Your Style
        </h1>
        <p className="text-lg md:text-2xl mb-8 animate-fadeInUp delay-500">
          Discover the latest trends and shop exclusive collections.
        </p>
        <button
          onClick={handleScrollToBottom}
          className="px-8 py-4 bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-700 hover:to-blue-700 transition-all duration-500 ease-in-out rounded-lg text-white font-semibold animate-fadeInUp delay-1000"
        >
          Shop Now
        </button>
      </div>
    </div>
  );
}
