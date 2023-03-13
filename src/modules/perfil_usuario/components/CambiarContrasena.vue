<template>
  <v-card v-if="!loading_contrasena">
    <v-toolbar class="d-flex justify-center" color="#a52a2a" dense dark>
      <v-card-title> Cambiar Contraseña </v-card-title>
    </v-toolbar>
    <v-container class="mt-5">
      <v-form ref="formulario_edit" v-model="valid_formulario" lazy-validation>
        <v-text-field
          v-model="anterior_contrasena"
          label="Anterior Contraseña"
          :append-icon="
            vista_icono_contrasena_anterior ? 'mdi-eye' : 'mdi-eye-off'
          "
          :rules="[contrasenaRules.required]"
          :type="vista_icono_contrasena_anterior ? 'text' : 'password'"
          outlined
          dense
          @click:append="
            vista_icono_contrasena_anterior = !vista_icono_contrasena_anterior
          "
          required
        >
        </v-text-field>
        <v-text-field
          v-model="nueva_contrasena"
          :append-icon="vista_icono_contrasena ? 'mdi-eye' : 'mdi-eye-off'"
          :rules="[contrasenaRules.required, contrasenaRules.min]"
          :type="vista_icono_contrasena ? 'text' : 'password'"
          name="input-10-1"
          label="Nueva Contraseña"
          hint="La contraseña debe contener minimo 8 caracteres."
          counter
          outlined
          dense
          @click:append="vista_icono_contrasena = !vista_icono_contrasena"
          required
        >
        </v-text-field>
        <v-text-field
          v-model="confirmacion_nueva_contrasena"
          :append-icon="
            vista_icono_contrasena_verify ? 'mdi-eye' : 'mdi-eye-off'
          "
          :rules="[contrasenaRules.required, contrasenaRules.min]"
          :type="vista_icono_contrasena_verify ? 'text' : 'password'"
          label="Confirmacion Contraseña"
          outlined
          dense
          @click:append="
            vista_icono_contrasena_verify = !vista_icono_contrasena_verify
          "
          required
        >
        </v-text-field>
        <!-- Alerts que se muestran si encuentra un error del lado del backend -->
        <v-alert v-if="error_database" outlined type="error" dense>
          ¡Ah ocurrido un <strong>error en el sistema</strong> por favor,
          intentalo <strong>más tarde</strong>!
        </v-alert>
        <v-alert
          v-if="contrasena_iguales_validacion"
          outlined
          type="info"
          dense
        >
          ¡Las contraseñas de verificación <strong>no son iguales</strong> por
          favor, <strong>revísalas</strong>!
        </v-alert>
        <v-alert
          v-if="anterior_contrasena_validacion"
          outlined
          type="error"
          dense
        >
          ¡La contraseña anterior<strong> NO es correcta</strong>, por favor
          <strong>revísala</strong>!
        </v-alert>
      </v-form>
      <v-card-actions>
        <v-col>
          <v-btn
            :disabled="!valid_formulario"
            color="#A52A2A"
            class="white--text"
            @click="CambiarContrasena"
            :loading="loading_contrasena"
          >
            Cambiar Contraseña
          </v-btn>
        </v-col>
        <v-col>
          <v-btn
            @click="$emit('CerrarDialog')"
            color="#A52A2A"
            class="white--text"
          >
            Cancelar
          </v-btn>
        </v-col>
      </v-card-actions>
    </v-container>
  </v-card>
  <v-card v-else>
    <v-toolbar class="d-flex justify-center" color="#a52a2a" dense dark>
      <v-card-title> Cambiar Contraseña </v-card-title>
    </v-toolbar>
    <v-card class="d-flex align-center mt-5">
      <v-container>
        <v-card-text>
          <v-row>
            <v-col class="d-flex justify-center"
              ><v-progress-circular
                :size="85"
                :width="9"
                color="#a52a2a"
                indeterminate
              ></v-progress-circular>
            </v-col>
          </v-row>
          <v-row>
            <v-col class="d-flex justify-center">
              <v-card-title>Cambiando Contraseña...</v-card-title>
            </v-col>
          </v-row>
        </v-card-text>
      </v-container>
    </v-card>
  </v-card>
</template>
<script>
import Swal from "sweetalert2";
import PerfilServices from "../services/PerfilServices";
import globalServices from "@/components/services/globalServices";
import SecureLS from "secure-ls";
export default {
  props: ["usuario"],
  data: () => ({
    loading_contrasena: false,

    anterior_contrasena_validacion: false,
    contrasena_iguales_validacion: false,
    error_database: false,

    valid_formulario: true,

    nueva_contrasena: "",
    confirmacion_nueva_contrasena: "",
    anterior_contrasena: "",

    contrasenaRules: {
      required: (value) => !!value || "Contraseña es requerida.",
      min: (v) => v.length >= 8 || "Mínimo 8 caracteres",
    },
    vista_icono_contrasena: false,
    vista_icono_contrasena_verify: false,
    vista_icono_contrasena_anterior: false,
  }),
  methods: {
    async CambiarContrasena() {
      if (this.$refs.formulario_edit.validate()) {
        Swal.fire({
          title: "¿Seguro quieres cambiar tu contraseña?",
          text: "Recuerda que si la cambias debes volver a iniciar sesión.",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Sí",
          cancelButtonText: "No",
        }).then(async (result) => {
          if (result.isConfirmed) {
            this.loading_contrasena = true;
            await PerfilServices.EditarContrasena({
              contrasena_nueva: this.nueva_contrasena,
              contrasena_verificar: this.confirmacion_nueva_contrasena,
              contrasena_anterior: this.anterior_contrasena,
              id: this.usuario.id_usuario,
            })
              .then(async (response) => {
                if (response.data.status == 0) {
                  // Se accede al global services que contiene los accesos necesario para entrar a la ruta de cierre de seion.
                  await globalServices
                    .CerrarSesion()
                    .then((response) => {
                      // Status 1 || Todo salio correctamente
                      if (response.data.status == 1) {
                        // Llamamos la libreria de encriptacion y eliminamos el token de acceso.
                        var ls = new SecureLS();
                        ls.remove("acces_token");
                        Swal.fire({
                          position: "center",
                          icon: "success",
                          title: "¡Contraseña Cambiada Correctamente!",
                          showConfirmButton: false,
                          timer: 1500,
                        });
                        // Se envia al usuario a la ruta de ingreso.
                        this.$router.push({
                          name: "ingresar",
                        });
                        // Se vuelve a validar el storage para mostrar los elementos que se bloquean al iniciar sesion.
                        this.validar_Storage();
                        this.$$emit("CerrarDialog");
                      }
                    })
                    // Muestra en consola algún error que se presente en el cierre de sesion.
                    .catch((error) => {
                      console.log(error);
                      this.dialog_loading = false;
                    });
                } else if (response.data.status == 1) {
                  this.anterior_contrasena_validacion = true;
                  setTimeout(
                    () => (this.anterior_contrasena_validacion = false),
                    5000
                  );
                } else if (response.data.status == 2) {
                  this.contrasena_iguales_validacion = true;
                  setTimeout(
                    () => (this.contrasena_iguales_validacion = false),
                    5000
                  );
                }
                this.loading_contrasena = false;
              })
              .catch((err) => {
                console.log(err.response.data);
                if (err.response.data.status == 1) {
                  this.error_database = true;
                  setTimeout(() => (this.error_database = false), 5000);
                } else if (err.response.data.status == 0) {
                  console.log(err.data);
                }
                this.loading_contrasena = false;
              });
          }
        });
      }
    },
  },
};
</script>
