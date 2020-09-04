<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >


      <v-spacer></v-spacer>


    </v-app-bar>

    <v-main>
      <Login/>
    </v-main>
  </v-app>
</template>

<script>
import Login from './components/Login';

export default {
  name: 'App',

  components: {
    Login,
  },

  data: () => ({
    //
  }),
};
</script>
