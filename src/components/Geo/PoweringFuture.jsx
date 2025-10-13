import Image from 'next/image'
import React from 'react'

const PowringFuture = () => {
  return (
    <div className='w-full h-[200vh] bg-black relative'>
        <Image src='/assets/Images/text.png' width={1000} height={1000} alt='text' className='w-full h-full object-cover' />
      <div className='absolute'>

      </div>
    </div>
  )
}

export default PowringFuture