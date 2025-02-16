import { useEffect, useRef } from "react"
import Chart from "chart.js/auto"

const AnnualYield = () => {
    const chartRef = useRef(null)
    const chartInstance = useRef(null)

    useEffect(() => {
        if (chartInstance.current) {
            chartInstance.current.destroy()
        }

        const myChartRef = chartRef.current.getContext("2d")

        chartInstance.current = new Chart(myChartRef, {
            type: "doughnut",
            data: {
                datasets: [
                    {
                        data: [100],
                        backgroundColor: ["rgba(75, 192, 192, 0.6)"],
                        borderColor: ["rgba(75, 192, 192, 1)"],
                        borderWidth: 1,
                    },
                ],
            },
            options: {
                responsive: true,
                cutout: "70%",
                plugins: {
                    legend: {
                        display: false,
                    },
                    tooltip: {
                        enabled: false,
                    },
                },
                animation: {
                    animateRotate: true,
                    animateScale: true,
                },
            },
        })

        return () => {
            if (chartInstance.current) {
                chartInstance.current.destroy()
            }
        }
    }, [])

    return (
        <div className="relative w-64 h-64">
            <canvas ref={chartRef} className="w-full h-full"></canvas>
            <div className="absolute inset-0 flex items-center justify-center">
                <p className="text-2xl font-bold text-gray-700">450 tonnes</p>
            </div>
        </div>
    )
}

export default AnnualYield
