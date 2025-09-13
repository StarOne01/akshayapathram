import axios from "axios";

const axiosInstace = axios.create({
  baseURL: "https://wt2mb3fb-3000.inc1.devtunnels.ms",
});

export default axiosInstace;
