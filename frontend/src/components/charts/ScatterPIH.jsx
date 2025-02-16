import { Scatter } from "react-chartjs-2"
import {
    Chart,
    PointElement,
    LinearScale,
    Title,
    Tooltip,
    Legend,
} from "chart.js"
import styled from "styled-components"

Chart.register(PointElement, LinearScale, Title, Tooltip, Legend)

const ChartContainer = styled.div`
    width: 400px;
    height: 400px;
    margin: auto;
`

const ScatterPlotPIH = () => {
    const data = {
        datasets: [
            {
                label: "Pest Outbreak Intensity",
                data: [
                    { x: 10, y: 20 },
                    { x: 15, y: 10 },
                    { x: 8, y: 30 },
                    { x: 25, y: 15 },
                    { x: 30, y: 35 },
                ],
                backgroundColor: "rgba(72, 187, 120, 0.7)",
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
                text: "Pest Outbreak Intensity Scatter Plot",
            },
        },
        scales: {
            x: {
                type: "linear",
                position: "bottom",
                title: {
                    display: true,
                    text: "Time (Days)",
                },
            },
            y: {
                title: {
                    display: true,
                    text: "Intensity Level",
                },
            },
        },
    }

    return (
        <ChartContainer>
            <Scatter data={data} options={options} />
        </ChartContainer>
    )
}

export default ScatterPlotPIH
