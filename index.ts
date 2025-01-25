import "dotenv/config"
import "express-async-errors"
import express from "express"
import connectDB from "./services/db"
import helmet from "helmet"
import cors from "cors"
import morgan from "morgan"
import { errorHandlerMiddleware } from "./middleware/error.middleware"
const mode = process.env.MODE
const app = express()
import authRouter from "./routes/auth.route"
import userRouter from "./routes/user.route"

app.use(helmet())
app.use(
  cors({
    origin: process.env.ALLOWED_ORIGIN,
    credentials: true,
  }),
)

mode === "dev" && app.use(morgan("dev"))
app.use(express.json())

const port = 3000

app.get("/", (req, res) => {
  res.send("Hello, TypeScript + Node.js + Express!")
})

app.use("/api/v1/auth", authRouter)
app.use("/api/v1/my", userRouter)
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
