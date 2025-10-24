import React from 'react';
import Image from 'next/image';

const Button = () => {
  return (
    <div>
      <button className='group rounded-full w-fit p-[1.2vw]  cursor-pointer transition-all  duration-300 ease-in-out transform hover:scale-105 overflow-hidden'>
        <div className='relative h-4 w-4 flex items-center justify-center'>
        
          <div className='absolute inset-0 flex items-center justify-center translate-x-0 group-hover:translate-x-[280%] duration-300 ease-in-out'>
            <Image 
              src='/assets/svg/arrow-down.svg' 
              width={15} 
              height={15} 
              alt='Arrow up' 
              className='w-full h-full'
            />
          </div>
          
         
          <div className='absolute inset-0 flex items-center justify-center translate-x-[-250%] group-hover:translate-x-0 duration-300 ease-in-out'>
            <Image 
              src='/assets/svg/arrow-down.svg' 
              width={15} 
              height={15} 
              alt='Arrow down' 
              className='w-full h-full'
            />
          </div>
        </div>
      </button>
    </div>
  )
}

export default Button;