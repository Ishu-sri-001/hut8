'use client'

import React, {useEffect} from 'react'
import Image from 'next/image'

const Hero = () => {

  return (
    <section className='relative h-screen max-sm:h-[100vh] w-full overflow-hidden '>
    <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
      >
        <source src="/assets/videos/hero-vid.mp4" />
      </video>
      <div className='absolute left-0 top-[42%] h-full w-full px-[2vw] flex flex-col'>

        {/* <div className='w-full flex justify-between mt-[2vw]'>


        <div className='h-[17vw] w-[17vw] '>
            <Image src='/assets/svg/Logo.svg' width={700} height={700} alt='logo' className='w-full h-full object-cover' />
        </div>

        <div className='bg-white w-[15%] font-display h-fit rounded-[0.5vw] flex p-[1vw] justify-between'>
            <p className='text-[1vw]'>
                Hut 8
            </p>
            <Image src='/assets/svg/menu-icon.svg' width={700} height={700} alt='menu-icon' className='w-[1.5vw] h-[1.5vw]' />

        </div>
        </div> */}
        <div className='w-full h-[0.1px] bg-white'>
        </div>
        
        <div className='flex w-full py-[2vw]  font-display text-white'>
            <p className=' text-[2vw] font-medium w-[40%]'>
                Hut 8
            </p>
            <p className='text-[3vw] leading-[1]  font-medium w-[40%]'>
                Where Power <br /> Unlocks Potential
            </p>
            <div className='flex justify-between w-[20%]'>

            <p className='font-medium'>
                Learn More
            </p>
            <div className='h-[1vw] w-[1vw] mr-[2vw]'>
            <Image src='/assets/svg/arrow-down.svg' width={700} height={700} alt='logo' className='w-full h-full object-cover rotate-90' />
        </div>
            </div>
        </div>

        <div className='text-white space-y-[1vw] w-[25%] mt-[5vw]'>
            <p className='font-medium'>
                Energy Infrastructure Platform
            </p>
            <p className='text-gray-400'>
                Hut 8 develops and operates an integrated
portfolio of power, digital infrastructure, and
compute assets purpose-built to fuel the
world's most transformative technologies.
            </p>
        </div>


        

      </div>
    </section>
  )
}

export default Hero