import React from "react";
import Image from "next/image";

const About = () => {
  return (
    <section className="relative h-screen max-sm:h-[100vh] w-full overflow-hidden ">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
      >
        <source src="/assets/videos/about-vid.mp4" />
      </video>

      <div className="absolute inset-0 h-full w-full px-[6vw] flex flex-col gap-[3vw]">
        <p className="text-white text-[4vw] leading-[1.3] w-[88%]">
          We take a power-first, innovation-driven approach to developing,
          commercializing, and operating the critical infrastructure that
          underpins the breakthrough technologies of today and tomorrow.
        </p>

        <div className="flex flex-col gap-[1vw]">
            <p className="text-gray-400">Learn More</p>
            <div className="flex justify-between items-center w-[20%] border-b border-gray-400 pb-[1vw]">
                <p className="text-white">Our Platform</p>
                <div className='h-[1vw] w-[1vw] mr-[1vw]'>
                    <Image src='/assets/svg/arrow-down.svg' width={700} height={700} alt='logo' className='w-full h-full object-cover ' />
                </div>
                
            </div>
        </div>
      </div>
    </section>
  );
};

export default About;
