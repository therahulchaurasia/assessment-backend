import "dotenv/config"
// Import the 'express' module
import express from "express"
import connectDB from "./services/connectdb"
import authRouter from "./routes/auth"

// Create an Express application
const app = express()
app.use(express.json())

// Set the port number for the server
const port = 3000

// Define a route for the root path ('/')
app.get("/", (req, res) => {
  // Send a response to the client
  res.send("Hello, TypeScript + Node.js + Express!")
})

app.use("/api/v1/auth", authRouter)

const start = async () => {
  try {
    console.log("Connecting to database...")
    await connectDB()
    console.log("Connected to database")
    app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`)
    })
  } catch (error) {
    console.log(error)
  }
}
start()
