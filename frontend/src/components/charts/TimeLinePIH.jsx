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
    height: 200px;
    margin: auto;
`

const TimelinePIH = () => {
    const data = {
        labels: ["2019", "2020", "2021", "2022", "2023"],
        datasets: [
            {
                label: "Pest Outbreak Events",
                data: [1, 3, 2, 4, 5], // Represents number of events per year
                backgroundColor: "rgba(72, 187, 120, 0.7)",
                borderColor: "rgba(34, 139, 34, 1)",
                borderWidth: 1,
            },
        ],
    }

    const options = {
        indexAxis: "y",
        responsive: true,
        plugins: {
            legend: {
                position: "top",
            },
            title: {
                display: true,
                text: "Pest Outbreak Events Timeline",
            },
        },
    }

    return (
        <ChartContainer>
            <Bar data={data} options={options} />
        </ChartContainer>
    )
}

export default TimelinePIH
