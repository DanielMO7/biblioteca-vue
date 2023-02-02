<template>
  <v-app>
    <!--Header-->
    <HeaderView
      @dialog_movile="dialog_movile"
      :usuarioLogueado="usuarioLogueado"
      @validar_Storage="validar_Storage"
      @cerrar_sesion="cerrar_sesion"
    />

    <v-main>
      <router-view />
    </v-main>

    <!--Footer-->
    <FooterView />

    <!-- Dialog que muestra el menu en dispositivos moviles -->
    <v-dialog
      v-model="dialog"
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition"
    >
      <v-card>
        <v-row class="d-flex">
          <v-row class="pa-1">
            <v-col cols="10">
              <router-link to="/" class="text-rutas-logo">
                <v-card-title class="color-bar">
                  <v-icon class="color-bar icon mr-1">auto_stories</v-icon>
                  <h2
                    style="
                      font-family: Helvetica, sans-serif;
                      font-weight: 900;
                      font-size: 30px;
                      text-transform: uppercase;
                    "
                  >
                    BIBLIOTECA
                  </h2>
                </v-card-title>
              </router-link>
            </v-col>
            <v-col cols="2">
              <v-card-actions>
                <v-btn icon color="red" @click="dialog = false">
                  <v-icon>mdi-close</v-icon>
                </v-btn>
              </v-card-actions>
            </v-col>
          </v-row>
        </v-row>
        <v-card-text>
          <v-list dense>
            <v-list-item-group color="#A52A2A">
              <v-list-item @click="rutas_redireccion('home')">
                <v-list-item-icon>
                  <v-icon>mdi-home</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title>Inicio</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              <v-list-item
                v-if="!usuarioLogueado"
                @click="rutas_redireccion('ingresar')"
              >
                <v-list-item-icon>
                  <v-icon>mdi-login</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title>Ingresar</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              <v-list-item
                v-if="!usuarioLogueado"
                @click="rutas_redireccion('insertar')"
              >
                <v-list-item-icon>
                  <v-icon>mdi-account-plus-outline</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title>Registrarse</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              <v-list-item v-if="usuarioLogueado" @click="cerrar_sesion()">
                <v-list-item-icon>
                  <v-icon>mdi-exit-to-app</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title>Cerrar Sesion</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list-item-group>
          </v-list>
          <v-col>
            <p>&copy; Daniel Mendez</p>
          </v-col>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-app>
</template>

<script>
import HeaderView from "./components/HeaderView.vue";
import FooterView from "./components/FooterView.vue";
import globalServices from "./components/services/globalServices";
import SecureLS from "secure-ls";
import Swal from "sweetalert2";

export default {
  name: "App",

  components: {
    HeaderView,
    FooterView,
  },

  data: () => ({
    dialog: false,
    usuarioLogueado: false,
  }),
  beforeUpdate() {
    this.validar_Storage();
  },
  methods: {
    dialog_movile() {
      this.dialog = true;
    },

    rutas_redireccion(item) {
      switch (item) {
        case "home":
          this.$router.push("/");
          this.dialog = false;
          break;
        case "ingresar":
          this.$router.push("/ingresar");
          this.dialog = false;
          break;
        case "insertar":
          this.$router.push("/insertar");
          this.dialog = false;
          break;
      }
    },
    async cerrar_sesion() {
      Swal.fire({
        icon: "info",
        title: "¿Continuar Cierre de Sesión?",
        showDenyButton: true,
        confirmButtonText: "Sí",
        denyButtonText: `Cancelar`,
      }).then(async (result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          await globalServices
            .CerrarSesion()
            .then((response) => {
              if (response.data.status == 1) {
                var ls = new SecureLS();
                ls.remove("acces_token");
                this.$router.push({
                  name: "ingresar",
                });
                this.validar_Storage();
                this.dialog = false;
              }
            })
            .catch((error) => {
              console.log(error);
            });
          Swal.fire("¡Sesión Cerrada con Éxito!", "", "success");
        }
      });
    },
    /** Valida que si existe el token de acceso */
    validar_Storage() {
      if (localStorage.acces_token) {
        this.usuarioLogueado = true;
      } else {
        this.usuarioLogueado = false;
      }
    },
  },
};
</script>
<style>
/**Estilos Para los Sweetalert2 */
.swal2-popup {
  font-family: Arial, Helvetica, sans-serif !important;
}
.swal2-styled.swal2-confirm {
  background: #1976d2 !important;
  background-color: #1976d2 !important;
}
.color-bar {
  color: #03363d !important;
}
.color-bar:hover {
  color: #a52a2a !important;
}
.text-rutas:link,
.text-rutas:visited,
.text-rutas-logo:link {
  text-decoration: none;
}
</style>
