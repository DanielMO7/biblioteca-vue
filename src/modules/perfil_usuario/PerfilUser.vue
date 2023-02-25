<template>
  <v-container>
    <v-card v-if="!loading_perfil" width="100%" height="350">
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
          lg="10"
          md="10"
        >
          <v-card-text class="ml-0">
            <p><b>Nombre:</b> {{ usuario.name }}</p>
            <p><b>Documento:</b> {{ usuario.documento }}</p>
            <p><b>Emil:</b> {{ usuario.email }}</p>
            <p><b>Rol:</b> {{ usuario.rol }}</p>
          </v-card-text>
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
  </v-container>
</template>
<script>
import PerfilServices from "@/modules/perfil_usuario/services/PerfilServices";

export default {
  data: () => ({
    usuario: [],
    iniciales_nombre: "",
    loading_perfil: false,
  }),
  methods: {},
  async created() {
    this.loading_perfil = true;
    await PerfilServices.PerfilUsuario().then((response) => {
      //console.log(response.data);
      this.usuario = response.data.data;
      if (this.usuario.rol == 1) {
        this.usuario.rol = "Administrador";
      } else if (this.usuario.rol == 2) {
        this.usuario.rol = "Usuario";
      }
      // charAt(0) | Selecciona el primer caracter de un string.
      this.iniciales_nombre = this.usuario.name.charAt(0);
      this.loading_perfil = false;
    });
  },
};
</script>
