import axios from "axios";

const axiasInistance=axios.create({
    baseURL:"http://127.0.0.1:8000/api"
})
export default axiasInistance;