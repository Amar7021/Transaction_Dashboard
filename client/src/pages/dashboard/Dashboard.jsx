import { useState } from "react"
import useFetch from "../../components/hooks/useFetch"
import ListTransactions from "../../components/listTransactions/ListTransactions"
import Statistics from "../../components/statistics/Statistics"
import BarChart from "../../components/barChart/BarChart"
import "./dashboard.scss"

const Dashboard = () => {
  const [selectedMonth, setSelectedMonth] = useState("March")
  const [searchText, setSearchText] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const {
    loading: transactionLoading,
    isError: transactionError,
    data: transactionData,
  } = useFetch(
    `/transactions?month=${selectedMonth}&search=${searchText}&limit=10&skip=${
      currentPage * 10 - 10
    }`
  )
  const { data } = useFetch(`/transaction-stats?month=${selectedMonth}`)

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1)
  }

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1))
  }

  const handleSearch = (e) => {
    setSearchText(e.target.value)
  }

  const handleMonthChange = (e) => {
    setSelectedMonth(e.target.value)
    setCurrentPage(1)
  }

  return (
    <div className="dashboard">
      <div className="transaction_header">
        <h2 className="transaction_heading">Transactions Dashboard</h2>
      </div>
      <div className="select_search">
        <div className="search_box">
          <label className="search_label">Search:</label>
          <input
            type="text"
            value={searchText}
            onChange={handleSearch}
            className="search_input"
            placeholder="Search..."
          />
        </div>
        <div className="select_box">
          <label className="select_label">Select Month:</label>
          <select
            value={selectedMonth}
            onChange={handleMonthChange}
            className="select_input"
          >
            {[
              "January",
              "February",
              "March",
              "April",
              "May",
              "June",
              "July",
              "August",
              "September",
              "October",
              "November",
              "December",
            ].map((month) => (
              <option
                key={month}
                value={month}
              >
                {month}
              </option>
            ))}
          </select>
        </div>
      </div>
      {transactionLoading && <p>Loading...</p>}
      {transactionError && <p>Error fetching transactions</p>}
      {!transactionLoading && (
        <>
          <ListTransactions transactions={transactionData?.transactions} />
          <div className="buttons">
            <div className="display_pg_no">
              <span className="page_no">Page No: </span>
              <span className="current_page">{currentPage}</span>
            </div>
            <div className="pagination">
              <button
                disabled={currentPage === 1}
                onClick={handlePrevPage}
                className="prev_btn"
              >
                Previous
              </button>
              <button
                disabled={currentPage === transactionData.totalPages}
                onClick={handleNextPage}
                className="next_btn"
              >
                Next
              </button>
            </div>
            <div className="display_pg_item">
              <span>Per Page: </span>
              <span>10</span>
            </div>
          </div>
        </>
      )}
      {data && (
        <>
          <Statistics
            statistics={data?.statistics}
            selectedMonth={selectedMonth}
          />
          <BarChart
            barChartData={data?.barChartData}
            selectedMonth={selectedMonth}
          />
        </>
      )}
    </div>
  )
}

export default Dashboard
