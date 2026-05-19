import { createApp } from "vue"
import axios from "axios"
import App from "./App.vue"
import router from "./router"
import "./index.css"

axios.defaults.baseURL = import.meta.env.VITE_API_URL || "http://localhost:3000"
axios.interceptors.request.use((config) => {
  const token = localStorage.getItem("session")
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

axios.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401) {
      localStorage.removeItem("session")
      localStorage.removeItem("userName")
      localStorage.removeItem("userEmail")
      if (router.currentRoute.value.path !== "/login") {
        router.push("/login")
      }
    }
    return Promise.reject(error)
  }
)

const app = createApp(App)

app.use(router)
app.mount("#app")
