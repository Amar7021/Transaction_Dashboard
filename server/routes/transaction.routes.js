import express from "express"
import {
  getAllTransactions,
  getCombinedResponse,
} from "../controllers/transaction.controllers.js"

const router = express.Router()

router.route("/transactions").get(getAllTransactions)
router.route("/transaction-stats").get(getCombinedResponse)

export default router
