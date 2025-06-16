import axios from 'axios'

const axiosInstance = axios.create({
    baseURL: "http://localhost:8000/api/v1/users",
    withCredentials: true,
})

axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        if (error.response?.status === 403 && !originalRequest._retry) {
            originalRequest._retry = true;
            try {
                const res = await axiosInstance.get("/auth/refresh-token")
                axiosInstance.defaults.headers["Authrization"] = `Bearer ${res.data.data.accessToken}`
                return axiosInstance(originalRequest)
            } catch (refreshError) {
                return Promise.reject(refreshError)
            }
        }
        return Promise.reject(error)
    }
);

export default axiosInstance