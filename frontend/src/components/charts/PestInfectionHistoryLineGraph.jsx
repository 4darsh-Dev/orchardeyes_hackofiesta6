import { Line } from "react-chartjs-2"
import {
    Chart,
    LineElement,
    PointElement,
    LinearScale,
    Title,
    Tooltip,
    Legend,
    CategoryScale,
} from "chart.js"
import styled from "styled-components"

Chart.register(
    LineElement,
    PointElement,
    LinearScale,
    Title,
    Tooltip,
    Legend,
    CategoryScale,
)

const ChartContainer = styled.div`
    width: 400px;
    height: auto;
    margin: auto;
`

const PestInfectionHistoryLineGraph = () => {
    const data = {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
        datasets: [
            {
                label: "Pest Outbreak Severity",
                data: [5, 10, 3, 15, 12, 7, 8],
                borderColor: "rgba(34, 197, 94, 1)",
                backgroundColor: "rgba(34, 197, 94, 0.5)",
                fill: false,
                tension: 0.1,
                pointBackgroundColor: "rgba(34, 139, 34, 1)", // Different green shade for markers
                pointBorderColor: "rgba(34, 139, 34, 1)",
                pointRadius: 5,
            },
        ],
    }

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: "top",
            },
            title: {
                display: true,
                text: "Pest Outbreak Severity Over Time",
            },
        },
    }

    return (
        <ChartContainer>
            <Line data={data} options={options} />
        </ChartContainer>
    )
}

export default PestInfectionHistoryLineGraph
