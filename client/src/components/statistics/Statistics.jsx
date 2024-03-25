import PropTypes from "prop-types"
import "./statistics.scss"

const Statistics = ({ statistics, selectedMonth }) => {
  return (
    <div className="statistics-container">
      <h2 className="statistics-heading">Statistics: {selectedMonth}</h2>
      <div className="statistics-item">
        <span className="statistics-label">Total Sale Amount:</span>
        <span className="statistics-value">
          {statistics?.totalSaleAmount.toFixed(2)}
        </span>
      </div>
      <div className="statistics-item">
        <span className="statistics-label">Total Sold Items:</span>
        <span className="statistics-value">{statistics?.totalSoldItems}</span>
      </div>
      <div className="statistics-item">
        <span className="statistics-label">Total Not Sold Items:</span>
        <span className="statistics-value">
          {statistics?.totalNotSoldItems}
        </span>
      </div>
    </div>
  )
}

export default Statistics

Statistics.propTypes = {
  statistics: PropTypes.object,
  selectedMonth: PropTypes.string,
}
