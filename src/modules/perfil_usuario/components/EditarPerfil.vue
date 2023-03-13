<template>
  <!-- Card que contiene el formulario de registro -->
  <v-card v-if="!loading_register">
    <v-toolbar class="d-flex justify-center" color="#a52a2a" dense dark>
      <v-card-title> Editar Perfil </v-card-title>
    </v-toolbar>
    <!-- Formulario de Registro -->
    <v-form ref="formulario_edit" v-model="valid_formulario" lazy-validation>
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
        <!-- Alerts que se muestran si encuentra un error del lado del backend -->
        <v-alert v-if="documento_validacion" outlined type="error" dense>
          ¡Este <strong>número de Documento</strong> ya se encuentra
          <strong>registrado</strong>!
        </v-alert>
        <v-alert v-if="email_validacion" outlined type="error" dense>
          ¡Este <strong>E-mail</strong> ya se encuentra
          <strong>registrado</strong>!
        </v-alert>
        <v-alert v-if="modificacion_validacion" outlined type="info" dense>
          ¡No has <strong>modificado ningún elemento,</strong> realízalo para
          poder <strong>editar</strong>!
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
                @click="EditarUsuario"
                :loading="loading_register"
              >
                Editar
              </v-btn>
            </v-col>
            <v-col>
              <!-- Boton de Cancelacion del Registro -->
              <v-btn color="#A52A2A" class="white--text" @click="cancelar">
                Cancelar
              </v-btn>
            </v-col>
          </v-card-actions>
        </v-row>
      </v-container>
    </v-form>
  </v-card>
  <!-- Logadin del editar perfil -->
  <v-card v-else>
    <v-toolbar class="d-flex justify-center" color="#a52a2a" dense dark>
      <v-card-title>Editar Perfil</v-card-title>
    </v-toolbar>
    <v-card class="d-flex align-center">
      <v-container>
        <v-card-text>
          <v-row>
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
            <v-col class="d-flex justify-center">
              <v-card-title>Editando Perfil...</v-card-title>
            </v-col>
          </v-row>
        </v-card-text>
      </v-container>
    </v-card>
  </v-card>
</template>
<script>
import PerfilServices from "@/modules/perfil_usuario/services/PerfilServices";
import SecureLS from "secure-ls";
import Swal from "sweetalert2";

export default {
  props: ["usuario"],
  data: () => ({
    loading_register: false,
    valid_formulario: true,
    email_validacion: false,
    documento_validacion: false,
    modificacion_validacion: false,
    //doc_email_validacion: false,

    nombre: "",
    nombreRules: [(v) => !!v || "El nombre es requerido"],

    documento: "",
    documentoRules: [(v) => !!v || "El documento es requeridos"],

    email: "",
    emailRules: [
      (v) => !!v || "E-mail es requerido",
      (v) => /.+@.+\..+/.test(v) || "E-mail es inválido",
    ],
  }),
  created() {
    this.nombre = this.usuario.nombre;
    this.documento = this.usuario.documento;
    this.email = this.usuario.email;
  },
  methods: {
    validate() {
      this.$refs.form.validate();
    },
    async EditarUsuario() {
      if (
        this.nombre != this.usuario.nombre ||
        this.documento != this.usuario.documento ||
        this.email != this.usuario.email
      ) {
        if (this.$refs.formulario_edit.validate()) {
          Swal.fire({
            title: "Editar Información",
            text: "¿Seguro que quieres cambiar tu información?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Sí",
            cancelButtonText: "No",
          }).then(async (result) => {
            if (result.isConfirmed) {
              this.loading_register = true;

              await PerfilServices.EditarPerfil({
                name: this.nombre,
                email: this.email,
                documento: this.documento,
                id: this.usuario.id_usuario,
              })
                .then((response) => {
                  this.loading_register = false;
                  if (response.data.status == 2) {
                    this.email_validacion = true;
                    setTimeout(() => (this.email_validacion = false), 5000);
                  }
                  if (response.data.status == 3) {
                    this.documento_validacion = true;
                    setTimeout(() => (this.documento_validacion = false), 5000);
                  }
                  if (response.data.status == 1) {
                    let ls = new SecureLS();
                    ls.set("profile_user", {
                      data: {
                        nombre: this.nombre,
                        documento: this.documento,
                        email: this.email,
                        rol: this.usuario.rol,
                        rol_nombre: this.usuario.rol_nombre,
                        iniciales_nombre: this.usuario.iniciales_nombre,
                        id_usuario: this.usuario.id_usuario,
                      },
                    });
                    this.$emit("actualizarDatos");
                    this.$emit("verificarStorage");
                    Swal.fire({
                      position: "center",
                      icon: "success",
                      title: "¡Cambios realizados correctamente!",
                      showConfirmButton: false,
                      timer: 1500,
                    });
                    this.$emit("CerrarDialog");
                  }
                })
                .catch((err) => {
                  console.log(err.data);
                  this.loading_register = false;
                });
            }
          });
        }
      } else {
        this.modificacion_validacion = true;
        setTimeout(() => (this.modificacion_validacion = false), 5000);
      }
    },
    cancelar() {
      this.$emit("CerrarDialog");
      this.nombre = this.usuario.nombre;
      this.documento = this.usuario.documento;
      this.email = this.usuario.email;
    },
  },
};
</script>
