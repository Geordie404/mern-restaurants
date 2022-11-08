import express from "express"

const router = express.Router() // different routes that people can go to

router.route("/").get((req,res) => res.send("hello world")) // demonstration route

export default router