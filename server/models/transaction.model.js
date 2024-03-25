import mongoose, { Schema } from "mongoose"

const transactionSchema = new Schema(
  {
    id: Number,
    title: String,
    price: Number,
    description: String,
    category: String,
    image: String,
    sold: Boolean,
    dateOfSale: Date,
    monthOfSale: String,
  },
  {
    timestamps: true,
  }
)

const Transaction = mongoose.model("Transaction", transactionSchema)
export default Transaction
