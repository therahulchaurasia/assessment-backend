import express from "express"
const router = express.Router()

router.post("/register", (req, res) => {
  console.log(req.body)
  res.status(200).json({ message: "Register route" })
})

export default router
