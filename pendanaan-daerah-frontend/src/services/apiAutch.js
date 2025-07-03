// src/services/apiAuth.js
import axios from "axios";

const API_AUTH = axios.create({
  baseURL: "http://localhost:5000/api/auth",
});

export default API_AUTH;
