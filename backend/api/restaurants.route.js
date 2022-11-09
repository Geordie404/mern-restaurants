import express from "express"
import RestaurantsCtrl from "./restaurants.controller.js"
import ReviewsCtrl from "./reviews.controller.js"

const router = express.Router()

router.route("/").get(RestaurantsCtrl.apiGetRestaurants)
// new routes for restaurants controller
// router.route("/id/:id").get(RestaurantsCtrl.apiGetRestaurantById) // get restaurant by specific ID
// router.route("/cuisines").get(RestaurantsCtrl.apiGetRestaurantCuisines) // just get cuisines

router
  .route("/review")
  .post(ReviewsCtrl.apiPostReview)
  .put(ReviewsCtrl.apiUpdateReview)
  .delete(ReviewsCtrl.apiDeleteReview)

export default router

// import express from "express"
// import RestaurantsCtrl from "./restaurants.controller.js"
// import ReviewsCtrl from "./reviews.controller.js"

// const router = express.Router() // different routes that people can go to

// // router.route("/").get((req,res) => res.send("hello world")) // demonstration route
// router.route("/").get(RestaurantsCtrl.apiGetRestaurants) // route to restaurants controller

// router
//   .route("/review")
//   .post(ReviewsCtrl.apiPostReview)
//   .put(ReviewsCtrl.apiUpdateReview)
//   .delete(ReviewsCtrl.apiDeleteReview)

// export default router