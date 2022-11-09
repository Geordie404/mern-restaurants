import RestaurantsDAO from "../dao/restaurantsDAO.js" // import data access object

export default class RestaurantsController {

    // API query for getting a json response with all restaurant information
  static async apiGetRestaurants(req, res, next) {
    const restaurantsPerPage = req.query.restaurantsPerPage ? parseInt(req.query.restaurantsPerPage, 10) : 20
    const page = req.query.page ? parseInt(req.query.page, 10) : 0 // if page number passed in, convert to int, else 0

    let filters = {} // getting the filters from the query string, runs parallel to the data access object
    // gets information from query parameter
    if (req.query.cuisine) {
      filters.cuisine = req.query.cuisine
    } else if (req.query.zipcode) {
      filters.zipcode = req.query.zipcode
    } else if (req.query.name) {
      filters.name = req.query.name
    }

    const { restaurantsList, totalNumRestaurants } = await RestaurantsDAO.getRestaurants({
      filters,
      page,
      restaurantsPerPage,
    }) // gets a return object of restaurants list and total number of restaurants

    let response = { // build a response based on our restaurants list
      restaurants: restaurantsList,
      page: page,
      filters: filters,
      entries_per_page: restaurantsPerPage,
      total_results: totalNumRestaurants,
    }
    res.json(response) // sends a json response to a particular URL
  }

  // static async apiGetRestaurantById(req, res, next) {
  //   try {
  //     let id = req.params.id || {} // get id from request parameter (parameter is in the url after a slash)
  //     let restaurant = await RestaurantsDAO.getRestaurantByID(id) 
  //     if (!restaurant) {
  //       res.status(404).json({ error: "Not found" })
  //       return
  //     }
  //     res.json(restaurant)
  //   } catch (e) {
  //     console.log(`api, ${e}`)
  //     res.status(500).json({ error: e })
  //   }
  // }

  // static async apiGetRestaurantCuisines(req, res, next) {
  //   try {
  //     let cuisines = await RestaurantsDAO.getCuisines() // just gets the cuisines list
  //     res.json(cuisines)
  //   } catch (e) {
  //     console.log(`api, ${e}`)
  //     res.status(500).json({ error: e })
  //   }
  // }

}