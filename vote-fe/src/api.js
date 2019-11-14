import axios from "axios";
import _mainURL from "./baseURL";
const api = axios.create({
    baseURL: _mainURL + "api/",
    withCredentials: true
})
export default api;