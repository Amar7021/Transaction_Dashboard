import PropTypes from "prop-types"
import "./listTransactions.scss"

const ListTransactions = ({ transactions }) => {
  const truncate = (str, n) => {
    if (str.length > n) {
      return str.slice(0, n) + "..."
    } else {
      return str
    }
  }
  return (
    <div className="table-container">
      <table className="transaction-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Description</th>
            <th>Price</th>
            <th>Category</th>
            <th>Sold</th>
            <th>Image</th>
          </tr>
        </thead>
        <tbody>
          {transactions?.map((transaction) => {
            return (
              <tr key={transaction._id}>
                <td>{transaction.id}</td>
                <td className="transaction_title">
                  {truncate(transaction.title, 25)}
                </td>
                <td className="transaction_description">
                  {truncate(transaction.description, 150)}
                </td>
                <td className="transaction_price">
                  &#8377;&nbsp;{transaction.price.toFixed(2)}
                </td>
                <td className="transaction_category">{transaction.category}</td>
                <td className={transaction.sold ? "sold" : "not_sold"}>
                  {transaction.sold ? "Sold" : "Not Sold"}
                </td>
                <td>
                  <img
                    src={transaction.image}
                    alt=""
                  />
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

export default ListTransactions

ListTransactions.propTypes = {
  transactions: PropTypes.array,
}
