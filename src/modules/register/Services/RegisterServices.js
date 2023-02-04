import apiClient from "@/modules/general/services";

export default {
    Registrar(params) {
        return apiClient.post('/insertar', params);
    },
    ValidarDocumentoEmail(params) {
        return apiClient.post('/validar-datos-registro',params)
    }
}