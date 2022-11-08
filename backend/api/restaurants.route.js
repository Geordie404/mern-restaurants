import express from "express"
import RestaurantsCtrl from "./restaurants.controller.js"

const router = express.Router() // different routes that people can go to

// router.route("/").get((req,res) => res.send("hello world")) // demonstration route
router.route("/").get(RestaurantsCtrl.apiGetRestaurants) // route to restaurants controller

export default router