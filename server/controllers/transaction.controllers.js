import Transaction from "../models/transaction.model.js"

const getAllTransactions = async (req, res) => {
  try {
    const { month, page = 1, perPage = 10, search } = req.query

    const startIndex = (page - 1) * perPage
    const endIndex = page * perPage

    const query = {
      monthOfSale: month,
      $or: [
        { title: { $regex: search || "", $options: "i" } },
        { description: { $regex: search || "", $options: "i" } },
        { price: parseFloat(search) || 0 },
      ],
    }

    const totalCount = await Transaction.countDocuments(query)
    const totalPages = Math.ceil(totalCount / perPage)
    const transactions = await Transaction.find(query)
      .skip(startIndex)
      .limit(perPage)

    res.status(200).json({
      currentPage: parseInt(page),
      totalPages,
      totalRecords: totalCount,
      transactions,
    })
  } catch (error) {
    console.error("Error fetching transactions:", error)
    res.status(500).json({ error: "Internal Server Error" })
  }
}

const getStatistics = async (month) => {
  try {
    const totalSaleAmount = await Transaction.aggregate([
      { $match: { monthOfSale: month, sold: true } },
      { $group: { _id: null, total: { $sum: "$price" } } },
    ])

    const totalSoldItems = await Transaction.countDocuments({
      monthOfSale: month,
      sold: true,
    })

    const totalNotSoldItems = await Transaction.countDocuments({
      monthOfSale: month,
      sold: false,
    })

    return {
      totalSaleAmount:
        totalSaleAmount.length > 0 ? totalSaleAmount[0].total : 0,
      totalSoldItems,
      totalNotSoldItems,
    }
  } catch (error) {
    console.error("Error calculating statistics:", error)
    res.status(500).json({ error: "Internal Server Error" })
  }
}

const calculateBarChartData = async (month) => {
  const priceRanges = [
    { min: 0, max: 100 },
    { min: 101, max: 200 },
    { min: 201, max: 300 },
    { min: 301, max: 400 },
    { min: 401, max: 500 },
    { min: 501, max: 600 },
    { min: 601, max: 700 },
    { min: 701, max: 800 },
    { min: 801, max: 900 },
    { min: 901, max: Number.POSITIVE_INFINITY },
  ]

  const priceRangeCounts = {}

  const transactions = await Transaction.find({ monthOfSale: month })

  transactions.forEach((transaction) => {
    const price = transaction.price
    const range = priceRanges.find(
      (range) => price >= range.min && price <= range.max
    )
    if (range) {
      const key =
        range.max === Number.POSITIVE_INFINITY
          ? `${range.min}-Above`
          : `${range.min}-${range.max}`
      priceRangeCounts[key] = (priceRangeCounts[key] || 0) + 1
    }
  })

  return priceRangeCounts
}

const getCombinedResponse = async (req, res) => {
  try {
    const { month } = req.query

    const statistics = await getStatistics(month)
    const barChartData = await calculateBarChartData(month)

    const combinedData = {
      statistics,
      barChartData,
    }

    res.status(200).json(combinedData)
  } catch (error) {
    console.error("Error fetching combined data:", error)
    res.status(500).json({ error: "Internal Server Error" })
  }
}

export { getAllTransactions, getCombinedResponse }
