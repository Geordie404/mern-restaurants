import React, { useState, useEffect } from "react";
import RestaurantDataService from "../services/restaurant";
import { Link } from "react-router-dom";

const RestaurantsList = props => {
  // react hooks to create state variables
  // variables that corrolate to the items being searched for
  const [restaurants, setRestaurants] = useState([]); // empty array
  const [searchName, setSearchName ] = useState(""); // what the user is searching for
  const [searchZip, setSearchZip ] = useState("");
  const [searchCuisine, setSearchCuisine ] = useState("");
  const [cuisines, setCuisines] = useState(["All Cuisines"]); // all cuisines


  // what react is doing on render 
  // ---- render block start -------
  useEffect(() => {
    retrieveRestaurants(); // retrieve the restaurants
    retrieveCuisines(); // retrieve the cuisines
  }, []);

  const retrieveRestaurants = () => {
    RestaurantDataService.getAll() // a data service that we created
      .then(response => {
        console.log(response.data);
        setRestaurants(response.data.restaurants); // sets restaurant data state
        
      })
      .catch(e => {
        console.log(e);
      });
  };

  const retrieveCuisines = () => {
    RestaurantDataService.getCuisines() // data service from axios
      .then(response => {
        console.log(response.data); // log them
        setCuisines(["All Cuisines"].concat(response.data)); // concat cuisines to all cuisines, all cuisines and then individual ones
        
      })
      .catch(e => {
        console.log(e);
      });
  };

  // ------- Render block end --------

 // ----- search box block ------
  const onChangeSearchName = e => {
    const searchName = e.target.value;
    setSearchName(searchName);
  };

  const onChangeSearchZip = e => {
    const searchZip = e.target.value;
    setSearchZip(searchZip);
  };

  const onChangeSearchCuisine = e => {
    const searchCuisine = e.target.value;
    setSearchCuisine(searchCuisine);
    
  };
// ------- search box block end --------

// --- search for all restaurants to refresh the list -----
const refreshList = () => {
  retrieveRestaurants();
};
//// ---- Button Functions -------

// this function gets called by the other buttons
const find = (query, by) => { // search by the input query and the specific type (name, zip, cuisine)
  RestaurantDataService.find(query, by)
    .then(response => {
      console.log(response.data);
      setRestaurants(response.data.restaurants);
    })
    .catch(e => {
      console.log(e);
    });
};

const findByName = () => {
  find(searchName, "name")
};

const findByZip = () => {
  find(searchZip, "zipcode")
};

const findByCuisine = () => {
  if (searchCuisine == "All Cuisines") {
    refreshList();
  } else {
    find(searchCuisine, "cuisine")
  }
};
/// ----------


  return (
    // Heavy use of bootstrap for HMTL to help style things
    <div>
      <div className="row pb-1">


        {/* Search by name field and button */}

        <div className="input-group col-lg">
          {/* first input box, searching restaurant by name  */}
          <input
            type="text"
            className="form-control"
            placeholder="Search by name"
            value={searchName}
            onChange={onChangeSearchName}
          />
          {/* Button that finds by name when the input is fulled by user */}
          <div className="input-group-append">
            <button
              className="btn btn-outline-secondary"
              type="button"
              onClick={findByName}
            >
              Search
            </button>
          </div>
        </div>

        {/* Search by zip field and button */}

        <div className="input-group col-lg">
          <input
            type="text"
            className="form-control"
            placeholder="Search by zip"
            value={searchZip}
            onChange={onChangeSearchZip}
          />
          <div className="input-group-append">
            <button
              className="btn btn-outline-secondary"
              type="button"
              onClick={findByZip}
            >
              Search
            </button>
          </div>
        </div>




        <div className="input-group col-lg">

          {/* Drop Down menu */}

         {/* Set cuisine to the variable the person selected */}
          <select onChange={onChangeSearchCuisine}>
            {/* Map function to get the cuisines in the list */}
             {cuisines.map(cuisine => {
               return (
                // each one returns an option for the select box ,only 20 chars
                 <option value={cuisine}> {cuisine.substring(0, 20)} </option>
               )
             })}
          </select>
          <div className="input-group-append">
            <button
              className="btn btn-outline-secondary"
              type="button"
              onClick={findByCuisine}
            >
              Search
            </button>
            {/* find by cuisine that was selected from the dropdown list */}
          </div>

        </div>
      </div>
      {/* bootstrap row */}
      <div className="row"> 
      {/* maps through restaurants array  , in react curly braces indicates a JS function*/}
        {restaurants.map((restaurant) => {
          const address = `${restaurant.address.building} ${restaurant.address.street}, ${restaurant.address.zipcode}`;
          return (
            // this is a bootstrap card that was modified to fit the needs of this feature
            <div className="col-lg-4 pb-1">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">{restaurant.name}</h5>
                  <p className="card-text">
                    <strong>Cuisine: </strong>{restaurant.cuisine}<br/>
                    <strong>Address: </strong>{address}
                  </p>
                  <div className="row">
                  <Link to={"/restaurants/"+restaurant._id} className="btn btn-primary col-lg-5 mx-1 mb-1">
                    View Reviews
                  </Link>
                  {/* bonus feature that lets us search on google maps */}
                  <a target="_blank" href={"https://www.google.com/maps/place/" + address} className="btn btn-primary col-lg-5 mx-1 mb-1">View Map</a>
                  </div>
                </div>
              </div>
            </div>
          );
        })}


      </div>
    </div>
  );
};

export default RestaurantsList;