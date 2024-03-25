import PropTypes from "prop-types"
import { useEffect, useRef } from "react"
import Chart from "chart.js/auto"
import "./barChart.scss"

const BarChart = ({ barChartData, selectedMonth }) => {
  const chartRef = useRef(null)
  const chartInstanceRef = useRef(null)

  useEffect(() => {
    if (barChartData) {
      const ctx = chartRef.current.getContext("2d")
      chartInstanceRef.current = new Chart(ctx, {
        type: "bar",
        data: {
          labels: Object.keys(barChartData),
          datasets: [
            {
              label: "Count",
              data: Object.values(barChartData),
              backgroundColor: "rgba(75, 192, 192, 0.2)",
              borderColor: "rgba(75, 192, 192, 1)",
              borderWidth: 1,
            },
          ],
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      })
    }

    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy()
      }
    }
  }, [barChartData])

  return (
    <div className="canvas-container">
      <h2 className="chart-title">Bar Chart Stats: {selectedMonth}</h2>
      <canvas ref={chartRef} />
    </div>
  )
}

export default BarChart

BarChart.propTypes = {
  barChartData: PropTypes.object,
  selectedMonth: PropTypes.string,
}
