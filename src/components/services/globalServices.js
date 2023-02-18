import apiClient from "@/modules/general/services/AuthServices";

export default {
    CerrarSesion() {
        return apiClient.post('/cerrar-sesion');
    },
    ValidarToken() {
        return apiClient.post('/validar-token');
    }
}