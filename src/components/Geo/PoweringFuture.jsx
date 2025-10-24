'use client'
import Image from 'next/image'
import React, { useEffect } from 'react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/dist/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)

const PowringFuture = () => {

  useEffect(() => {

    const ctx = gsap.context(() => {
        gsap.fromTo('.PoweringFuture', {
            yPercent:-100,
            scale:1.5,
            xPercent:50,
            opacity:0,
        } , {
          yPercent:-10,
          xPercent:10,
          opacity:1,
          scale:0.7,
          scrollTrigger: {
            trigger: '#PoweringFuture',
            scrub:true,
            // pin: true,
            start: 'top top',
            end: 'bottom top',
            // markers: true,
          }
        })
    })
    return () => ctx.revert();

  },[])

  return (
    <section  id='PoweringFuture' className='w-full h-[400vh] bg-black relative'>
      <div className='h-screen sticky top-0 overflow-hidden'>

      <div className='h-[300vh]  flex flex-col PoweringFuture overflow-hidden  '>
        <div className='h-full w-full translate-y-[-100vw]'>


        <Image src='/assets/Images/text.png' width={1000} height={1000} alt='text' className='w-full h-full ' />
        <Image src='/assets/Images/text.png' width={1000} height={1000} alt='text' className='w-full  h-full' />
        <Image src='/assets/Images/text.png' width={1000} height={1000} alt='text' className='w-full h-full ' />
        <Image src='/assets/Images/text.png' width={1000} height={1000} alt='text' className='w-full  h-full' />
        </div>
      </div>
      </div>
     
    </section>
  )
}

export default PowringFuture