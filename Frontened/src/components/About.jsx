import { GoArrowUpRight } from "react-icons/go";
import homepage from "../assets/homepage.avif";
import Navbar from "./Navbar";

const About = () => {
  return (
    
    <section
      data-scroll
      data-scroll-speed="-.2"
      data-scroll-section
      className="relative w-full bg-[#cdea68] text-black rounded-tl-3xl rounded-tr-3xl  pb-24 px-8 md:px-20 overflow-hidden font-sans"
    >
      <Navbar />
      {/* Intro */}
      <div className="container mx-auto mb-24 pt-24">
        <h1 className="max-w-5xl text-[42px] md:text-[56px] font-light leading-snug md:leading-tight tracking-[-0.02em]">
          At <span className="font-semibold text-[#202020]">Flavour Fusion</span>, we believe cooking is an art that brings people together.
          Our mission is to empower home chefs to explore, experiment, and craft dishes that celebrate
          global cuisines one recipe at a time.
        </h1>
      </div>

      {/* Description */}
      <div className="container mx-auto grid md:grid-cols-2 gap-10 border-t border-[#99ad53] py-12 mb-28">
        <div>
          <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-[#1a1a1a]">What You Can Expect</h2>
          <p className="text-[17px] font-normal leading-relaxed text-[#1d1d1d]/80">
            A platform built by passionate food lovers and open-source contributors.
            Expect curated recipes, smart meal planning tools, and a vibrant community
            where innovation meets flavor.
          </p>
        </div>

        <div className="flex flex-col gap-6 text-[17px] leading-relaxed font-normal text-[#1d1d1d]/80">
          <p>
            At Flavour Fusion, we craft personalized culinary experiences that inspire creativity.
            Whether you’re cooking for family, friends, or yourself we help make every plate special.
          </p>
          <p>
            We blend diverse flavors and cultures with modern technology.
            From AI-powered meal suggestions to community-driven recipe sharing,
            we’re redefining how home cooking feels in the digital age.
          </p>
        </div>
      </div>

      {/* Approach Section */}
      <div className="container mx-auto flex flex-col md:flex-row items-center border-t border-[#99ad53] py-14 gap-12">
        {/* Text */}
        <div className="flex-1 flex flex-col gap-6">
          <h2 className="text-[38px] md:text-[48px] font-semibold leading-tight text-[#1a1a1a]">
            Our Approach
          </h2>
          <p className="text-[17px] leading-relaxed text-[#1d1d1d]/80 max-w-[32rem]">
            Our team of four passionate developers believes in openness, creativity, and collaboration.
            Every feature of Flavour Fusion — from recipe discovery to meal planning is built transparently.
            Together, we aim to make cooking smarter, more joyful, and community-driven.
          </p>

          <a
            href="/"
            className="inline-flex items-center gap-3 bg-[#212121] text-white py-4 px-8 uppercase rounded-full text-[14px] font-medium w-fit tracking-wide transition-all duration-300 hover:bg-white hover:text-black shadow-sm"
          >
            <span>Read More</span>
            <GoArrowUpRight className="text-[1.1rem]" />
          </a>
        </div>

        {/* Image */}
        <div className="flex-1 w-full h-[400px] md:h-[480px] rounded-[20px] overflow-hidden shadow-md">
          <img
            src={homepage}
            alt="Team cooking together"
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-700 rounded-[inherit]"
          />
        </div>
      </div>

      {/* Footer Team Section */}
      <div className="container mx-auto border-t border-[#99ad53] pt-14 mt-20">
        <h3 className="text-2xl md:text-3xl font-semibold mb-6 text-[#1a1a1a]">Meet the Team</h3>
        <p className="text-[17px] font-normal leading-relaxed text-[#1d1d1d]/80 max-w-4xl">
          Flavour Fusion is built and maintained by a passionate open-source team of four developers
          each contributing expertise in full-stack development, UI/UX, AI integration, and API design.
          Together, we’re committed to sharing the joy of culinary exploration with the world.
        </p>
      </div>
    </section>
  );
};

export default About;
