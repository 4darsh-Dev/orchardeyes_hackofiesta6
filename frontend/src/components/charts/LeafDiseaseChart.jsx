import { Doughnut } from "react-chartjs-2"
import { Chart, ArcElement, Tooltip, Legend } from "chart.js"
import styled from "styled-components"

// Register Chart.js components
Chart.register(ArcElement, Tooltip, Legend)
const ChartContainer = styled.div`
    width: 300px; /* Adjust the width */
    height: 300px; /* Adjust the height */
    position: relative; /* Required for proper rendering */
`
const LeafDiseaseChart = () => {
    // Define the data for the chart
    const data = {
        labels: ["Apple Scab", "Fire Blight", "Powdery Mildew", "No disease"],
        datasets: [
            {
                data: [13, 25, 50, 12], // Percentages for each category
                backgroundColor: [
                    "rgba(255, 99, 132, 0.6)", // Color for Disease 1
                    "rgba(54, 162, 235, 0.6)", // Color for Disease 2
                    "rgba(255, 206, 86, 0.6)", // Color for Disease 3
                    "rgba(75, 192, 192, 0.6)", // Color for No disease
                ],
                borderColor: [
                    "rgba(255, 99, 132, 1)",
                    "rgba(54, 162, 235, 1)",
                    "rgba(255, 206, 86, 1)",
                    "rgba(75, 192, 192, 1)",
                ],
                borderWidth: 1,
            },
        ],
    }

    // Define options for the chart
    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: "top",
            },
            tooltip: {
                callbacks: {
                    label: function (tooltipItem) {
                        return tooltipItem.label + ": " + tooltipItem.raw + "%"
                    },
                },
            },
        },
        animation: {
            animateRotate: true, // Enable rotation animation
            duration: 2000, // Animation duration in milliseconds
            easing: "easeOutBounce", // Easing function for the animation
        },
    }

    return (
        <ChartContainer>
            <Doughnut data={data} options={options} />
        </ChartContainer>
    )
}

export default LeafDiseaseChart
