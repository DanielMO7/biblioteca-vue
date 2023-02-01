<template>
  <v-container>
    <v-row>
      <v-col class="d-flex justify-center mb-5">
        <v-card width="400" height="400" elevation="9">
          <v-toolbar class="d-flex justify-center" color="#a52a2a" dense dark>
            <v-card-title>INICIAR SESION</v-card-title>
          </v-toolbar>
          <v-card height="88%" class="d-flex align-center mb-5">
            <v-container>
              <v-form ref="form" v-model="valid" lazy-validation>
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
  </v-container>
</template>
<script>
import Swal from "sweetalert2";
import Services from "./services/LoginServices";
import SecureLS from "secure-ls";
export default {
  data: () => ({
    valid: true,

    vista_icono_contrasena: false,
    no_registrado: false,
    registrado: false,

    password: "12345678",
    passwordRules: [(v) => !!v || "La contraseña es requerida"],
    email: "daniel@gmail.com",
    emailRules: [
      (v) => !!v || "E-mail es requerido",
      (v) => /.+@.+\..+/.test(v) || "E-mail es invalido",
    ],

    reglas_password: {
      required: (value) => !!value || "La contraseña es requerida.",
      min: (v) => v.length >= 8 || "Mínimo 8 caracteres",
    },
  }),

  methods: {
    validate() {
      this.$refs.form.validate();
    },
    cancelar() {
      this.$router.push("/");
    },
    async ingresar() {
      await Services.IniciarSesion({
        email: this.email,
        password: this.password,
      })
        .then((response) => {
          if (response.data.status == 2) {
            this.no_registrado = true;
            this.loading_register = false;
            setTimeout(() => (this.no_registrado = false), 5000);
          }
          if (response.data.status == 1) {
            this.registrado = true;
            this.loading_register = false;
            setTimeout(() => (this.registrado = false), 5000);
          }
          if (response.data.status == 1) {
            var ls = new SecureLS();
            ls.set("acces_token", { data: response.data.access_token });
            this.$router.push("/");
          }
        })
        .catch((error) => {
          Swal.fire("Ah ocurrido un error, por favor verifica la información.");
          console.log(error);
        });
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
