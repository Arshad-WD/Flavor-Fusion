import { motion } from 'framer-motion'
import React from 'react'

function Marquee() {
    
  return (
    <div className="w-full py-10 bg-[#004D43] rounded-tl-3xl rounded-tr-3xl">
        <div className="text border-t-2 border-b-2 border-zinc-300 flex whitespace-nowrap overflow-hidden">
            <motion.h1 initial={{x:0}} animate={{x: "-100%"}} transition={{ease: "linear", repeat: Infinity, duration: 50 }} className='text-[16vw] leading-none font-["Founders Grotesk X-Condensed"] uppercase font-bold'>Embark on a culinary journey with our diverse collection of recipes. From traditional favorites to modern twists, discover the art of cooking.</motion.h1>
           
        </div>
    </div>
  )
}

export default Marquee