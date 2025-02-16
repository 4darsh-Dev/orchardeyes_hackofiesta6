import { Bar } from "react-chartjs-2"
import {
    Chart,
    BarElement,
    CategoryScale,
    LinearScale,
    Title,
    Tooltip,
    Legend,
} from "chart.js"
import styled from "styled-components"

Chart.register(BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend)

const ChartContainer = styled.div`
    width: 400px;
    height: 300px;
    margin: auto;
`

const HeatMapChartPIH = () => {
    const data = {
        labels: [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec",
        ],
        datasets: [
            {
                label: "Pest Outbreak Intensity",
                data: [3, 5, 7, 6, 9, 10, 5, 3, 4, 2, 8, 7],
                backgroundColor: "rgba(34, 139, 34, 0.8)",
            },
        ],
    }

    const options = {
        responsive: true,
        plugins: {
            legend: {
                display: false,
            },
            title: {
                display: true,
                text: "Pest Outbreak Intensity Over Months (Simulated Heat Map)",
            },
        },
        scales: {
            x: {
                grid: {
                    display: false,
                },
            },
            y: {
                grid: {
                    display: false,
                },
                beginAtZero: true,
                title: {
                    display: true,
                    text: "Intensity Level",
                },
            },
        },
    }

    return (
        <ChartContainer>
            <Bar data={data} options={options} />
        </ChartContainer>
    )
}

export default HeatMapChartPIH
