import axios from "axios";

export const pokeClient = axios.create({
    baseURL:"http://localhost:8080/api"
})