import axios from "axios";
import SecureLS from "secure-ls";

/**
 * variable que contiene el token guardado en el inicio de sesion
 */
var ls = new SecureLS();
const token = ls.get("acces_token").data;

// Creamos la base de las peticiones, con los datos necesarios
const apiClient = axios.create({
  baseURL: process.env.VUE_APP_BASE_URL,
  headers:{
    Authorization: `Bearer ${token}` 
  }
});

//Se crea un interceptor que antes de hacer cada peticion va y renueva el token guardado en el local storage
apiClient.interceptors.request.use(
  config =>{
    config.headers.Authorization = `Bearer ${ls.get("acces_token").data} `;
    return config;
  },
  error =>{
    return Promise.reject(error)
  }
);

// Exportamos los métodos para las peticiones
export default apiClient;