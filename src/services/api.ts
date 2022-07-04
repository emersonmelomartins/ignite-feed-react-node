import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:3333",
  headers: {
    "Content-Type": "application/json",
    "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjkwN2M5OGMwLWIyNzgtNGZlZi1hNjhkLWMxMTJkODMyMTE2MyIsImlhdCI6MTY1Njk2NDQ3NiwiZXhwIjoxNjU3MDUwODc2fQ.JrnMbh_ePSaIe9RdD-l0Vx8LgggMBxpGW__4SfpAzlQ"
  },
});
