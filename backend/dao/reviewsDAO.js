import mongodb from "mongodb"
const ObjectId = mongodb.ObjectId

let reviews // starts empty and then gets filled with reference to collection

export default class ReviewsDAO {
  static async injectDB(conn) {
    if (reviews) { // if already exists, reviews returns
      return
    }
    try { // if not, reviews gets set if it does not exist already. In MongoDB it will be created
      reviews = await conn.db(process.env.RESTREVIEWS_NS).collection("reviews")
    } catch (e) {
      console.error(`Unable to establish collection handles in userDAO: ${e}`)
    }
  }

  static async addReview(restaurantId, user, review, date) {
    try {
      const reviewDoc = { name: user.name, // creating the review document based on the parameters passed in from the controller
          user_id: user_id,
          date: date,
          text: review,
          restaurant_id: ObjectId(restaurantId), } // mongoDB object ID from the restaurant ID

      return await reviews.insertOne(reviewDoc) // insert function
    } catch (e) {
      console.error(`Unable to post review: ${e}`)
      return { error: e }
    }
  }

  static async updateReview(reviewId, userId, text, date) {
    try { // looks for review that has correct user id and review id
      const updateResponse = await reviews.updateOne(
        { user_id: userId, _id: ObjectId(reviewId)},
        { $set: { text: text, date: date  } }, // updates the rest and date
      )

      return updateResponse
    } catch (e) {
      console.error(`Unable to update review: ${e}`)
      return { error: e }
    }
  }

  static async deleteReview(reviewId, userId) { // delete if same IDs

    try {
      const deleteResponse = await reviews.deleteOne({
        _id: ObjectId(reviewId),
        user_id: userId,
      })

      return deleteResponse
    } catch (e) {
      console.error(`Unable to delete review: ${e}`)
      return { error: e }
    }
  }

}