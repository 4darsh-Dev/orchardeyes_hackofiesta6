import React from "react";
import {  FaCamera, FaMap, FaChartBar, FaDove } from "react-icons/fa";



const HowItWorks = () => {

  const steps = [
    {
      icon: <FaDove className="text-blue-500 text-4xl" />,
      title: "Drone Deployment",
      description: "The AI-powered drone autonomously flies over the orchard, capturing detailed imagery."
    },
    {
      icon: <FaCamera className="text-blue-500 text-4xl" />,
      title: "Data Collection",
      description: "Multi-sensor cameras collect RGB, depth, and thermal images for analysis."
    },
    {
      icon: <FaChartBar className="text-blue-500 text-4xl" />,
      title: "Actionable Insights",
      description: "Farmers receive AI-driven insights for pest control, yield estimation, and storage planning."
    },
    {
      icon: <FaMap className="text-blue-500 text-4xl" />,
      title: "3D Mapping & Analysis",
      description: "Captured data is processed to generate 3D maps with pest hotspot overlays."
    },
  ];


  return (
    <section className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800">Revolutionize Your Farming with AI</h2>
        <p className="mt-4 text-lg text-gray-600">Discover how cutting-edge technology can transform your orchard management from the ground up.</p>
        
        {/* Steps Grid */}
        <div className="mt-10 grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="bg-gray-100 p-6 rounded-lg shadow-md hover:shadow-lg transition">
              <div className="mb-4 flex justify-center">{step.icon}</div>
              <h3 className="text-xl font-semibold text-gray-800">{step.title}</h3>
              <p className="mt-2 text-gray-600">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
