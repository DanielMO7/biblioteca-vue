<template>
  <v-container>
    <v-card width="100%" height="350">
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
          <v-avatar class="mt-3" color="primary" size="90">
            <!-- <img
                  src="https://cdn.vuetifyjs.com/images/john.jpg"
                  alt="John"
                /> -->
            <span class="white--text text-h5">{{ iniciales_nombre }}</span>
          </v-avatar>
        </v-col>
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
  </v-container>
</template>
<script>
import PerfilServices from "@/modules/perfil_usuario/services/PerfilServices";

export default {
  data: () => ({
    usuario: [],
    iniciales_nombre: "",
  }),
  methods: {},
  async created() {
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
    });
  },
};
</script>
