import apiClient from "@/modules/general/services/AuthServices";

var relative_path = "/usuario"

export default {
    PerfilUsuario() {
        return apiClient.get(relative_path + '/perfil-usuario');
    },
    EditarPerfil(params) {
        return apiClient.post(relative_path + '/editar-usuario/guardar', params);
    },
    EditarContrasena(params) {
        return apiClient.post(relative_path + '/cambiar-contrasena', params);
    }
}