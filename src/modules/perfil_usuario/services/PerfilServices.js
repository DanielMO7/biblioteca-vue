import apiClient from "@/modules/general/services/AuthServices";

var relative_path = "/usuario"

export default {
    PerfilUsuario() {
        return apiClient.get(relative_path + '/perfil-usuario');
    }
}