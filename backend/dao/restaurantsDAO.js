import mongodb from "mongodb"
const ObjectId = mongodb.ObjectId
let restaurants

export default class RestaurantsDAO {

// this async function runs as soon as database connects for first time
  static async injectDB(conn) { //inject DB for initial connection to database
    if (restaurants) {
      return // will fill with the variable thats already set
    }
    try {
      restaurants = await conn.db(process.env.RESTREVIEWS_NS).collection("restaurants")
      // if not will try to connect to setting the database environment variable manually
    } catch (e) {
      console.error(
        `Unable to establish a collection handle in restaurantsDAO: ${e}`,
      )
    }
  }

// this method is for getting the restaurant data we are looking for
  static async getRestaurants({
    // defaults
    filters = null,
    page = 0,
    restaurantsPerPage = 20, // gets 20 restaurants at once
  } = {}) {
    let query
    // query starts empty but the user can pass in filters
    if (filters) {
      if ("name" in filters) { // search by name
        query = { $text: { $search: filters["name"] } } // search for a name, set up in atlas for a text search for specific field
      } else if ("cuisine" in filters) { // search by cuisine
        query = { "cuisine": { $eq: filters["cuisine"] } } 
        // if the cuisine from the database equals the one passed in, search for specific cuisine
      } else if ("zipcode" in filters) { // search by zipcode
        query = { "address.zipcode": { $eq: filters["zipcode"] } }
      }
    }

    let cursor
    
    try {
      cursor = await restaurants
        .find(query) // tries to find all restaurants in the database that go along with the filtered query
    } catch (e) {
      console.error(`Unable to issue find command, ${e}`)
      return { restaurantsList: [], totalNumRestaurants: 0 } // returns empty list on error
    }

    const displayCursor = cursor.limit(restaurantsPerPage).skip(restaurantsPerPage * page) // limit our results based on our defaults

    try {
      const restaurantsList = await displayCursor.toArray() // sets our filtered cursos to an array
      const totalNumRestaurants = await restaurants.countDocuments(query) // counts number of restaurants based on documents in query count

      return { restaurantsList, totalNumRestaurants } // returns filtered list and total number of restaurants 
    } catch (e) {
      console.error(
        `Unable to convert cursor to array or problem counting documents, ${e}`,
      )
      return { restaurantsList: [], totalNumRestaurants: 0 } // if error, returns empty list
    }
  }
}
