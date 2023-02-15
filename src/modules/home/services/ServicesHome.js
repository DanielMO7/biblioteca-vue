import apiClient from "@/modules/general/services/index";

var relative_path  ="/home"

export default {
    // Trae las frases que se muestran en el home
    FrasesHome() {
        return apiClient.get(relative_path + '/frases-home');
    },
}