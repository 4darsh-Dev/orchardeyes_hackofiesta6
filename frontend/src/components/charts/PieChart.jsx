import { Pie } from "react-chartjs-2"
import { Chart, ArcElement, Tooltip, Legend } from "chart.js"
import PropTypes from "prop-types"
Chart.register(ArcElement, Tooltip, Legend)

const PieChart = ({ dataSet, labels, backgroundColor, borderColor }) => {
    // Dummy data for apple grades
    const data = {
        labels: labels, // Apple grades
        datasets: [
            {
                data: dataSet, // Example data representing the percentage of each grade
                backgroundColor: backgroundColor
                    ? backgroundColor
                    : [
                          "rgba(75, 192, 192, 0.7)", // Teal for A Grade
                          "rgba(153, 102, 255, 0.7)", // Purple for B Grade
                          "rgba(255, 206, 86, 0.7)", // Yellow for C Grade
                          "rgba(255, 99, 132, 0.7)", // Red for D Grade
                      ],
                borderColor: borderColor
                    ? borderColor
                    : [
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
        <div className="h-64">
            <Pie data={data} options={options} />
        </div>
    )
}

export default PieChart

PieChart.propTypes = {
    dataSet: PropTypes.arrayOf(PropTypes.number).isRequired,
    labels: PropTypes.arrayOf(PropTypes.string).isRequired,
    backgroundColor: PropTypes.arrayOf(PropTypes.string),
    borderColor: PropTypes.arrayOf(PropTypes.string),
}
