"use client";

export default function HeroSection() {
  const handleScrollToBottom = () => {
    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: "smooth", // Smooth scrolling effect
    });
  };

  return (
    <div className="relative h-[35vh] md:h-[50vh] overflow-hidden flex items-center justify-center bg-gradient-to-r from-purple-700 via-blue-800 to-blue-900 text-white">
      <div className="absolute inset-0 z-0 bg-hero-pattern bg-cover bg-center"></div>

      {/* Content */}
      <div className="z-10 text-center px-4">
        <h1 className="text-3xl md:text-5xl font-extrabold mb-4">
          Elevate Your Style
        </h1>
        <p className="text-lg md:text-xl mb-6">
          Discover the latest trends and shop exclusive collections.
        </p>
        <button
          onClick={handleScrollToBottom}
          className="px-6 py-3 bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-700 hover:to-blue-700 rounded-lg font-semibold transition-all duration-300"
        >
          Shop Now
        </button>
      </div>
    </div>
  );
}
