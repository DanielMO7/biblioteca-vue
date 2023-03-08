<template>
  <v-container>
    <v-card v-if="!loading_perfil" width="100%" min-height="350">
      <v-toolbar class="d-flex justify-center" color="#a52a2a" dense dark>
        <v-card-title> Pefil de Usuario </v-card-title>
      </v-toolbar>
      <v-row>
        <v-col
          class="d-flex justify-center align-center"
          cols="12"
          lg="2"
          md="2"
        >
          <v-avatar class="mt-3" color="#1E1E1E" size="90">
            <!-- <img
                  src="https://cdn.vuetifyjs.com/images/john.jpg"
                  alt="John"
                /> -->
            <span class="white--text text-h5">{{ iniciales_nombre }}</span>
          </v-avatar>
        </v-col>
        <v-divider vertical></v-divider>

        <v-col
          class="d-flex justify-center align-center"
          cols="12"
          lg="5"
          md="5"
        >
          <v-row>
            <v-col cols="12">
              <v-card-text class="ml-0">
                <p><b>Nombre:</b> {{ usuario.nombre }}</p>
                <p><b>Documento:</b> {{ usuario.documento }}</p>
                <p><b>Emil:</b> {{ usuario.email }}</p>
                <p><b>Rol:</b> {{ usuario.rol }}</p>
              </v-card-text>
            </v-col>
          </v-row>
        </v-col>
        <v-divider vertical></v-divider>

        <v-col
          class="d-flex justify-center align-center"
          cols="12"
          lg="5"
          md="5"
        >
          <v-row>
            <v-col cols="12">
              <p class="text-center"><b>Configuraciones:</b></p>
            </v-col>
            <v-col cols="12">
              <v-btn @click="editar_perfil = true" outlined text color="black">
                Editar Perfil
                <v-icon right dark> mdi-account-edit-outline </v-icon>
              </v-btn>
            </v-col>
            <v-col cols="12">
              <v-btn
                @click="cambiar_contrasena = true"
                outlined
                text
                color="black"
              >
                Cambiar Contraseña
                <v-icon right dark> mdi-lock </v-icon>
              </v-btn>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-card>
    <v-card v-else height="88%" class="d-flex align-center mb-5">
      <v-container>
        <v-card-text>
          <v-row>
            <!-- Circulo de progresa mientras se procesa la informacion -->
            <v-col class="d-flex justify-center"
              ><v-progress-circular
                :width="7"
                :size="77"
                color="#a52a2a"
                indeterminate
              ></v-progress-circular>
            </v-col>
          </v-row>
          <v-row>
            <!-- Texto mientras se procesa la peticion. -->
            <v-col class="d-flex justify-center">
              <v-card-title>Cargando Perfil...</v-card-title>
            </v-col>
          </v-row>
        </v-card-text>
      </v-container>
    </v-card>
    <v-dialog persistent width="450" v-model="editar_perfil">
      <EditarPerfilVue
        @verificarStorage="verificarStorage"
        @actualizarDatos="actualizarDatos()"
        :usuario="usuario"
        @CerrarDialog="editar_perfil = false"
      />
    </v-dialog>
    <v-dialog persistent width="450" v-model="cambiar_contrasena">
      <CambiarContrasenaVue
        @verificarStorage="verificarStorage"
        @actualizarDatos="actualizarDatos()"
        :usuario="usuario"
        @CerrarDialog="cambiar_contrasena = false"
      />
    </v-dialog>
  </v-container>
</template>
<script>
//import PerfilServices from "@/modules/perfil_usuario/services/PerfilServices";
import EditarPerfilVue from "./components/EditarPerfil.vue";
import SecureLS from "secure-ls";
import CambiarContrasenaVue from "./components/CambiarContrasena.vue";

export default {
  components: {
    EditarPerfilVue,
    CambiarContrasenaVue,
  },
  data: () => ({
    usuario: [],
    iniciales_nombre: "",
    loading_perfil: false,
    editar_perfil: false,
    cambiar_contrasena: false,
  }),
  methods: {
    verificarStorage() {
      this.$emit("verificarStorage");
    },
    actualizarDatos() {
      this.loading_perfil = true;
      let ls = new SecureLS();
      this.usuario = ls.get("profile_user").data;
      // charAt(0) | Selecciona el primer caracter de un string.
      this.iniciales_nombre = this.usuario.nombre.charAt(0);
      this.loading_perfil = false;
    },
  },
  created() {
    this.actualizarDatos();
  },
};
</script>
