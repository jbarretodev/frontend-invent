import axios, {
  AxiosInstance,
  InternalAxiosRequestConfig,
  AxiosError,
  CancelTokenSource,
} from "axios";

// Creamos una instancia de Axios
const axiosInstance: AxiosInstance = axios.create({
  baseURL: `${import.meta.env.VITE_BASE_URL_API}`,
  // Otros parámetros de configuración aquí
});

// Función para crear un token de cancelación
const { CancelToken } = axios;
let cancelTokenSource: CancelTokenSource;

// Interceptor para añadir el token JWT y encabezados de Content-Type y Accept a las solicitudes
axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      config.headers["Content-Type"] = "application/json";
      config.headers["Accept"] = "application/json";
      return config;
    } else {
      // Si el token no está presente, cancelamos la solicitud
      cancelTokenSource = CancelToken.source();
      cancelTokenSource.cancel("Solicitud cancelada: Token JWT no disponible");
      return Promise.reject("Token JWT no disponible");
    }
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

// Manejar el token cancelado
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error: AxiosError) => {
    if (axios.isCancel(error)) {
      // Manejar la cancelación de la solicitud aquí
      console.log("Solicitud cancelada:", error.message);
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
