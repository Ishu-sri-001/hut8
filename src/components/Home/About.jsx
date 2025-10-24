'use client'
import React, {useEffect} from "react";
import Image from "next/image";
import gsap from "gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger)
import Button from "../Button/button";

const About = () => {

  useEffect(() => {
    const ctx= gsap.context(() => {
        gsap.to('.about-para', {
          yPercent: 25,
          scrollTrigger: {
            trigger: '#about',
            scrub: true,
            start: 'top bottom',
            end: 'bottom top',
            // markers: true
          }
        })
    })
    return () => ctx.revert();
  }, [])

  return (
    <section id='about' className="relative h-screen max-sm:h-[100vh] w-full overflow-hidden ">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
      >
        <source src="/assets/videos/about-vid.mp4" />
      </video>

      <div className="absolute about-para inset-0 h-full w-full px-[6vw] flex flex-col gap-[3vw]">
        <p className="text-white text-[4vw] leading-[1.3] w-[88%]">
          We take a power-first, innovation-driven approach to developing,
          commercializing, and operating the critical infrastructure that
          underpins the breakthrough technologies of today and tomorrow.
        </p>

        <div className="flex flex-col gap-[1vw]">
            <p className="text-gray-400">Learn More</p>
            <div className="flex justify-between cursor-pointer items-center w-[20%] border-b border-gray-400 pb-[1vw]">
                <p className="text-white">Our Platform</p>
                {/* <div className='relative bg-red-500 h-[2vw] w-[2vw] mr-[1vw]'>
                  <div className="absolute top-[20%] left-[20%]">

                    <Image src='/assets/svg/arrow-down.svg' width={700} height={700} alt='logo' className='w-[1vw] h-[1vw]  ' />
                  </div>
                  <div>

                  </div>
                </div> */}
                <Button />
                
            </div>
        </div>
      </div>
    </section>
  );
};

export default About;
