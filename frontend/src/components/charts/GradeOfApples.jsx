import { Pie } from "react-chartjs-2"
import { Chart, ArcElement, Tooltip, Legend } from "chart.js"

Chart.register(ArcElement, Tooltip, Legend)

const GradeOfApples = () => {
    // Dummy data for apple grades
    const data = {
        labels: ["A Grade", "B Grade", "C Grade", "D Grade"], // Apple grades
        datasets: [
            {
                label: "Percentage of Apples",
                data: [40, 30, 20, 10], // Example data representing the percentage of each grade
                backgroundColor: [
                    "rgba(75, 192, 192, 0.7)", // Teal for A Grade
                    "rgba(153, 102, 255, 0.7)", // Purple for B Grade
                    "rgba(255, 206, 86, 0.7)", // Yellow for C Grade
                    "rgba(255, 99, 132, 0.7)", // Red for D Grade
                ],
                borderColor: [
                    "rgba(75, 192, 192, 1)",
                    "rgba(153, 102, 255, 1)",
                    "rgba(255, 206, 86, 1)",
                    "rgba(255, 99, 132, 1)",
                ],
                borderWidth: 1,
            },
        ],
    }

    // Chart options
    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: true,
                position: "top",
                labels: {
                    color: "#4a4a4a",
                },
            },
            tooltip: {
                callbacks: {
                    label: function (tooltipItem) {
                        const label = tooltipItem.label || ""
                        const value = tooltipItem.raw || 0
                        return `${label}: ${value}%`
                    },
                },
            },
        },
    }

    return (
        <div className="relative w-full max-w-lg mx-auto p-4 bg-white  rounded-md">
            <h2 className="text-xl font-semibold text-center mb-4">
                Apple Grades Distribution
            </h2>
            <div className="h-64">
                <Pie data={data} options={options} />
            </div>
        </div>
    )
}

export default GradeOfApples
