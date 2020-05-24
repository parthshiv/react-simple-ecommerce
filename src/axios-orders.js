// here you can create axios instance and use it wherever it require to call your API.

import axios from "axios";

const axiosInstance = axios.create();

//below is your firebase/any backend API URL
axiosInstance.defaults.baseURL =
  "https://react-burger-app-8053d.firebaseio.com/";

export default axiosInstance;
