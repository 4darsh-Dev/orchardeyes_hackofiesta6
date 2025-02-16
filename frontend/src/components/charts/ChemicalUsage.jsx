import { Bar } from "react-chartjs-2"
import {
    Chart,
    BarElement,
    CategoryScale,
    LinearScale,
    Tooltip,
    Legend,
} from "chart.js"

Chart.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend)

const ChemicalUsage = () => {
    // Dummy data for pesticide and fertilizer usage in one orchard
    const data = {
        labels: ["Pesticides", "Fertilizers"], // Labels for the types of chemicals used
        datasets: [
            {
                label: "Amount Used (kg)",
                data: [120, 200], // Example data for the amount of pesticides and fertilizers
                backgroundColor: [
                    "rgba(255, 99, 132, 0.7)", // Red for pesticides
                    "rgba(54, 162, 235, 0.7)", // Blue for fertilizers
                ],
                borderColor: ["rgba(255, 99, 132, 1)", "rgba(54, 162, 235, 1)"],
                borderWidth: 1,
            },
        ],
    }

    // Chart options
    const options = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            x: {
                beginAtZero: true,
                grid: {
                    display: false,
                },
                ticks: {
                    color: "#4a4a4a",
                },
            },
            y: {
                beginAtZero: true,
                grid: {
                    color: "rgba(200, 200, 200, 0.2)",
                },
                ticks: {
                    color: "#4a4a4a",
                },
            },
        },
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
                        return (
                            tooltipItem.label + ": " + tooltipItem.raw + " kg"
                        )
                    },
                },
            },
        },
    }

    return (
        <div className="relative w-full max-w-lg mx-auto p-4 bg-white  rounded-md">
            <h2 className="text-xl font-semibold text-center mb-4">
                Pesticide and Fertilizer Usage
            </h2>
            <div className="h-64">
                <Bar data={data} options={options} />
            </div>
        </div>
    )
}

export default ChemicalUsage
