import React from 'react';
import Why1 from '../assets/why1[1].jpg'
import Why2 from '../assets/why2.jpg'
import Why3 from '../assets/why3[1].jpg'
import Why4 from '../assets/why4[1].jpg'

const Modern = () => {
  return (
    <div className="py-10 px-4 md:px-10">
      <h1 className="text-4xl md:text-4xl font-bold text-center mb-10 font-montserrat">Why RêveWelt Tours</h1>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
     
        <div className="flex flex-col items-center text-center">
          <img src={Why1} alt="Experience" className="w-10 h-10 mb-4 " />
          <h2 className="text-2xl font-semibold mb-2">Experience</h2>
          <p className="text-lg">We have over 25 years of experience as tour operators, with extensive connections across the industry to provide you with the best travel services</p>
        </div>

        {/* Second Grid */}
        <div className="flex flex-col items-center text-center">
          <img src={Why2} alt="Reliability" className="w-10 h-10 mb-4 " />
          <h2 className="text-2xl font-semibold mb-2">Reliability</h2>
          <p className="text-lg">With Modern Customise Tours you can make sure that all acquired services will be delivered whatever destination it might be.</p>
        </div>

        {/* Third Grid */}
        <div className="flex flex-col items-center text-center">
          <img src={Why3} alt="Knowledge" className="w-10 h-10  mb-4 " />
          <h2 className="text-2xl font-semibold mb-2">Knowledge</h2>
          <p className="text-lg">Our vast knowledge in locations, countries, cities gives us the ability to always give you a pleasurable experience in travel.</p>
        </div>

        {/* Fourth Grid */}
        <div className="flex flex-col items-center text-center">
          <img src={Why4} alt="Deals" className="w-10 h-10 mb-4 " />
          <h2 className="text-2xl font-semibold mb-2">Deals</h2>
          <p className="text-lg">Our management and team work hard to secure deals for your comfort.</p>
        </div>
      </div>
    </div>
  );
};

export default Modern;
