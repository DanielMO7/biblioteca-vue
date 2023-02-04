import apiClient from "@/modules/general/services/index";

export default {
    IniciarSesion(params) {
        return apiClient.post('/ingresar', params);
    },
}