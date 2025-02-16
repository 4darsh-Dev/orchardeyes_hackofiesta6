
import React, { useState, useEffect } from 'react';
import { Home, Leaf, TreePine, ArrowLeft } from 'lucide-react';

const NotFound = () => {
  const [isHovering, setIsHovering] = useState(false);
  const [leaves, setLeaves] = useState([]);

  // Generate falling leaves effect
  useEffect(() => {
    const newLeaves = Array.from({ length: 12 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 5,
      duration: 10 + Math.random() * 10
    }));
    setLeaves(newLeaves);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-emerald-50 flex items-center justify-center p-4 overflow-hidden relative">
      {/* Animated falling leaves */}
      {leaves.map((leaf) => (
        <div
          key={leaf.id}
          className="absolute animate-falling"
          style={{
            left: `${leaf.left}%`,
            animationDelay: `${leaf.delay}s`,
            animationDuration: `${leaf.duration}s`
          }}
        >
          <Leaf
            size={24}
            className="text-green-400 rotate-45 animate-spin-slow"
          />
        </div>
      ))}

      {/* Main content container */}
      <div className="max-w-2xl w-full text-center relative bg-white/90 backdrop-blur-sm rounded-xl p-8 shadow-xl border border-green-100">
        {/* Decorative elements */}
        <div className="absolute -top-12 left-1/2 transform -translate-x-1/2">
          <TreePine size={64} className="text-green-600" />
        </div>

        {/* 404 Text */}
        <h1 className="text-8xl font-bold text-green-800 mt-8 mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-green-700 mb-6">
          Looks like we're lost in the orchard!
        </h2>
        <p className="text-gray-600 mb-8">
          The crop you're looking for seems to have been harvested or planted elsewhere. 
          Let's get you back to familiar ground.
        </p>

        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
            onClick={() => window.location.href = '/'}
            className="inline-flex items-center px-6 py-3 rounded-lg bg-green-600 text-white hover:bg-green-700 transition-all duration-300 gap-2 group"
          >
            <Home className="group-hover:-translate-y-1 transition-transform duration-300" />
            Return to Home
          </button>
          
          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center px-6 py-3 rounded-lg border-2 border-green-600 text-green-600 hover:bg-green-50 transition-all duration-300 gap-2"
          >
            <ArrowLeft className="animate-sway" />
            Go Back
          </button>
        </div>

        {/* Growing plant animation at bottom */}
        <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2">
          <div className="relative">
            <div className="w-1 h-16 bg-green-600 origin-bottom animate-grow-stem" />
            <Leaf 
              size={20} 
              className="absolute -left-2 top-2 text-green-500 animate-grow-leaf-left"
            />
            <Leaf 
              size={20} 
              className="absolute left-1 top-6 text-green-500 animate-grow-leaf-right"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

// Add required keyframes and animations
const style = document.createElement('style');
style.textContent = `
  @keyframes falling {
    0% { transform: translateY(-10vh) rotate(0deg); }
    100% { transform: translateY(100vh) rotate(360deg); }
  }
  
  @keyframes sway {
    0%, 100% { transform: rotate(-5deg); }
    50% { transform: rotate(5deg); }
  }
  
  @keyframes growStem {
    from { transform: scaleY(0); }
    to { transform: scaleY(1); }
  }
  
  @keyframes growLeaf {
    from { transform: scale(0) rotate(0deg); }
    to { transform: scale(1) rotate(-45deg); }
  }
  
  .animate-falling {
    animation: falling linear infinite;
  }
  
  .animate-spin-slow {
    animation: spin 6s linear infinite;
  }
  
  .animate-sway {
    animation: sway 2s ease-in-out infinite;
  }
  
  .animate-grow-stem {
    animation: growStem 1.5s ease-out forwards;
  }
  
  .animate-grow-leaf-left {
    animation: growLeaf 1s ease-out forwards;
    animation-delay: 1s;
  }
  
  .animate-grow-leaf-right {
    animation: growLeaf 1s ease-out forwards;
    animation-delay: 1.5s;
    transform-origin: right;
  }
`;
document.head.appendChild(style);

export default NotFound;

