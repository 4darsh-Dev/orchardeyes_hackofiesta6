// src/components/PrecisionMap.jsx
import React from 'react'
import { Scatter } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend
)

const PrecisionMap = ({ data, title }) => {
  const chartData = {
    datasets: [
      {
        label: 'Pest Disease',
        data: data.pestDisease.map((point) => ({ x: point[0], y: point[1] })),
        backgroundColor: 'rgba(255, 0, 0, 1)' // Red
      },
      {
        label: 'Low Water',
        data: data.lowWater.map((point) => ({ x: point[0], y: point[1] })),
        backgroundColor: 'rgba(255, 255, 0, 1)' // Yellow
      },
      {
        label: 'Nutrient Deficiency',
        data: data.nutrientDeficiency.map((point) => ({
          x: point[0],
          y: point[1]
        })),
        backgroundColor: 'rgba(255, 192, 203, 1)' // Pink
      },
      {
        label: 'Healthy',
        data: data.healthy.map((point) => ({ x: point[0], y: point[1] })),
        backgroundColor: 'rgba(0, 255, 0, 1)' // Green
      }
    ]
  }

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top'
      },
      title: {
        display: true,
        text: title
      }
    },
    scales: {
      x: {
        type: 'linear',
        position: 'bottom'
      }
    }
  }

  return <Scatter data={chartData} options={options} />
}

export default PrecisionMap
