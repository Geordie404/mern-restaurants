import express from "express"
import cors from "cors"
import restaurants from "./api/restaurants.route.js"

// main server setup code

const app = express()

app.use(cors())
app.use(express.json()) // server can accept json in the body of the request

app.use("/api/v1/restaurants", restaurants) // general procedure for api routes, routes are in restaurants file
app.use("*", (req, res) => res.status(404).json({ error: "not found"})) // wildcare route returns error

export default app