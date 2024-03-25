import express from "express"
import cors from "cors"
import fetch from "node-fetch"
import connectToDB from "./db/index.js"
import dotenv from "dotenv"
import Transaction from "./models/transaction.model.js"
dotenv.config()

const app = express()

// Middlewares
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
  })
)

app.use(express.json({ limit: "16kb" }))
app.use(
  express.urlencoded({
    extended: true,
    limit: "16kb",
  })
)

// Function to initialize the data once
// async function fetchTransactions() {
//   try {
//     const response = await fetch(
//       "https://s3.amazonaws.com/roxiler.com/product_transaction.json"
//     )
//     const storeTransactions = await response.json()

//     for (let i = 0; i < storeTransactions.length; i++) {
//       const dateOfSale = new Date(storeTransactions[i]["dateOfSale"])
//       const monthOfSale = dateOfSale.toLocaleString("default", {
//         month: "long",
//       })
//       const transactions = new Transaction({
//         id: storeTransactions[i]["id"],
//         title: storeTransactions[i]["title"],
//         price: storeTransactions[i]["price"],
//         description: storeTransactions[i]["description"],
//         category: storeTransactions[i]["category"],
//         image: storeTransactions[i]["image"],
//         sold: storeTransactions[i]["sold"],
//         dateOfSale: dateOfSale,
//         monthOfSale: monthOfSale,
//       })
//       await transactions.save()
//     }
//   } catch (error) {
//     console.error("Error while initializing data: ", error)
//   }
// }

const PORT = process.env.PORT || 8080

// Connect to Database
connectToDB()
  .then(() => {
    // try {
    //   await fetchTransactions()
    // } catch (error) {
    //   console.error("Error executing fetchData:", error)
    // }

    app.on("error", (error) => {
      console.error("Error connecting to Database: ", error)
    })

    app.listen(PORT, () => {
      console.log("Server is running on http://localhost:" + PORT)
    })
  })
  .catch((error) => {
    console.error("MongoDB connection failed !!!", error)
  })

// Routes
import transactionRoutes from "./routes/transaction.routes.js"

app.use("/api/v1", transactionRoutes)
