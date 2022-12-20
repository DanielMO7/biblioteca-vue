<template>
  <v-container class="responsive-header">
    <v-app-bar app color="#f8f9f9" flat class="flex-column">
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

        <!--Items de la Barra de Navegacion.-->
        <v-toolbar-items>
          <v-btn text>
            <router-link to="/" class="text-rutas">Inicio</router-link>
          </v-btn>

          <v-btn text>
            <router-link to="/ingresar" class="text-rutas"
              >Ingresar</router-link
            >
          </v-btn>

          <v-btn text>
            <router-link to="/insertar" class="text-rutas"
              >Registrarse</router-link
            >
          </v-btn>
        </v-toolbar-items>
      </v-toolbar>
    </v-app-bar>
  </v-container>
</template>
<script>
export default {
  name: "HeaderView",

  data: () => ({}),
};
</script>
<style scoped>
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
