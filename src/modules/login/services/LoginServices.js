import apiClient from "@/modules/general/services";

export default {
    IniciarSesion(params) {
        return apiClient.post('/ingresar', params);
    }
}