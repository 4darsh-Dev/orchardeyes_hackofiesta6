import React, { useState } from 'react';
import { Battery, Thermometer, Route, Clock, Wind, Wifi, Camera, AlertTriangle } from 'lucide-react';
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const DroneDashboard = ({ droneData }) => {
  // Default dummy data if no data is provided
  const defaultData = {
    batteryPercentage: 85,
    boardTemp: 42,
    distanceCovered: 1200,
    flightTime: 18,
    videoLength: 15,
    windSpeed: 12,
    signalStrength: 92,
    altitude: 50,
    telemetryHistory: Array.from({ length: 12 }, (_, i) => ({
      time: `${i}m ago`,
      battery: Math.floor(85 - i * 0.5),
      temp: Math.floor(42 + Math.sin(i) * 5),
      altitude: Math.floor(50 + Math.cos(i) * 10),
    }))
  };

  // Use provided data or default data
  const data = droneData || defaultData;

  // Color schemes
  const colors = {
    primary: '#16a34a',
    secondary: '#22c55e',
    danger: '#ef4444',
    warning: '#f59e0b',
    background: '#f0fdf4'
  };

  const getStatusColor = (value, type) => {
    switch(type) {
      case 'battery':
        return value > 20 ? colors.primary : colors.danger;
      case 'temp':
        return value < 50 ? colors.primary : colors.warning;
      default:
        return colors.primary;
    }
  };

  const StatusCard = ({ icon: Icon, title, value, unit, type }) => (
    <div className="bg-white p-4 rounded-xl shadow-sm border border-green-100">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <Icon className="text-green-600" size={20} />
          <span className="text-sm text-gray-600">{title}</span>
        </div>
        {type === 'battery' && value < 20 && (
          <AlertTriangle className="text-red-500" size={20} />
        )}
      </div>
      <div className="flex items-end gap-2">
        <span className="text-2xl font-bold" style={{ color: getStatusColor(value, type) }}>
          {value}
        </span>
        <span className="text-gray-500 text-sm mb-1">{unit}</span>
      </div>
    </div>
  );

return (
    <div className="p-4 bg-green-50 min-h-screen">
        <h1 className="text-2xl font-bold text-green-800 mb-6">Drone Health Monitor</h1>
        
        {/* Main Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <StatusCard 
                icon={Battery} 
                title="Battery" 
                value={data.batteryPercentage} 
                unit="%" 
                type="battery"
            />
            <StatusCard 
                icon={Thermometer} 
                title="Board Temp" 
                value={data.boardTemp} 
                unit="°C" 
                type="temp"
            />
            <StatusCard 
                icon={Route} 
                title="Distance" 
                value={data.distanceCovered} 
                unit="m"
            />
            <StatusCard 
                icon={Clock} 
                title="Flight Time" 
                value={data.flightTime} 
                unit="min"
            />
        </div>

        {/* Secondary Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <StatusCard 
                icon={Camera} 
                title="Recording" 
                value={data.videoLength} 
                unit="min"
            />
            <StatusCard 
                icon={Wind} 
                title="Wind Speed" 
                value={data.windSpeed} 
                unit="km/h"
            />
            <StatusCard 
                icon={Wifi} 
                title="Signal" 
                value={data.signalStrength} 
                unit="%"
            />
            <StatusCard 
                icon={Route} 
                title="Altitude" 
                value={data.altitude} 
                unit="m"
            />
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Battery and Temperature Trends */}
            <div className="bg-white p-4 rounded-xl shadow-sm border border-green-100">
                <h2 className="text-lg font-semibold text-green-800 mb-4">Battery & Temperature Trends</h2>
                <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={data.telemetryHistory}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                        <XAxis dataKey="time" />
                        <YAxis yAxisId="battery" />
                        <YAxis yAxisId="temp" orientation="right" />
                        <Tooltip />
                        <Line 
                            yAxisId="battery"
                            type="monotone" 
                            dataKey="battery" 
                            stroke={colors.primary} 
                            name="Battery %"
                        />
                        <Line 
                            yAxisId="temp"
                            type="monotone" 
                            dataKey="temp" 
                            stroke={colors.warning} 
                            name="Temperature °C"
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>

            {/* Battery Status Chart */}
            <div className="bg-white p-4 rounded-xl shadow-sm border border-green-100">
                <h2 className="text-lg font-semibold text-green-800 mb-4">Battery Status Over Time</h2>
                <ResponsiveContainer width="100%" height={300}>
                    <AreaChart data={data.telemetryHistory}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                        <XAxis dataKey="time" />
                        <YAxis />
                        <Tooltip />
                        <Area 
                            type="monotone" 
                            dataKey="battery" 
                            stroke={colors.primary}
                            fill={colors.background}
                            name="Battery %"
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>
    </div>
);
};

export default DroneDashboard;