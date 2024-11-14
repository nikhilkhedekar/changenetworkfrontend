import axios from "axios";

// const accessToken = localStorage.getItem("accessToken");
export const api = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
});

// if(accessToken){
//     AxiosInstance.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
// };