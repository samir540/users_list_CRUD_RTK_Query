import axios from "axios";


export const baseUrl = axios.create({
  baseURL: "https://frontend-candidate.dev.sdh.com.ua/v1",
});