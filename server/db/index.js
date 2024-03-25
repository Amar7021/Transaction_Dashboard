import mongoose from "mongoose"

const connectToDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(process.env.MONGO_URI)
    console.log(
      `\n MongoDB Connected || DB Host: ${connectionInstance.connection.host}`
    )
  } catch (error) {
    console.log("Error connecting to Database: ", error)
    process.exit(1)
  }
}

export default connectToDB
