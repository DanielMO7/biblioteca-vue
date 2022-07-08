<template>
  <v-app>
    <!--Header-->
    <HeaderView/>
   
    <v-main>
      <router-view/>
    </v-main>
    
    <!--Footer-->
      <FooterView/>
    
  </v-app>
</template>

<script>
import HeaderView from './components/HeaderView.vue';
import FooterView from './components/FooterView.vue';

export default {
  name: 'App',

  components: {
    HeaderView,
    FooterView,

  },

  data: () => ({
    //
  }),
};
</script>
