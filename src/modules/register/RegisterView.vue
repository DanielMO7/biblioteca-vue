<template>
  <v-container>
    <v-card class="flex" flat tile>
      <v-row style="justify-content: center; margin: 0px; margin-bottom: 50px">
        <v-card max-width="374">
          <v-img
            height="550"
            width="250"
            src="../../assets/pexels-karolina-grabowska-4963815.jpg"
          >
            <v-card-title class="justify-center" style="background: #a52a2a">
              <h5>Registrarse</h5>
            </v-card-title>
          </v-img>
        </v-card>
        <v-card width="400">
          <v-form ref="form" v-model="valid" lazy-validation>
            <v-container class="mt-3">
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
                    :rules="[rules.required, rules.min]"
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
                    :rules="[rules.required, rules.min]"
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
              <v-row class="d-flex justify-center">
                <v-card-actions>
                  <v-col>
                    <v-btn
                      :disabled="!valid"
                      color="#A52A2A"
                      class="white--text"
                      @click="validate"
                    >
                      Registrar
                    </v-btn>
                  </v-col>
                  <v-col>
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
      </v-row>
    </v-card>
  </v-container>
</template>
<script>
export default {
  data: () => ({
    vista_icono_contrasena: false,
    vista_icono_contrasena_verify: false,
    valid: true,
    nombre: "",
    nombreRules: [(v) => !!v || "Nombre es requerido"],

    documento: "",
    documentoRules: [(v) => !!v || "El documento es requeridos"],

    password: "",
    passwordRules: [(v) => !!v || "La contraseña es requerida"],

    password_verify: "",

    email: "",
    emailRules: [
      (v) => !!v || "E-mail es requerido",
      (v) => /.+@.+\..+/.test(v) || "E-mail es inválido",
    ],
    rules: {
      required: (value) => !!value || "La contraseña es requerida.",
      min: (v) => v.length >= 8 || "Mínimo 8 caracteres",
    },
    rules_verify: {
      verify: (password, password_verify) =>
        password != password_verify || "Las contraseñas no coinciden.",
    },
  }),

  methods: {
    validate() {
      this.$refs.form.validate();
    },

    verificar_contrasena() {
      if (this.password == this.password_verify) {
        return true;
      }
      return false;
    },
    cancelar() {
      this.$router.push("/");
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
