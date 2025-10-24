'use client'
import { useEffect } from 'react'
import React from 'react'
import Image from 'next/image'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/dist/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger);

const Footer = () => {


    useEffect(() => {
      const ctx= gsap.context(() => {
          gsap.fromTo('.footer-logo', {
            scaleY:0,
          }, {
            scaleY: '100%',
            scrollTrigger: {
              trigger: '.footer-logo-section',
              start: '15% bottom',
              end: 'bottom bottom',
              scrub: true,
              // markers: true,
            }
          })
          gsap.fromTo('.footer-lines', {
            scaleY:0,
          }, {
            scaleY: '100%',
            scrollTrigger: {
              trigger: '.footer-logo-section',
              start: '30% bottom',
              end: 'bottom bottom',
              scrub: true,
              // markers: true,
            }
          })
      })
      return () => ctx.revert();
    })

  return (
    <section className=' h-full bg-[#bcbfb0] py-[2%] dark-section'>

        <div className='flex justify-between px-[2vw]'>

            <div className='w-[30%]'>
                <p className='font-display'>Hut8</p>
                <p className='text-gray-600 font-display'>Corporation</p>
            </div>

            <div className='w-[40%]  h-[50vh] flex flex-col justify-between'>
                <p className='text-[2.5vw] leading-[1.1] font-display'>
                    Sign up for our latest announcements
                </p>

                <div className='space-y-[1vw]'>
                    <p className='font-display'>Your Email</p>
                    <p className='text-gray-600'>name@gmail.com</p>
                </div>
            </div>

            <div className='w-[20%] h-fit'>
                <Image
                            src="/assets/svg/Logo.svg"
                            width={700}
                            height={700}
                            alt="logo"
                            className="w-full h-full object-cover brightness-0"
                          />
            </div>

        </div>

        <div className='w-full bg-gray-500 h-[0.2px] my-[2vw] px-[2vw]' />
        
        <div className='flex justify-between px-[2vw]'>
             <div className="w-[25%] ">
        <h3 className="text-[0.9vw] font-normal text-gray-700 mb-[2vw]">
          High Performance Computing
        </h3>
        <a 
          href="#" 
          className="inline-flex space-x-[2vw] items-center gap-[0.5vw] text-[1.1vw] font-medium text-black hover:opacity-80"
        >

        
          HPC Client Portal
          <svg 
            className="w-[1vw] h-[1vw] ml-[2vw]" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={1} 
              d="M7 17L17 7M17 7H7M17 7v10" 
            />
          </svg>
        </a>
        <div className="w-[12vw] h-[0.2vw] bg-black mt-[1vw]"></div>
      </div>

      {/* Middle Left Column */}
      <div className="w-[35%]">
        <h3 className="text-[0.9vw] font-normal text-gray-700 mb-[2vw]">
          Explore Hut 8
        </h3>
        <nav className="flex flex-col gap-[0.2vw] text-[2vw]">
          <a href="#" className=" font-medium text-black hover:opacity-80">Home</a>
          <a href="#" className=" font-medium text-black hover:opacity-80">Our Platform</a>
          <a href="#" className=" font-medium text-black hover:opacity-80">About Us</a>
          <a href="#" className=" font-medium text-black hover:opacity-80">Careers</a>
        </nav>
      </div>

      <div className='w-[25%]  flex gap-[1vw]'>


      {/* Middle Right Column */}
      <div className="w-[40%]">
        <h3 className="text-[0.9vw] font-normal text-gray-700 mb-[2vw]">
          News & Insights
        </h3>
        <nav className="flex flex-col gap-[0.8vw] text-[1vw]">
          <a href="#" className=" font-medium text-black hover:opacity-80">Overview</a>
          <a href="#" className=" font-medium text-black hover:opacity-80">Press Releases</a>
          <a href="#" className=" font-medium text-black hover:opacity-80">In the News</a>
          <a href="#" className=" font-medium text-black hover:opacity-80">Resources</a>
        </nav>
      </div>

      {/* Right Column */}
      <div className="w-[40%]">
        <h3 className="text-[0.9vw] font-normal text-gray-700 mb-[2vw]">
          Investors
        </h3>
        <nav className="flex flex-col gap-[0.8vw] text-[1vw]">
          <a href="#" className=" font-medium text-black hover:opacity-80">Overview</a>
          <a href="#" className=" font-medium text-black hover:opacity-80">Stock Information</a>
          <a href="#" className=" font-medium text-black hover:opacity-80">Financials</a>
          <a href="#" className=" font-medium text-black hover:opacity-80">Events & Presentations</a>
          <a href="#" className=" font-medium text-black hover:opacity-80">SEC Filings</a>
          <a href="#" className=" font-medium text-black hover:opacity-80">Governance</a>
          <a href="#" className=" font-medium text-black hover:opacity-80">FAQ</a>
          <a href="#" className=" font-medium text-black hover:opacity-80">Contact Us</a>
        </nav>
      </div>
      </div>
        </div>

         <div className='w-full bg-gray-500 h-[0.2px] my-[2vw] px-[2vw]' />

        <div className="w-full  py-[2.5vw] px-[2vw] flex items-center gap-[2vw] justify-start text-[1.2vw] text-gray-700">
  {/* Left icons */}
  <div className="flex items-center justify-start gap-[2vw] w-[35%] ">
    <Image src='/assets/svg/linkedin.svg' height={1000} width={1000} alt='footer-logo' className='h-[1vw] w-[1vw] cursor-pointer' />
     <Image src='/assets/svg/twitter.svg' height={1000} width={1000} alt='footer-logo' className='h-[1vw] w-[1vw] cursor-pointer' />
  </div>

  {/* Center info */}
  <div className="flex items-center gap-[2vw] w-[40%]  text-gray-500">
    <span>info@hut8.com</span>
    <span>1101 Brickell Ave, N-1500, Miami, FL 33131</span>
  </div>

  {/* Right links */}
  <div className="flex items-center gap-[2.5vw] text-black">
    <p className="hover:underline cursor-pointer">Terms of Use</p>
    <p className="hover:underline cursor-pointer">Privacy Policy</p>
  </div>
</div>



        <div className='w-full h-fit footer-logo-section relative'>
          <div className='w-[90%] h-full mx-auto footer-logo scale-y-0'>
            <Image src='/assets/svg/footer-logo.svg' height={1000} width={1000} alt='footer-logo' className='h-full w-full object-cover' />
          </div>

          <div className='absolute w-full h-full top-0'>
            <div className="flex flex-col gap-[1.5vw]  origin-top">
    {[...Array(10)].map((_, i) => (
      <div key={i} className="flex flex-col h-[2vw] w-[100vw] footer-lines scale-y-0">
        <div className="h-[1vw] bg-[#bcbfb0]" />
        <div className="h-[1vw] bg-black" />
      </div>
    ))}
  </div>

          </div>
        </div>
    </section>
  )
}

export default Footer