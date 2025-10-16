"use client";
import React, { useEffect, useState, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

const Header = () => {
  const [isLogoWhite, setIsLogoWhite] = useState(false);
  const logoRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Scroll-based scaling + position
      gsap.to(".header-logo", {
        scale: 0.35,
        rotation: 45,
        yPercent: -35,
        scrollTrigger: {
          trigger: ".header-section",
          start: "top top",
          end: "1.6% top",
          ease: "linear",
          scrub: true,
        },
      });

      // Continuous rotation on scroll
      gsap.to(".header-logo", {
        rotation: 700,
        ease: "none",
        scrollTrigger: {
          trigger: "body",
          start: "1.4% top",
          end: "bottom bottom",
          scrub: 1,
        },
      });

      // Detect dark sections to invert logo color
      const darkSections = document.querySelectorAll(".dark-section");
      darkSections.forEach((section) => {
        ScrollTrigger.create({
          trigger: section,
          start: "top center",
          end: "bottom center",
          onEnter: () => setIsLogoWhite(true),
          onLeave: () => setIsLogoWhite(false),
          onEnterBack: () => setIsLogoWhite(true),
          onLeaveBack: () => setIsLogoWhite(false),
        });
      });
    });

    return () => ctx.revert();
  }, []);

  //  Hover rotation animation
  const handleMouseEnter = () => {
    gsap.to(logoRef.current, {
      rotation: "+=120",
      duration: 0.6,
      ease: "power2.out",
    });
  };

  const handleMouseLeave = () => {
    gsap.to(logoRef.current, {
      rotation: "-=120",
      duration: 0.6,
      ease: "power2.out",
    });
  };

  return (
    <div className="fixed z-52 w-full overflow-x-hidden h-fit overflow-y-hidden top-0 flex items-center justify-between px-[2vw]">
      <div className="w-full flex justify-between mt-[2vw]">
        {/* LOGO */}
        <div className="h-[17vw] w-[17vw]">
          <Image
            ref={logoRef}
            src="/assets/svg/Logo.svg"
            width={700}
            height={700}
            alt="logo"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className={`w-full h-full header-logo object-cover cursor-pointer ${
              isLogoWhite ? "invert" : ""
            }`}
          />
        </div>

        {/* MENU BUTTON */}
        <div className="bg-white w-[15%] font-display h-fit rounded-[0.5vw] flex p-[1vw] justify-between">
          <p className="text-[1vw]">Hut 8</p>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            stroke="black"
            vectorEffect="non-scaling-stroke"
            shapeRendering="geometricPrecision"
            fill="none"
          >
            <path
              id="top-bar"
              d="M0 8 C3.66 8 7.33 8 11 8 12.33 7.33 13.66 6.66 15 6 18 6 21 6 24 6 "
            ></path>
            <path
              id="bottom-bar"
              d="M0 16 C8 16 16 16 24 16 "
            ></path>
          </svg>
        </div>
      </div>
    </div>
  );
};

export default Header;
