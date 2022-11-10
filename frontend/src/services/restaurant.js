import http from "../http-common"; // import the AXIOS base URL

class RestaurantDataService {
 // write different methods that serve as individual api calls that go through axios

// GET requests -> action that gets data based on a query with filters
// they work by taking the base url and then returning a custom url based on parameters
    getAll(page = 0) {
        return http.get(`restaurants?page=${page}`); // get all restaurants at page 0 default
    }

    get(id) {
        return http.get(`/restaurant?id=${id}`); // get a single restaurant of an ID
    }

    find(query, by = "name", page = 0) {
        return http.get(`restaurants?${by}=${query}&page=${page}`); // find restaurant
    } 

    getCuisines(id) {
        return http.get(`restaurants/cuisines`); // get cuisines //// added cuisines to url
      }

// POST -> adding a child resource
    createReview(data) {
        return http.post("/review-new", data); //post new review
    }

// PUT -> modify single resource
    updateReview(data) {
        return http.put("/review-edit", data); /// update existign review
    }

// DELETE -> remove data
    deleteReview(id, userId) {
        return http.delete(`/review-delete?id=${id}`, {data:{user_id: userId}}); // delete review by id and user
    }

}

export default new RestaurantDataService();