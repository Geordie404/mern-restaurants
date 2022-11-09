import ReviewsDAO from "../dao/reviewsDAO.js"

export default class ReviewsController {

    // API POST METHOD -> Sends data to server via API
  static async apiPostReview(req, res, next) {
    try {
        // gets information directly from body of the request
      const restaurantId = req.body.restaurant_id // restaurant ID
      const review = req.body.text // text of review
      const userInfo = { // user info
        name: req.body.name,
        _id: req.body.user_id
      }
      const date = new Date()

      const ReviewResponse = await ReviewsDAO.addReview( // method that adds a review from these parameters
        restaurantId,
        userInfo,
        review,
        date,
      )
      res.json({ status: "success" })
    } catch (e) {
      res.status(500).json({ error: e.message })
    }
  }

  // API UPDATE METHOD
  static async apiUpdateReview(req, res, next) { // same as above method except update an existing review rather than making a new one
    try {
      const reviewId = req.body.review_id
      const text = req.body.text
      const date = new Date()

      const reviewResponse = await ReviewsDAO.updateReview(
        reviewId,
        req.body.user_id, // make sure user is same one that made the review
        text,
        date,
      )

      var { error } = reviewResponse
      if (error) {
        res.status(400).json({ error })
      }

      if (reviewResponse.modifiedCount === 0) { // if no update processed
        throw new Error(
          "unable to update review - user may not be original poster",
        )
      }

      res.json({ status: "success" })
    } catch (e) {
      res.status(500).json({ error: e.message })
    }
  }

  // API DELETE METHOD
  static async apiDeleteReview(req, res, next) {
    try { // delete request typically dont have request body, but for this we are doing a workaround delete method
      const reviewId = req.query.id // get object ID from query url
      const userId = req.body.user_id // get user ID out of body (not standard)
      console.log(reviewId)
      const reviewResponse = await ReviewsDAO.deleteReview(
        reviewId,
        userId,
      )
      res.json({ status: "success" })
    } catch (e) {
      res.status(500).json({ error: e.message })
    }
  }

}