import React from 'react';

export default function NotesSection() {
  return (
    <section className='py-[5%] px-[2vw]'>
         <div className="w-full h-[0.2px] bg-gray-300 my-[2vw]" />
    <div className="flex   w-full">
        
      <div className="w-[25%]">
        <h2 className="text-[1vw] font-medium text-gray-800">Notes</h2>
      </div>
      
      <div className="flex-1 ">
        <div className="space-y-[1vw] w-[50%]">
          <div className="flex gap-[1vw]">
            <span className="text-[1vw] text-gray-600">1.</span>
            <p className="text-[1vw] text-gray-600">As of March 31, 2025</p>
          </div>
          
          <div className="flex gap-[1vw]">
            <span className="text-[1vw] text-gray-600">2.</span>
            <p className="text-[1vw] text-gray-600">
              Owned by a JV between Hut 8 and a Fortune 200 renewable energy producer 
              in which Hut 8 has an approximately 50% membership interest
            </p>
          </div>
          
          <div className="flex gap-[1vw]">
            <span className="text-[1vw] text-gray-600">3.</span>
            <p className="text-[1vw] text-gray-600">Initially energized in Q2 2025</p>
          </div>
          
          <div className="flex gap-[1vw]">
            <span className="text-[1vw] text-gray-600">4.</span>
            <p className="text-[1vw] text-gray-600">
              Site is currently shut down; Hut 8 is maintaining its lease with the option 
              value of re-energizing the site
            </p>
          </div>
          
          <div className="flex gap-[1vw]">
            <span className="text-[1vw] text-gray-600">5.</span>
            <p className="text-[1vw] text-gray-600">
              Owned or leased by a JV between Hut 8 and Macquarie in which Hut 8 has 
              an approximately 80% membership interest
            </p>
          </div>
        </div>
      </div>
    </div>
    </section>
  );
}