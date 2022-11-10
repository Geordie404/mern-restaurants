import axios from "axios";

export default axios.create({
  baseURL :"http://localhost:5000/api/v1", // omit restaurant in url works
  headers: {
    "Content-type": "application/json"
  }
});