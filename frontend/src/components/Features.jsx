import React from "react";
import { FaMapMarkedAlt, FaRobot, FaCloudUploadAlt, FaChartLine } from "react-icons/fa";

const features = [
    // {
    //     icon: <FaMapMarkedAlt className="text-green-500 text-4xl" />,
    //     title: "3D Orchard Mapping",
    //     description: "Generate high-resolution 3D maps with pest hotspot overlays for precision farming."
    // },
    {
        icon: <FaRobot className="text-green-500 text-4xl" />,
        title: "Autonomous Drone Navigation",
        description: "AI-powered drones navigate orchards, avoiding obstacles and collecting real-time data."
    },
    {
        icon: <FaChartLine className="text-green-500 text-4xl" />,
        title: "Yield Prediction",
        description: "Accurate yield predictions based on historical data and current orchard conditions."
    },
    {
        icon: <FaRobot className="text-green-500 text-4xl" />,
        title: "Disease Detection",
        description: "Early detection of diseases through AI analysis of drone-captured images."
    },
    {
        icon: <FaChartLine className="text-green-500 text-4xl" />,
        title: "Actionable Insights",
        description: "Get AI-driven reports on pest infestations, tree health, and yield predictions."
    },
    {
        icon: <FaCloudUploadAlt className="text-green-500 text-4xl" />,
        title: "Cloud Data Processing",
        description: "Captured data is processed in real-time and accessible from anywhere via our web platform."
    },
    
    
];

const Features = () => {
  return (
    <section className="py-16 bg-gray-100">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800">Why Choose OrchardEyes?</h2>
        <p className="mt-4 text-lg text-gray-600">Revolutionizing orchard management with AI-driven insights.</p>
        
        {/* Features Grid */}
        <div className="mt-10 grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition">
              <div className="mb-4 flex justify-center">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-gray-800">{feature.title}</h3>
              <p className="mt-2 text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
