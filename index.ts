import "dotenv/config"
import "express-async-errors"
import express from "express"
import connectDB from "./services/db"
import authRouter from "./routes/auth.route"
import { errorHandlerMiddleware } from "./middleware/error.middleware"

const app = express()
app.use(express.json())

const port = 3000

app.get("/", (req, res) => {
  res.send("Hello, TypeScript + Node.js + Express!")
})

app.use("/api/v1/auth", authRouter)
app.use(errorHandlerMiddleware)
const start = async () => {
  try {
    console.log("Connecting to database...")
    await connectDB()
    console.log("Database connected")
    app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`)
    })
  } catch (error) {
    console.log(error)
  }
}
start()
