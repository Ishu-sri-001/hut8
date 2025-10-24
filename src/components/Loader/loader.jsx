'use client'
import Image from "next/image";
import React, {useEffect} from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
import {useLenis} from 'lenis/react';

gsap.registerPlugin(ScrollTrigger)

const Loader = () => {

    const lenis = useLenis();

    useEffect(() => {
        
         if (lenis) {
            lenis.stop();
        }
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({
                onComplete: () => {
                    gsap.to(".loader-container", {
                        opacity: 0,
                        // duration: 0.8,
                        ease: "power2.out",
                        onComplete: () => {
                            gsap.set(".loader-container", { display: "none" });
                            if (lenis) {
                                lenis.start();
                            }
                        },
                    });
                },
            });
            tl.fromTo('.loader-line', {
                scaleX:'5%',
            }, {
                scaleX:'20%',
                duration: 0.5,
            })
            .to('.loader-line', 
                {
                scaleX: '50%',
                duration:0.5,
            })
            .to('.loader-line', 
                {
                scaleX: '70%',
                duration:0.5,
            })
            .to('.loader-line', 
                {
                scaleX: '77%',
                duration:0.4,
            })
            .to('.loader-line', 
                {
                scaleX: '88%',
                duration:0.4,
            })
            .to('.loader-line', 
                {
                scaleX: '100%',
                duration:0.4,
            })
            .to('.loader-line', {
                transformOrigin:'left right',
            })
            .to('.loader-line', 
                {
                scaleX: '70%',
                duration:0.35,
            })
            .to('.loader-line', 
                {
                scaleX: '40%',
                duration:0.35,
            })
            .to('.loader-line', 
                {
                scaleX: '5%',
                duration:0.35,
            })

        })
        return () => ctx.revert();
    })

    return (
        <div className='h-screen loader-container bg-black max-sm:h-[100vh] w-full overflow-hidden px-[2vw]'>

            <div className="h-[17vw] w-[17vw] mt-[2vw] ">
                <Image
                    src="/assets/svg/Logo.svg"
                    width={700}
                    height={700}
                    alt="logo"

                    className={`w-full h-full  object-cover cursor-pointer `}
                />
            </div>
            <div className="w-full scale-x-0 loader-line origin-left mt-[3.5vw] h-[0.5vw] bg-white" />
            <div className='w-full h-[1px] bg-white/50' />


        </div>
    )
}

export default Loader;