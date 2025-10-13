import React from "react";
import Image from "next/image";

const newsItems = [
  {
    image: '/assets/Images/blog1.webp',
    title: 'Hut 8 Announces Plans to Develop Four New Sites with More Than 1.5 GW of Total Capacity',
  },
  {
    image: '/assets/Images/blog1.webp',
    title: 'Hut 8 Reports Second Quarter 2025 Results',
  },
  {
    image: '/assets/Images/blog1.webp',
    title: 'Hut 8 Secures Five-Year Capacity Contracts with IESO for 310 MW of Power Generation Assets',
  },
]

const NewsInsights = () => {
  return (
    <section className="h-full w-full py-[10%] px-[2vw]">
      <div className="w-full h-[0.2px] bg-gray-400" />

      <h2 className="text-[6.5vw] font-medium font-display pb-[3vw]">
        Featured News & Insights
      </h2>

      <div className="flex gap-[1vw]">
        <div className="w-[20%] ">
          <div className="flex flex-col gap-[1vw]">
            <p className="text-gray-400">Exploree</p>
            <div className="flex justify-between items-center w-full border-b border-gray-400 pb-[1vw]">
              <p className="text-black">All News & Insights</p>
              <div className="h-[1vw] w-[1vw] mr-[1vw]">
                <Image
                  src="/assets/svg/arrow-down.svg"
                  width={700}
                  height={700}
                  alt="logo"
                  className="w-full h-full object-cover brightness-0"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="w-[80%] flex gap-[1.5vw]">
             {newsItems.map((item, index) => (
        <div
          key={index}
          className="w-[30%] cursor-pointer flex flex-col group transition-transform hover:scale-[1.02]"
        >
          <div className="relative w-full h-[60vh] overflow-hidden">
            <Image
              src={item.image}
              alt={item.title}
              fill
              className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
            />
          </div>
          <div className="flex justify-between items-start mt-3">
            <p className="text-[1vw] font-medium text-black leading-snug w-[60%]">
              {item.title}
            </p>
            <div className="h-[1vw] w-[1vw] mr-[1vw] mt-[1vw]">
                <Image
                  src="/assets/svg/arrow-down.svg"
                  width={700}
                  height={700}
                  alt="logo"
                  className="w-full h-full object-cover brightness-0"
                />
              </div>
          </div>
        </div>
      ))}
        </div>
      </div>
    </section>
  );
};

export default NewsInsights;
