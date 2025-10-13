import React from 'react'
import Image from 'next/image'

const Footer = () => {
  return (
    <section className='px-[2vw] h-full bg-gray-300 py-[2%]'>

        <div className='flex justify-between'>

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
                            className="w-full h-full header-logo object-cover brightness-0"
                          />
            </div>

        </div>

        <div className='w-full bg-gray-500 h-[0.2px] my-[2vw]' />
        
        <div className='flex justify-between'>
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
    </section>
  )
}

export default Footer