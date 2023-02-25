<template>
  <v-container>
    <!-- Esqueleto en caso de que el usuario este logueado -->
    <v-skeleton-loader
      v-if="loading_skeleto"
      class="mx-auto"
      max-width="400"
      height="400"
      type="card"
    ></v-skeleton-loader>
    <!-- Contenido del login si el usuario no se encuentra autenticado. -->
    <v-row v-if="!loading_login && !loading_skeleto">
      <v-col class="d-flex justify-center mb-5">
        <!-- Card de Inicio de Sesion -->
        <v-card width="400" height="400" elevation="9">
          <v-toolbar class="d-flex justify-center" color="#a52a2a" dense dark>
            <v-card-title>INICIAR SESION</v-card-title>
          </v-toolbar>
          <v-card height="88%" class="d-flex align-center mb-5">
            <v-container>
              <v-form ref="form" v-model="valid" lazy-validation>
                <v-row>
                  <v-col>
                    <!-- Campo Email -->
                    <v-text-field
                      width=""
                      v-model="email"
                      :rules="emailRules"
                      label="E-mail"
                      required
                      outlined
                      dense
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col>
                    <!-- Campo contraseña -->
                    <v-text-field
                      v-model="password"
                      :append-icon="
                        vista_icono_contrasena ? 'mdi-eye' : 'mdi-eye-off'
                      "
                      :rules="[reglas_password.required]"
                      :type="vista_icono_contrasena ? 'text' : 'password'"
                      name="input-10-1"
                      label="Contraseña"
                      outlined
                      dense
                      @click:append="
                        vista_icono_contrasena = !vista_icono_contrasena
                      "
                    ></v-text-field>
                  </v-col>
                </v-row>
                <!-- Alerts que muestran algún error en la peticion del usuario. -->
                <v-alert v-if="no_registrado" dense outlined type="error">
                  El usuario <strong>no se encuentra</strong> registrado, por
                  favor, <strong>revisa</strong> la informacion.
                </v-alert>
                <v-alert
                  v-if="registrado"
                  v-model="registrado"
                  dense
                  outlined
                  type="error"
                >
                  Contraseña <strong>Incorrecta</strong>, por favor,
                  <strong>verificala</strong>.
                </v-alert>
                <v-card-actions class="justify-center">
                  <v-btn
                    :disabled="!valid"
                    color="#A52A2A"
                    class="mr-4 white--text"
                    @click="ingresar"
                  >
                    Ingresar
                  </v-btn>
                  <v-btn
                    color="#A52A2A"
                    class="mr-4 white--text"
                    @click="cancelar"
                    style="color: white"
                  >
                    Cancelar
                  </v-btn>
                </v-card-actions>
              </v-form>
            </v-container>
          </v-card>
        </v-card>
      </v-col>
    </v-row>
    <!-- Contenido del login que muestra una barra de carga mientras se procesa una peticion. -->
    <v-row v-else>
      <v-col class="d-flex justify-center mb-5">
        <!-- Card de loading -->
        <v-card width="400" height="400" elevation="9">
          <v-toolbar class="d-flex justify-center" color="#a52a2a" dense dark>
            <v-card-title>INICIAR SESION</v-card-title>
          </v-toolbar>
          <v-card height="88%" class="d-flex align-center mb-5">
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
                    <v-card-title>Cargando...</v-card-title>
                  </v-col>
                </v-row>
              </v-card-text>
            </v-container>
          </v-card>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import Swal from "sweetalert2";
import Services from "./services/LoginServices";
import SecureLS from "secure-ls";
import PerfilServices from "@/modules/perfil_usuario/services/PerfilServices";

export default {
  // Propiedad que valida si el usuario esta logueado
  props: ["usuarioLogueado"],
  data: () => ({
    // Valid del Formulario
    valid: true,

    // Loadings
    loading_login: false,
    loading_skeleto: false,

    vista_icono_contrasena: false,

    // Variables de los alerts por si se presenta algún error.
    no_registrado: false,
    registrado: false,

    // Variables Formulario y Reglas de cada uno
    password: "12345678",
    passwordRules: [(v) => !!v || "La contraseña es requerida"],
    reglas_password: {
      required: (value) => !!value || "La contraseña es requerida.",
    },

    email: "daniel@gmail.com",
    emailRules: [
      (v) => !!v || "E-mail es requerido",
      (v) => /.+@.+\..+/.test(v) || "E-mail es invalido",
    ],
  }),
  // Antes de mostrar los elementos, valida si el usuario esta logueado.
  beforeMount() {
    // Verifica si existe un token de acceso
    if (localStorage.acces_token) {
      // Si existe retorna al usuario home
      this.$router.push({
        name: "home",
      });
      this.loading_skeleto = true;
    }
  },
  methods: {
    // Envia al usuario al inicio
    cancelar() {
      this.$router.go(-1);
    },
    // Funcion que pemite iniciar sesion.
    async ingresar() {
      this.loading_login = true;
      // Valida que la informacion del fomulario este correctamente.
      if (this.$refs.form.validate()) {
        // Servicio que envia la peticion de inicio de sesion con las credenciales necesarias.
        await Services.IniciarSesion({
          email: this.email,
          password: this.password,
        })
          .then(async (response) => {
            this.loading_register = false;
            // Status 0 || El usuario no se encuentra registrado.
            if (response.data.status == 2) {
              // Se muestra un alert por 5 segundos.
              this.no_registrado = true;
              setTimeout(() => (this.no_registrado = false), 5000);
            }
            // Status 2 || El usuario escribio mal la contraseña.
            if (response.data.status == 0) {
              // Se muestra un alert por 5 segundos.
              this.registrado = true;
              setTimeout(() => (this.registrado = false), 5000);
            }
            // Status 1 || El usuario inicio sesion correctamente.
            if (response.data.status == 1) {
              // Se crea una variable de encriptacion del local storage.
              var ls = new SecureLS();
              // Se crea un nuevo elemento del LS con la key y el valor a encriptar, en este caso el
              // token que se nos envia en el reponse.
              ls.set("acces_token", { data: response.data.access_token });
              // Trae los datos del usuario
              await PerfilServices.PerfilUsuario().then((response) => {
                let data_user = response.data.data;
                //charAt(0) | Selecciona el primer caracter de un string.
                let iniciales_nombre = data_user.name.charAt(0);
                // Verificamos el nombre de cada rol
                if (data_user.rol == 1) {
                  data_user.rol_nombre = "Administrador";
                } else if (data_user.rol == 2) {
                  data_user.rol_nombre = "Usuario";
                }
                data_user.iniciales_nombre = iniciales_nombre;
                // Asignamos los datos al local storage encriptado
                ls.set("profile_user", {
                  data: {
                    nombre: data_user.name,
                    documento: data_user.documento,
                    email: data_user.email,
                    rol: data_user.rol,
                    rol_nombre: data_user.rol_nombre,
                    iniciales_nombre: data_user.iniciales_nombre,
                  },
                });
              });
              Swal.fire({
                position: "center",
                icon: "success",
                title: "¡Bienvenido!",
                showConfirmButton: false,
                timer: 1500,
              });

              // Se envia al usuario al home despues de loguearse.
              setTimeout(() => this.$router.push("/"), 1500);
            }
            this.loading_login = false;
          })
          .catch((error) => {
            Swal.fire(
              "Ah ocurrido un error, por favor verifica la información."
            );
            console.log(error);

            this.loading_login = false;
            // Error del lado del servidor.
          });
      } else {
        // Desactiva el loading.
        this.loading_login = false;
      }
    },
  },
};
</script>
<style scoped>
h5 {
  text-align: center;
  font-size: 25px;
  font-style: unset;
  text-transform: uppercase;
  text-shadow: 1px 1px 1px rgb(59 59 59);
  background: #a52a2a;
  color: white;
}
</style>
