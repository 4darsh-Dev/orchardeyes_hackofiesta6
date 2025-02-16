import { Bar } from "react-chartjs-2"
import {
    Chart,
    BarElement,
    CategoryScale,
    LinearScale,
    Tooltip,
    Legend,
    TimeScale,
} from "chart.js"

Chart.register(
    BarElement,
    CategoryScale,
    LinearScale,
    TimeScale,
    Tooltip,
    Legend,
)

const HarvestPeriod = () => {
    // Data for a single apple variety's harvest period
    const data = {
        labels: ["Honeycrisp"], // Single variety
        datasets: [
            {
                label: "Harvest Period",
                data: [
                    {
                        x: "2024-09-01", // Start date of harvest
                        x2: "2024-09-20", // End date of harvest
                        y: "Honeycrisp",
                    },
                ],
                backgroundColor: "rgba(75, 192, 192, 0.5)",
                borderColor: "rgba(75, 192, 192, 1)",
                borderWidth: 1,
            },
        ],
    }

    // Chart options
    const options = {
        indexAxis: "y", // Horizontal bar chart
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            x: {
                type: "time",
                time: {
                    unit: "day",
                    tooltipFormat: "MMM D",
                    displayFormats: {
                        day: "MMM d",
                    },
                },
                title: {
                    display: true,
                    text: "Date",
                    color: "#4a4a4a",
                },
                min: "2024-08-15", // Adjust to show before and after the harvest period
                max: "2024-09-30", // Adjust to show before and after the harvest period
            },
            y: {
                title: {
                    display: true,
                    text: "Apple Variety",
                    color: "#4a4a4a",
                },
                beginAtZero: true,
            },
        },
        plugins: {
            legend: {
                display: false,
            },
            tooltip: {
                callbacks: {
                    title: function (tooltipItems) {
                        return tooltipItems[0].dataset.label
                    },
                    label: function (tooltipItem) {
                        return `Harvest Period: ${tooltipItem.raw.x} - ${tooltipItem.raw.x2}`
                    },
                },
            },
        },
    }

    return (
        <div className="relative w-full max-w-md mx-auto p-4 bg-white  rounded-md">
            <h2 className="text-xl font-semibold text-center mb-4">
                Honeycrisp Harvest Period
            </h2>
            <div className="h-48">
                <Bar data={data} options={options} />
            </div>
        </div>
    )
}

export default HarvestPeriod
