<template>
  <v-container>
    <v-card
      class="mx-auto d-flex flex-column justify-space-between align-center"
      id="banner"
    >
      <v-row>
        <v-col class="d-flex align-center">
          <h1 class="titulo_prueba">{{ this.frase_home }}</h1>
        </v-col>
      </v-row>
    </v-card>
    <div></div>
    <v-card class="justify-center mb-6" flat tile>
      <v-card-title class="justify-center" id="titulo-footer"
        >ULTIMOS ARTICULOS</v-card-title
      >
      <br />
      <v-card elevation="2" outlined tile>
        <v-card-title class="justify-space-between"
          >Titulo Articulo
          <p class="card-data">Fecha: 12 dic Categoria: Pruebas</p>
        </v-card-title>

        <v-card-text
          >Lorem ipsum dolor sit amet consectetur, adipisicing elit.
          Repellendus, ipsa delectus asperiores assumenda vel dolore rem
          provident amet fugiat et enim veniam natus saepe culpa quia earum
          suscipit dolorem consectetur. Officia fugiat ad optio aut sunt natus
          recusandae distinctio provident numquam enim. Culpa, architecto
          consequatur possimus quasi quis harum dignissimos maxime perferendis
          debitis mollitia suscipit excepturi, explicabo, autem at fugiat! Harum
          tenetur, aliquid magni nihil unde, similique quis sit sapiente
          incidunt itaque velit perferendis numquam id consequatur perspiciatis
          inventore voluptatum eaque accusamus nostrum odit error sequi dolores
          debitis asperiores. Perspiciatis!y</v-card-text
        >
      </v-card>
      <br />

      <v-card elevation="2" outlined tile>
        <v-card-title class="justify-space-between"
          >Titulo Articulo
          <p class="card-data">Fecha: 12 dic Categoria: Pruebas</p>
        </v-card-title>
        <v-card-text
          >Lorem ipsum dolor sit amet consectetur, adipisicing elit.
          Repellendus, ipsa delectus asperiores assumenda vel dolore rem
          provident amet fugiat et enim veniam natus saepe culpa quia earum
          suscipit dolorem consectetur. Officia fugiat ad optio aut sunt natus
          recusandae distinctio provident numquam enim. Culpa, architecto
          consequatur possimus quasi quis harum dignissimos maxime perferendis
          debitis mollitia suscipit excepturi, explicabo, autem at fugiat! Harum
          tenetur, aliquid magni nihil unde, similique quis sit sapiente
          incidunt itaque velit perferendis numquam id consequatur perspiciatis
          inventore voluptatum eaque accusamus nostrum odit error sequi dolores
          debitis asperiores. Perspiciatis!y</v-card-text
        >
      </v-card>
    </v-card>
  </v-container>
</template>
<script>
import ServicesHome from "./services/ServicesHome";

export default {
  data: () => ({
    frase_home: "",
  }),
  async created() {
    // ServiceHome || Trae las fraces que se muestran en el home principal.
    await ServicesHome.FrasesHome()
      .then((response) => {
        console.log(response.data);
        // Funcion que toma un index random del array que contiene la frase.
        this.frase_home =
          response.data[Math.floor(Math.random() * response.data.length)].frase;
      })
      .catch((error) => {
        console.log(error);
      });
  },
  methods: {},
};
</script>
<style scoped>
#banner {
  width: 100%;
  height: 200px;
  box-shadow: 0px 0px 2px gray;
  background: url(../../assets/books-g9d4040271_1920.jpg);
  background-position: -341px -395px;
  margin-top: 24px;
  animation: backBanner 5s linear;
  overflow: hidden;
}

@keyframes backBanner {
  0% {
    background-position: 0px 0px;
  }

  100% {
    background-position: -341px -395px;
  }
}
#banner .titulo_prueba {
  display: block;
  width: 100%;
  font-family: "Verdana, Geneva, Tahoma, sans-serif";
  color: white;
  /* font-size: 47px; */
  text-transform: uppercase;
  font-weight: normal;
  margin: 20px auto;
  text-shadow: 2px 2px 1px black;
  text-align: center;
  animation: showText 5s linear;
}
@keyframes showText {
  0% {
    transform: translateY(-500%) scale(1, 1);
    opacity: 1;
  }

  100% {
    transform: translateX(0%) scale(1, 1);
    text-shadow: 2px 2px 1px black;
    color: white;
    opacity: 1;
  }
}
#titulo-footer {
  width: 100%;
  height: 40px;
  line-height: 3px;
  text-align: center;
  text-transform: uppercase;
  font-size: 17px;
  font-weight: normal;
  letter-spacing: 2px;
  background: #a52a2a;
  box-shadow: 0px 1px 0px #383d3e, 1px 2px 0px #383d3e, 2px 3px 0px #383d3e,
    3px 4px 0px #383d3e;
  margin-top: 58px;
  color: white;
}

.card-data {
  background: #393d3f;
  color: white;
  line-height: 30px;
  margin: -16px;
  padding: 4px;
  font-size: 13px;
  margin-top: -42px;
  border-radius: 0px 0px 0px 5px;
}
@media (max-width: 444px) {
  #banner .titulo_prueba {
    font-size: 24px;
  }
}
</style>
