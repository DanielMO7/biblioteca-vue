<template>
    <v-footer
    padless>
    <!--Cards del Footer-->
    <v-card
      class="flex"
      flat
      tile
    >
        <div>
            <v-card
          class="mb-6 "
          flat
          tile
          dark
        >
        <v-row style="'justify-content:center;'">
            <!--Card Menu-->
        <v-col cols="12" sm="6" lg="4">
            <v-card
          class="mx-auto "
          max-width="400"
          width="318"
          height="300"
          >
                  <v-card-title id="titulo-footer">Menu</v-card-title>
      
                  <v-card-text id="footer">
                      <ul>
                          <li>
                              <router-link to="/" class="text-rutas-footer">Inicio</router-link>
                          </li>
                          <li>
                              <router-link to="/about" class="text-rutas-footer">Ingresar</router-link>
                          </li>
                          <li>
                              <router-link to="/" class="text-rutas-footer">Registrarce</router-link>
                          </li>
                      </ul>
                  </v-card-text>
              </v-card>
        </v-col>
        <!--Card Donde Estamos-->
        <v-col cols="12" sm="6" lg="4">
            <v-card
       class="mx-auto"
       max-width="400"
       width="318"
       height="300"
       >
               <v-card-title id="titulo-footer">¿DONDE ESTAMOS?</v-card-title>
   
               <v-card-text id="footer">
                   <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3975.786395626372!2d-75.68515578480925!3d4.80670044206668!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e38873c6960ab4f%3A0x623728cab0c2291b!2sRED%20MEDICA%20VITAL!5e0!3m2!1ses!2sco!4v1657211534672!5m2!1ses!2sco" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade">
                   </iframe>
   
               </v-card-text>
           </v-card>

        </v-col>
    <!--Card Autor-->
    <v-col cols="12" sm="6" lg="4">
        <v-card
   class="mx-auto"
   max-width="400"
   width="318"
   height="300"
   >
           <v-card-title id="titulo-footer">AUTOR</v-card-title>

           <v-card-text id="footer">
              <p id="copy-name">&copy; Daniel Mendez </p>
              <v-btn
                   v-for="icon in icons"
                   :key="icon"
                   class="mx-4"
                   dark
                   icon
                   >
         <v-icon size="24px">
           {{ icon }}
         </v-icon>
       </v-btn>
           </v-card-text>
       </v-card>

    </v-col>
        </v-row>
    </v-card>
  </div>
    </v-card>
</v-footer>
</template>
<script>
export default {
  name: 'FooterView',
  
  data: () => ({
      icons: [
        'mdi-facebook',
        'mdi-twitter',
        'mdi-linkedin',
        'mdi-instagram',
      ],
    }),
};
</script>
<style scoped>
#titulo-footer {
    width: 100%;
    height: 40px;
    line-height: 3px;
    text-align: center;
    text-transform: uppercase;
    font-size: 17px;
    font-weight: normal;
    letter-spacing: 2px;
    background: #A52A2A;
    box-shadow: 0px 1px 0px #383d3e, 1px 2px 0px #383d3e, 2px 3px 0px #383d3e, 3px 4px 0px #383d3e;
    margin-top: 5px;
    color: white;
}

.text-rutas-footer{
    color:white !important;
}
.text-rutas-footer:link, .text-rutas-footer:visited, .text-rutas-logo-footer:link{
        text-decoration: none;
      } 
#footer ul {
    text-align: left;
    margin: 17px;
    font-size: 14px;
    list-style: none;
}

#footer ul li {
    margin-top: 10px;
    padding: 5px;
    border-bottom: 1px solid #ccc;
}

#footer ul li a {
    height: 40px;
    transition: all 300ms;
}

#footer ul li:hover a {
    padding-left: 40px;
    color: white;
    width: 100%;
}
#footer a {
    text-decoration: none;
    color: #f7f7f7;
    transition: all 300ms;
}

#footer a:hover {
    color: #c52929 !important;
    transform: scale(1.2, 1.2);
    /*Pequeña animacion en las letras.*/

}

#footer iframe {
    width: 100%;
    height: 70%;
    margin-top: 10px;
    border-radius: 5px solid white;
    box-shadow: 0px 0px 5px gray;

}

#copy-name{
    font-size: 20px;
    margin-top: 14px;
    text-align: center;
    color: white;
}
.v-card__title {
    justify-content: space-around;
}
</style>