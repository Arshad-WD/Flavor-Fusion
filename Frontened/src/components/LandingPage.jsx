import React, { useEffect, useState } from 'react';
import { FaArrowUpLong } from "react-icons/fa6";
import { motion } from 'framer-motion'; // Import motion from Framer Motion
import image from '../assets/imageu.png';

function LandingPage() {
  const [isVisible, setIsVisible] = useState(true);

  const handleScroll = () => {
    setIsVisible(window.scrollY <= 50);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className='w-full h-screen bg-zinc-900 pt-1'>
      <div className="textstructure mt-52 px-20">
        {["where flavor ", "meets ", "creativity "].map((item, index) => {
          return (
            <div className="masker" key={index}>
              <div className='w-fit flex items-end overflow-hidden'>
                {index === 1 && (
                  <motion.div
                    className="mr-3 w-[8vw] rounded-md h-[5.7vw] relative bg-red-500 flex items-center justify-center"
                    initial={{ x: '-100%', opacity: 0 }} // Initial position off-screen left
                    animate={{ x: 0, opacity: 1 }} // Move to original position
                    transition={{ duration: 0.5 }} // Duration of the animation
                  >
                    <img src={image} className='max-w-full max-h-full' />
                  </motion.div>
                )}
                <h1 className="flex items-center h-full uppercase text-[7.5vw] leading-[6.5vw] tracking-tight font-['Founders Grotesk X-Condensed'] font-bold">
                  {item}
                </h1>
              </div>
            </div>
          );
        })}
      </div>

      <div className="border-t-[1px] border-zinc-800 mt-32 flex justify-between py-5 px-20 items-center">
        {["For home cooks and food lovers", "From your first recipe to culinary mastery"].map((item, index) => {
          return <p className='text-md font-light tracking-tight leading-none' key={index}>{item}</p>;
        })}

        <div className="start flex items-center gap-3">
          <div className='px-5 py-2 border-[2px] border-zinc-500 rounded-full transition-colors duration-300 hover:bg-white hover:text-black'>
            Explore Now
          </div>
          <div className='w-10 h-10 border-[2px] border-zinc-500 flex items-center justify-center rounded-full transition-colors duration-300 hover:bg-white hover:text-black'>
            <span className='rotate-[45deg]'>
              <FaArrowUpLong />
            </span>
          </div>
        </div>
      </div>

      {/* Scroll Down Text */}
      {isVisible && (
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-white text-lg opacity-90 animate-fade-down">
          Scroll Down
        </div>
      )}
    </div>
  );
}

export default LandingPage;
