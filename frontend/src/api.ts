import axios from "axios";

const API = axios.create({
  baseURL: "http://127.0.0.1:8000/api",
});

export const fetchRestaurants = () => API.get("/restaurants");
export const fetchOrders = () => API.get("/orders");
export const fetchTrends = (restaurantId: number, from?: string, to?: string) =>
  API.get(`/restaurant/${restaurantId}/trends`, { params: { from, to } });
export const fetchTopRestaurants = (from?: string, to?: string) =>
  API.get("/top-restaurants", { params: { from, to } });
