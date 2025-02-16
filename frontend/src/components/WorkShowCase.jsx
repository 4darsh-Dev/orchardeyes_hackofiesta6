

import React from 'react';
import { motion } from 'framer-motion';

// Importing images from assets
import workiiit01 from '../assets/workiiit01.jpg';
import workiiit02 from '../assets/workiiit02.jpg';
import workiiit03 from '../assets/workiiit03.jpg';
import workiiit04 from '../assets/workiiit04.jpg';
import workiiit05 from '../assets/workiiit05.jpg';
import workiiit06 from '../assets/workiiit06.webp';
// import workiiit07 from '../assets/workiiit07.jpg';

const showcaseImages = [
  { id: 1, src: workiiit01, alt: "Drone monitoring orchard" },
  { id: 2, src: workiiit02, alt: "Close-up of fruit inspection" },
  { id: 3, src: workiiit03, alt: "Aerial view of orchard" },
  { id: 4, src: workiiit04, alt: "Drone maintenance" },
  { id: 5, src: workiiit05, alt: "Team working in field" },
  { id: 6, src: workiiit06, alt: "Technology demonstration" },
  // { id: 7, src: workiiit07, alt: "Data analysis dashboard" },
];

const WorkShowcase = () => {
  return (
    <div className="py-20 bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">Our Work in Action</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover how our drone technology is revolutionizing orchard management through precision agriculture
          </p>
        </div>

        <div className="relative h-[800px] mb-32">
          {showcaseImages.map((img, index) => (
            <div
              key={img.id}
              className={`absolute transform transition-all duration-500 hover:scale-105 hover:z-50 rounded-xl overflow-hidden shadow-xl hover:shadow-2xl
                ${index === 0 ? 'top-0 left-[12%]' : ''}
                ${index === 1 ? 'top-[15%] left-[35%] -rotate-6' : ''}
                ${index === 2 ? 'top-[10%] right-[15%] rotate-3' : ''}
                ${index === 3 ? 'top-[40%] left-[5%] rotate-6' : ''}
                ${index === 4 ? 'bottom-[15%] left-[30%] rotate-3' : ''}
                ${index === 5 ? 'bottom-[10%] right-[20%] -rotate-6' : ''}
                ${index === 6 ? 'top-[50%] right-[10%] rotate-6' : ''}`}
              style={{ zIndex: index + 10 }}
            >
              <img src={img.src} alt={img.alt} className="rounded-xl w-72 h-72" />
              <div className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-center justify-center w-100 h-100">
                <p className="text-white text-center px-4">{img.alt}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="max-w-6xl mx-auto">
          <h3 className="text-3xl font-bold text-gray-800 text-center mb-12">Project Gallery</h3>
          <div className="flex flex-wrap justify-center gap-4">
            {showcaseImages.map((img, index) => (
              <div
                key={`honeycomb-${img.id}`}
                className={`w-64 h-64 relative transform hover:scale-105 transition-all duration-300
                  ${index % 2 === 0 ? 'translate-y-8' : ''}`}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-green-500/20 to-amber-500/20 rounded-lg" />
                <img src={img.src} alt={img.alt} className="w-full h-full object-cover rounded-lg" />
                <div className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 transition-opacity duration-300 rounded-lg flex items-center justify-center">
                  <p className="text-white text-center px-4 font-medium">{img.alt}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkShowcase;
