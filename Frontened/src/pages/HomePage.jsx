import React, { useEffect, useRef } from 'react';
// import LocomotiveScroll from 'locomotive-scroll';
import 'locomotive-scroll/src/locomotive-scroll.scss';
import Navbar from '../components/Navbar';
import LandingPage from '../components/LandingPage';
import Marquee from '../components/Marquee';
import About from '../components/About';
import Featured from '../components/Featured';

function HomePage() {
 
  return (
    <div className="w-full min-h-screen bg-zinc-900 text-white">
      <Navbar />
      <LandingPage />
      <Marquee/>
      <About/>
      <Featured/>
    </div>
  );
}

export default HomePage;
