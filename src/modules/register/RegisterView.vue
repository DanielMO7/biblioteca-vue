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
    <!-- Contenido en caso de que el usaurio no este logueado. -->
    <v-row v-if="!loading_register && !loading_skeleto">
      <v-col class="d-flex justify-center mb-5">
        <!-- Card que contiene el formulario de registro -->
        <v-card width="400" elevation="9">
          <v-toolbar class="d-flex justify-center" color="#a52a2a" dense dark>
            <v-card-title> REGISTRARSE </v-card-title>
          </v-toolbar>
          <!-- Formulario de Registro -->
          <v-form
            ref="formulario_registro"
            v-model="valid_formulario"
            lazy-validation
          >
            <v-container class="mt-5">
              <!-- Nombre -->
              <v-row>
                <v-col>
                  <v-text-field
                    v-model="nombre"
                    :rules="nombreRules"
                    label="Nombre"
                    required
                    outlined
                    dense
                  ></v-text-field>
                </v-col>
              </v-row>
              <!-- Documento -->
              <v-row>
                <v-col>
                  <v-text-field
                    v-model="documento"
                    :rules="documentoRules"
                    label="Documento"
                    required
                    outlined
                    dense
                    type="number"
                  ></v-text-field>
                </v-col>
              </v-row>
              <!-- Email -->
              <v-row>
                <v-col>
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
              <!-- Contraseña -->
              <v-row>
                <v-col>
                  <v-text-field
                    v-model="password"
                    :append-icon="
                      vista_icono_contrasena ? 'mdi-eye' : 'mdi-eye-off'
                    "
                    :rules="[reglas_password.required, reglas_password.min]"
                    :type="vista_icono_contrasena ? 'text' : 'password'"
                    name="input-10-1"
                    label="Contraseña"
                    hint="La contraseña debe contener 8 caracteres."
                    counter
                    outlined
                    dense
                    @click:append="
                      vista_icono_contrasena = !vista_icono_contrasena
                    "
                  ></v-text-field>
                </v-col>
              </v-row>
              <!-- Verificacion Contraseña -->
              <v-row>
                <v-col>
                  <v-text-field
                    v-model="password_verify"
                    :append-icon="
                      vista_icono_contrasena_verify ? 'mdi-eye' : 'mdi-eye-off'
                    "
                    :rules="[reglas_password.required, reglas_password.min]"
                    :type="vista_icono_contrasena_verify ? 'text' : 'password'"
                    name="input-10-1"
                    label="Confirmación Contraseña"
                    hint="La contraseña debe contener 8 caracteres."
                    counter
                    outlined
                    dense
                    @click:append="
                      vista_icono_contrasena_verify =
                        !vista_icono_contrasena_verify
                    "
                  ></v-text-field>
                </v-col>
              </v-row>
              <!-- Alerts que se muestran si encuentra un error del lado del backend -->
              <v-alert v-if="documento_validacion" outlined type="error" dense>
                ¡Este <strong>número de Documento</strong> ya se encuentra
                <strong>registrado</strong>!
              </v-alert>
              <v-alert v-if="email_validacion" outlined type="error" dense>
                ¡Este <strong>E-mail</strong> ya se encuentra
                <strong>registrado</strong>!
              </v-alert>
              <v-alert v-if="doc_email_validacion" outlined type="error" dense>
                El <strong>número de Documento</strong> y el
                <strong>E-mail</strong>
                ya se encuentran <strong>registrados</strong>!
              </v-alert>
              <v-alert v-if="password_validacion" outlined type="error" dense>
                Las contraseñas <strong>No son Iguales!</strong> por favor,
                <strong>verifícalas</strong>!
              </v-alert>
              <!-- Acciones del formulario -->
              <v-row class="d-flex justify-center">
                <v-card-actions>
                  <v-col>
                    <!-- Boton de Registro de Usuarios -->
                    <v-btn
                      :disabled="!valid_formulario"
                      color="#A52A2A"
                      class="white--text"
                      @click="RegistarUsuario"
                      :loading="loading_register"
                    >
                      Registrar
                    </v-btn>
                  </v-col>
                  <v-col>
                    <!-- Boton de Cancelacion del Registro -->
                    <v-btn
                      color="#A52A2A"
                      class="white--text"
                      @click="cancelar"
                    >
                      Cancelar
                    </v-btn>
                  </v-col>
                </v-card-actions>
              </v-row>
            </v-container>
          </v-form>
        </v-card>
      </v-col>
    </v-row>
    <!-- Contenido de loading mientras se procesa una peticion. -->
    <v-row v-else>
      <v-col class="d-flex justify-center mb-5">
        <!-- Card que muestra el loading del formulario. -->
        <v-card width="400" height="400" elevation="9">
          <v-toolbar class="d-flex justify-center" color="#a52a2a" dense dark>
            <v-card-title>REGISTRARSE</v-card-title>
          </v-toolbar>
          <v-card height="88%" class="d-flex align-center mb-5">
            <v-container>
              <v-card-text>
                <v-row>
                  <v-col class="d-flex justify-center"
                    ><v-progress-circular
                      :size="100"
                      :width="12"
                      color="#a52a2a"
                      indeterminate
                    ></v-progress-circular>
                  </v-col>
                </v-row>
                <v-row>
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
import RegisterServices from "./Services/RegisterServices";
import Swal from "sweetalert2";

export default {
  data: () => ({
    // Variables que muestran el icono de la contraseña.
    vista_icono_contrasena: false,
    vista_icono_contrasena_verify: false,

    // Validaciones:
    valid_formulario: true,
    email_validacion: false,
    documento_validacion: false,
    doc_email_validacion: false,
    password_validacion: false,

    // Loadings:
    loading_register: false,
    loading_skeleto: false,

    // Variables del Formulario:
    nombre: "",
    nombreRules: [(v) => !!v || "El nombre es requerido"],

    documento: "",
    documentoRules: [(v) => !!v || "El documento es requeridos"],

    password: "",
    passwordRules: [(v) => !!v || "La contraseña es requerida"],
    reglas_password: {
      required: (value) => !!value || "La contraseña es requerida.",
      min: (v) => v.length >= 8 || "Mínimo 8 caracteres",
    },

    password_verify: "",

    email: "",
    emailRules: [
      (v) => !!v || "E-mail es requerido",
      (v) => /.+@.+\..+/.test(v) || "E-mail es inválido",
    ],
  }),
  // Antes de montarsen los elementos se valida si el usuario esta logueado.
  beforeMount() {
    // Valida si existe un elemento en el local sotrage
    if (localStorage.acces_token) {
      // Si existe redirige al usuario al home.
      this.$router.push({
        name: "home",
      });
      this.loading_skeleto = true;
    }
  },
  methods: {
    /**
     * Verifica que las contraseñas sean iguales.
     */
    verificar_contrasena() {
      if (this.password == this.password_verify) {
        return true;
      }
      return false;
    },
    /**
     * Retorna a la ruta de inicio.
     */
    cancelar() {
      this.$router.go(-1);
    },
    /**
     * Permite verificar la informacion ingresada y envia la peticion
     * para el registro del nuevo usuario a crearce.
     */
    async RegistarUsuario() {
      // Verifica que el formulario tiene los campos llenos correctamente.
      if (this.$refs.formulario_registro.validate()) {
        this.loading_register = true;
        // Verifica que las contraseñas sean iguales.
        if (this.verificar_contrasena()) {
          /** Validar documentoEmail verifica si el documento y el email ya se encuentran registrados. */
          await RegisterServices.ValidarDocumentoEmail({
            documento: this.documento,
            email: this.email,
          })
            .then(async (response) => {
              // Status 4 || Significa que el documento y el email no se encuentra registrados.
              if (response.data.status == 4) {
                // Registrar Registra los datos del usuario ingresado en la base de datos.
                await RegisterServices.Registrar({
                  name: this.nombre,
                  email: this.email,
                  documento: this.documento,
                  rol: 2,
                  password: this.password,
                })
                  .then((response) => {
                    console.log(response);
                    // Status 1 || Todo salio correctamente y se registro el usaurio.
                    if (response.data.status == 1) {
                      this.loading_register = false;
                      Swal.fire({
                        position: "center",
                        icon: "success",
                        title: "¡Registro exitoso, por favor inicia sesión!",
                        showConfirmButton: false,
                        timer: 2500,
                      });
                      this.$router.push("/ingresar");
                    }
                  })
                  // Muestra el error en caso de que no se pudiera registrar.
                  .catch((error) => {
                    console.log(error);
                    this.loading_register = false;
                    Swal.fire({
                      position: "center",
                      icon: "error",
                      title: "¡Ah ocurrido un error en el registro!",
                      showConfirmButton: false,
                      timer: 1500,
                    });
                  });
                // Status 1 - Validacion del documento || El numero de documento y el email ya se encuentra registrado.
              } else if (response.data.status == 1) {
                this.doc_email_validacion = true;
                this.loading_register = false;
                setTimeout(() => (this.doc_email_validacion = false), 5000);
                // Status 2 - Validacion del documento || El numero de documento ya se encuentra registrado.
              } else if (response.data.status == 2) {
                this.documento_validacion = true;
                this.loading_register = false;
                setTimeout(() => (this.documento_validacion = false), 5000);
                // Status 2 - Validacion del documento || El email ya se encuentra registrado.
              } else if (response.data.status == 3) {
                this.email_validacion = true;
                this.loading_register = false;
                setTimeout(() => (this.email_validacion = false), 5000);
              }
            })
            // Error en caso de que la validacion del documento falle.
            .catch((error) => {
              console.log(error);
              this.loading_register = false;
              Swal.fire({
                position: "center",
                icon: "error",
                title: "Error al validar el documento",
                showConfirmButton: false,
                timer: 1500,
              });
            });
          this.loading_register = false;
          // Si las contraseñas no son iguales se muestra un alert.
        } else {
          this.password_validacion = true;
          this.loading_register = false;
          setTimeout(() => (this.password_validacion = false), 5000);
        }
        // Si la validacion del documento no es true entonces se desactiva el loading.
      } else {
        this.loading_register = false;
      }
    },
  },
};
</script>
