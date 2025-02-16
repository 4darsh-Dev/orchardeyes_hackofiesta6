import React from 'react';
import { Sun, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const WeatherCard = () => {
    const navigate = useNavigate();

    const handleViewClick = () => {
        navigate('/weather-details');
    };

    return (
        <div className="w-64 h-64 rounded-2xl text-white overflow-hidden relative p-6 bg-gradient-to-br from-yellow-400 via-orange-400 to-amber-500 shadow-lg">
            <div className="absolute top-4 right-4 opacity-50">
                <Sun className="w-4 h-4" />
            </div>
            
            <div className="flex flex-col h-full">
                <span className="text-sm font-medium mb-1 opacity-90">
                    Today
                </span>

                <div className="flex items-start mb-4">
                    <span className="text-6xl font-bold">20</span>
                    <span className="text-3xl mt-1">°</span>
                </div>

                <div className="flex items-center gap-2">
                    <Sun className="w-6 h-6" />
                    <span className="text-xl font-medium">Sunny</span>
                </div>

                <div className="text-sm mt-1 opacity-75">
                    Monday, 24 April
                </div>

                <div className="mt-auto flex">
                    <button 
                        className="w-[6rem] flex items-center justify-center gap-2 bg-white/20 hover:bg-white/30 py-2 px-4 rounded-full transition-all duration-300 group"
                        onClick={handleViewClick}
                    >
                        View 
                        <ArrowRight className="group-hover:translate-x-1 transition-transform duration-300" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default WeatherCard;
