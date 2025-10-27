import React, { useState } from "react";
import { motion } from "framer-motion";

const Card = ({ title, image, features }) => {
  const [isHover, setIsHover] = useState(false);

  return (
    <motion.div
      className="flex flex-col gap-4 relative group"
      whileHover={{ y: -6, scale: 1.02 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      {/* Small heading */}
      <div className="uppercase font-semibold text-sm tracking-wide flex items-center gap-2 text-zinc-300">
        <span className="w-3 h-3 bg-[#212121] rounded-full"></span>
        <span>{title}</span>
      </div>

      {/* Image Container */}
      <div
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
        className="relative w-full h-[32rem] md:h-[25rem] sm:h-[20rem] rounded-[15px] overflow-hidden cursor-pointer transition-all duration-500 ease-in-out shadow-lg"
      >
        {/* Image */}
        <motion.img
          src={image}
          alt={title}
          className="w-full h-full object-cover rounded-[inherit]"
          animate={{ scale: isHover ? 1.15 : 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        />

        {/* Gradient Overlay */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent"
          animate={{ opacity: isHover ? 0.7 : 0.4 }}
          transition={{ duration: 0.3 }}
        />

        {/* Title Overlay (on hover) */}
        <motion.h2
          className="absolute bottom-6 left-6 text-[#cdea68] font-semibold font-secondary text-4xl md:text-3xl sm:text-2xl"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: isHover ? 0 : 50, opacity: isHover ? 1 : 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          {title}
        </motion.h2>
      </div>

      {/* Features (animated chips) */}
      <motion.div
        className="flex gap-2 flex-wrap"
        initial="hidden"
        animate={isHover ? "show" : "hidden"}
        variants={{
          hidden: { opacity: 0, y: 10 },
          show: {
            opacity: 1,
            y: 0,
            transition: { staggerChildren: 0.05, delayChildren: 0.1 },
          },
        }}
      >
        {features.map((item, i) => (
          <motion.span
            key={item + i}
            variants={{
              hidden: { opacity: 0, y: 10 },
              show: { opacity: 1, y: 0 },
            }}
            className="border border-[#212121] text-xs uppercase py-1 px-3 rounded-full text-zinc-300 hover:bg-[#212121] hover:text-white transition"
          >
            {item}
          </motion.span>
        ))}
      </motion.div>

      {/* Big Animated Title Below */}
      <h1 className="uppercase font-semibold font-secondary text-[#cdea68] whitespace-nowrap relative z-10 leading-none">
        <div className="block text-left relative overflow-hidden">
          {title.split("").map((char, index) => (
            <motion.span
              initial={{ y: "100%" }}
              animate={{
                y: isHover ? "0%" : "100%",
              }}
              transition={{
                duration: 0.3,
                delay: index * 0.03,
              }}
              className="inline-block text-[130px] md:text-[4rem] sm:text-[3rem] tracking-tight"
              key={index}
            >
              {char}
            </motion.span>
          ))}
        </div>
      </h1>
    </motion.div>
  );
};

export default Card;
