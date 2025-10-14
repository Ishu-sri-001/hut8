'use client';
import React, {useEffect} from "react";
import Image from "next/image";
import gsap from "gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

const Header = () => {

    useEffect(() => {
        const ctx= gsap.context(() => {
            gsap.to('.header-logo', {
                scale:0.35,
                yPercent:-35,
                scrollTrigger: {
                    trigger: '.header-section',
                    start:'top top',
                    end: '10% top',
                    ease: 'linear',
                    scrub: true,
                    // markers: true,
                }
            })
        })
        return () => ctx.revert();
    },[])

  return (
    <div className="fixed z-52 w-full overflow-x-hidden h-fit overflow-y-hidden top-0 flex items-center justify-between px-[2vw]">
      <div className="w-full flex justify-between mt-[2vw]">
        <div className="h-[17vw] w-[17vw] ">
          <Image
            src="/assets/svg/Logo.svg"
            width={700}
            height={700}
            alt="logo"
            className="w-full h-full header-logo object-cover"
          />
        </div>

        <div className="bg-white w-[15%] font-display h-fit rounded-[0.5vw] flex p-[1vw] justify-between">
          <p className="text-[1vw]">Hut 8</p>
          {/* <Image
            src="/assets/svg/menu-icon.svg"
            width={700}
            height={700}
            alt="menu-icon"
            className="w-[1.5vw] h-[1.5vw]"
          /> */}
          <svg width="24" height="24" viewBox="0 0 24 24" stroke="black" vectorEffect="non-scaling-stroke" shapeRendering="geometricPrecision" fill="none" data-v-21d5952f=""><path id="top-bar" d="M0 8 C3.66 8 7.33 8 11 8 12.33 7.33 13.66 6.66 15 6 18 6 21 6 24 6 " data-v-21d5952f="" data-original="M0 8 L11 8 L15 6 L24 6"></path> <path id="bottom-bar" d="M0 16 C8 16 16 16 24 16 " data-v-21d5952f="" data-original="M0 16H24"></path></svg>
        </div>
      </div>
    </div>
  );
};

export default Header;
