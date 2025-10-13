import Image from "next/image";
import React from "react";

const sectionsData = [
    {
      id: 1,
      icon: '/assets/svg/power.svg',
      title: 'Power',
      items: [
        {
          number: '1.1',
          heading: 'Power Generation',
          description: 'Through a joint venture with Macquarie, we own and operate a portfolio of four natural gas power plants in Ontario, Canada.'
        },
        {
          number: '1.2',
          heading: 'Managed Services',
          description: 'We extend our expertise to institutional asset owners through end-to-end infrastructure development partnerships.'
        }
      ]
    },
    {
      id: 2,
      icon: '/assets/svg/digital.svg',
      title: 'Digital Infrastructure',
      items: [
        {
          number: '2.1',
          heading: 'ASIC Colocation',
          description: 'We host and operate third-party ASIC servers at strategically located data centers.'
        },
        {
          number: '2.2',
          heading: 'CPU Colocation',
          description: 'Our CPU Colocation infrastructure supports enterprise-grade computing needs.'
        }
      ]
    },
    {
      id: 3,
      icon: '/assets/svg/server.svg',
      title: 'Compute',
      items: [
        {
          number: '3.1',
          heading: 'Bitcoin Mining',
          description: 'American Bitcoin, a majority-owned subsidiary of Hut 8, is a Bitcoin accumulation platform.'
        },
        {
          number: '3.2',
          heading: 'Data Center Cloud',
          description: 'We support cloud deployments, managed backup, business continuity, disaster recovery, and enterprise storage solutions.'
        },
        {
          number: '3.3',
          heading: 'GPU-as-a-Service',
          description: 'We offer GPU-as-a-Service through Highrise AI, a cloud infrastructure platform purpose-built for artificial intelligence.'
        }
      ]
    }
  ];

const OurBusiness = () => {
  return (
    <div className="h-full w-full py-[10%] px-[2vw]">
      <div className="w-full h-[0.2vw] bg-gray-300" />
      <div className="space-y-[4vw]">
        <h2 className="text-[6.5vw] font-medium font-display">
          Our Businesses
        </h2>
        <p className="text-[2.2vw] leading-[1.2] font-light w-[50%]">
          We strive to build enduring businesses at the intersection of energy
          and technology.
        </p>
      </div>

      <div className="flex mt-[4vw] gap-[1vw]">
        <div className="w-[10%] leading-[1.1] text-[1vw] font-medium">
          Flexible by design, our platform is engineered to evolve alongside new
          technologies and the markets they create.
        </div>

        <div className="w-full space-y-[4.5vw]">        

       {sectionsData.map((section) => (
        <div key={section.id} className="w-full flex gap-[5vw] ">
          <div className="w-[10%] flex justify-end">
            <Image
              src={section.icon} 
              alt='svg-icon' 
              width={700}
              height={700}
              className="w-[50%] h-fit" 
            />
          </div>
          <div className="w-full ">
            <div className="mb-[2vw] ">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="100%"
                height="10"
                viewBox="0 0 100 10"
                preserveAspectRatio="none"
              >
                <path
                  d="M0 5 H37.5 C38 5,39 7,40 7 H100"
                  stroke="gray"
                  strokeWidth="1.5"
                  fill="none"
                />
              </svg>
            </div>

            <div className="flex gap-[3vw] w-full ">
              <div className="w-[20%] ">
                <p className="text-[2vw] font-display leading-[1.2]">{section.title}</p>
              </div>

              <div>
                {section.items.map((item, index) => (
                  <React.Fragment key={index}>
                    <div className="flex gap-[1vw]">
                      <p className="text-gray-500">{item.number}</p>
                      <div className="w-[50%] font-medium space-y-[2vw]">
                        <p>{item.heading}</p>
                        <p className="text-[1vw] text-gray-500">
                          {item.description}
                        </p>
                      </div>
                    </div>
                    {index < section.items.length - 1 && (
                      <div className="w-full h-[0.2px] bg-gray-400 my-[2.5vw]" />
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>
          </div>
        </div>
      ))}
      </div>
      </div>
    </div>
  );
};

export default OurBusiness;
