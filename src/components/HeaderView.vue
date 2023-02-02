<template>
  <v-container class="responsive-header">
    <v-app-bar elevation="3" app color="#f8f9f9" flat class="flex-column">
      <!--Barra de Navegacion.-->
      <v-toolbar color="#f8f9f9" flat>
        <!--Titulo y logo-->
        <v-app-bar-nav-icon
          ><v-icon class="color-bar icon"
            >auto_stories</v-icon
          ></v-app-bar-nav-icon
        >

        <router-link to="/" class="text-rutas-logo">
          <v-toolbar-title class="color-bar">
            <h2>Biblioteca</h2>
          </v-toolbar-title>
        </router-link>

        <v-spacer></v-spacer>

        <!-- icono de navegacion responsive -->
        <v-app-bar-nav-icon
          class="reponsive_barra_navegacion"
          @click.stop="dialog_movile"
        ></v-app-bar-nav-icon>

        <!--Items de la Barra de Navegacion.-->
        <v-toolbar-items class="responsive_links">
          <v-btn text>
            <router-link to="/" class="text-rutas">Inicio</router-link>
          </v-btn>

          <v-btn v-if="!usuarioLogueado" text>
            <router-link to="/ingresar" class="text-rutas"
              >Ingresar</router-link
            >
          </v-btn>

          <v-btn v-if="!usuarioLogueado" text>
            <router-link to="/insertar" class="text-rutas"
              >Registrarse</router-link
            >
          </v-btn>
          <v-tooltip v-if="usuarioLogueado" bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-btn @click="cerrar_sesion" text v-bind="attrs" v-on="on">
                <v-icon>mdi-exit-to-app</v-icon>
              </v-btn>
            </template>
            <span>Cerrar Sesion</span>
          </v-tooltip>
        </v-toolbar-items>
      </v-toolbar>
    </v-app-bar>
  </v-container>
</template>
<script>
// import GlobalServices from "../components/services/globalServices";
// import SecureLS from "secure-ls";

export default {
  name: "HeaderView",
  // Verifica si el usuario se encuentra logueado
  props: ["usuarioLogueado"],

  data: () => ({
    dialog: false,
  }),
  beforeMount() {
    this.$emit("validar_Storage");
  },
  methods: {
    dialog_movile() {
      this.$emit("dialog_movile");
    },
    async cerrar_sesion() {
      this.$emit("cerrar_sesion");
    },
  },
};
</script>
<style scoped>
.reponsive_barra_navegacion {
  display: none;
}
@media (max-width: 750px) {
  .reponsive_barra_navegacion {
    display: contents;
  }
  .responsive_links {
    display: none;
  }
}
.color-bar {
  color: #03363d !important;
}
.color-bar:hover {
  color: #a52a2a !important;
}
.icon {
  font-size: 32px !important;
}
h2 {
  font-family: Helvetica, sans-serif;
  font-weight: 900;
  font-size: 30px;
  text-transform: uppercase;
}
.text-rutas {
  text-decoration: none;
  color: black !important;
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  padding: 15px;
}
.text-rutas:link,
.text-rutas:visited,
.text-rutas-logo:link {
  text-decoration: none;
}
</style>
