import { useRef, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Doughnut } from 'react-chartjs-2'
ChartJS.register(ArcElement, Tooltip, Legend)

const DoughnutChartWithImage = ({ img, label1, label2, data1, data2 }) => {
  const chartRef = useRef(null)
  const [chartSize, setChartSize] = useState({ width: 0, height: 0 })

  const data = {
    labels: [label1, label2],
    datasets: [
      {
        data: [data1, data2],
        backgroundColor: ['#20B2AA', '#dd3030'],
        borderWidth: 0
      }
    ]
  }

  const options = {
    cutout: '75%',
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        enabled: false
      }
    }
  }

  useEffect(() => {
    const updateChartSize = () => {
      if (chartRef.current) {
        const chart = chartRef.current
        setChartSize({
          width: chart.width,
          height: chart.height
        })
      }
    }

    updateChartSize()
    window.addEventListener('resize', updateChartSize)

    return () => window.removeEventListener('resize', updateChartSize)
  }, [])

  return (
    <div className='relative w-[40vw] h-[40vw]'>
      <Doughnut data={data} options={options} ref={chartRef} />
      {chartSize.width > 0 && (
        <div
          className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex items-center justify-center'
          style={{
            width: `${chartSize.width * 0.7}px`,
            height: `${chartSize.height * 0.7}px`
          }}
        >
          <img
            src={img}
            alt='Leaf'
            className='w-10 sm:w-10 h-10 sm:h-10 object-contain'
          />
        </div>
      )}
    </div>
  )
}

export default DoughnutChartWithImage

DoughnutChartWithImage.propTypes = {
  img: PropTypes.string.isRequired,
  label1: PropTypes.string.isRequired,
  label2: PropTypes.string.isRequired,
  data1: PropTypes.number.isRequired,
  data2: PropTypes.number.isRequired
}
