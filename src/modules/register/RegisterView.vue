<template>
    <v-container>
    <v-card
      class="flex"
      flat
      tile
      
    >
    <div>
    <v-row style="justify-content:center; margin: 0px; margin-bottom: 50px;">
        <v-card max-width="374">
            <v-img
            height="550"
            width="250"
            src="../../assets/pexels-karolina-grabowska-4963815.jpg"
            >
            <v-card-title class="justify-center" style="background: #A52A2A; ">
                <h5>Registrarce</h5> 
            </v-card-title>
            </v-img>
            
        </v-card>

        <v-card
        width="400"
        >
            
            <v-card-text style="margin-top: 78px">
            <br>
                <v-form
    ref="form"
    v-model="valid"
    lazy-validation
  >
  <v-text-field
      v-model="nombre"
      :rules="nameRules"
      label="Nombre"
      required
      outlined
      dense
    ></v-text-field>
    <v-text-field
      v-model="documento"
      :rules="documentoRules"
      label="Documento"
      required
      outlined
      dense
      hide-details
      single-line
      type="number"
    ></v-text-field>
    <br>
    <v-text-field
        width=""
      v-model="email"
      :rules="emailRules"
      label="E-mail"
      required
      outlined
      dense
    ></v-text-field>

    <v-text-field
      v-model="password"
      :counter="10"
      :rules="passwordRules"
      :type="show1 ? 'text' : 'password'"
      label="Contraseña"
      required
      outlined
      dense
    ></v-text-field>
    
<br>

<v-card-actions class="justify-center">
    <v-btn
      :disabled="!valid"
      color="#A52A2A"
      class="mr-4 white--text"
      @click="validate"
    >
      Ingresar
    </v-btn>
    <v-btn
      color="#A52A2A"
      class="mr-4 white--text"
      @click="validate"
      style="color: white;"
    >
      Cancelar
    </v-btn>

</v-card-actions>
  </v-form>
            </v-card-text>
        </v-card>
    
</v-row>
    </div>
    </v-card>
    </v-container>
</template>
<script>
  export default {
    data: () => ({
        
      valid: true,
      name: '',
      nameRules: [
        v => !!v || 'Nombre es requerido',
        v => /.+@.+\..+/.test(v) || 'Nombre es es invalido',
      ],
      documento: '',
      documentoRules: [
        v => !!v || 'E-mail es requerido',
        v => /.+@.+\..+/.test(v) || 'E-mail es invalido',
      ],
      password: '',
      passwordRules: [
        v => !!v || 'La contraseña es requerida',
        
      ],
      email: '',
      emailRules: [
        v => !!v || 'E-mail es requerido',
        v => /.+@.+\..+/.test(v) || 'E-mail es invalido',
      ],
      
      
    }),

    methods: {
      validate () {
        this.$refs.form.validate()
      },
    },
  }
</script>
<style scoped>
    h5 {
        text-align: center;
    font-size: 25px;
    font-style: unset;
    text-transform: uppercase;
    text-shadow: 1px 1px 1px rgb(59 59 59);
    background: #A52A2A;
    color: white;
}
</style>