// import logo from './logo.svg';
// import './App.css';

import React from "react";
import { Switch, Route, Link } from "react-router-dom"; // uses our different URL routes for different react components
import "bootstrap/dist/css/bootstrap.min.css"; // basic bootstrap for styling our whole app

// add in our different components that correspond to different API actions
import AddReview from "./components/add-review";
import Restaurant from "./components/restaurants";
import RestaurantsList from "./components/restaurants-list";
import Login from "./components/login";

function App() {

  const [user, setUser] = React.useState(null); // creating a hook with a state variable with initial value null
  // set user is a function we will use to update the user variable

  // this app uses a dummy login system, can be fleshed out
  async function login(user = null) { // async function login with defualt user null
    setUser(user); // sets user with user we passed into login function
    
  }

  async function logout() { // logs out user
    setUser(null) // sets user to null on logout
  }

  return ( 
    <div>
      <nav className="navbar navbar-expand navbar-dark bg-dark">
          <a href="/restaurants" className="navbar-brand"> 
            Restaurant Reviews
          </a>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/restaurants"} className="nav-link">
                Restaurants
              </Link>
            </li>
            <li className="nav-item" >
              { user ? (
                <a onClick={logout} className="nav-link" style={{cursor:'pointer'}}>
                  Logout {user.name}
                </a>
              ) : (            
              <Link to={"/login"} className="nav-link">
                Login
              </Link>
              )}

            </li>
          </div>
        </nav>

        
        <div className="container mt-3">
        {/* Switch statement that allows access to the different components */}
        <Switch>

          <Route exact path={["/", "/restaurants"]} component={RestaurantsList} /> 

          <Route 
            path="/restaurants/:id/review"
            render={(props) => ( <AddReview {...props} user={user} /> )}
          />

          <Route 
            path="/restaurants/:id"
            render={(props) => (<Restaurant {...props} user={user} />
            )}
          />

          <Route 
            path="/login"
            render={(props) =>(<Login login={login} />)}
          />


        </Switch>
      </div>
    </div>
      
  );
}

export default App;
