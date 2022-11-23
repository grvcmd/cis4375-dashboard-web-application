<script setup>
import { RouterLink, RouterView } from 'vue-router'
import navBarVue from './components/navBar.vue';
</script>

<template>
  <head>
    <head>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com">
    <link href="https://fonts.googleapis.com/css2?family=Arvo&display=swap" rel="stylesheet">
  </head>
  </head>
  <div>
    <navBarVue />
    <br />
    <body id="scroll">
      
    <div class="container-md">
      <RouterView style="overflow:hidden;"></RouterView>
    </div>
  </body>
  </div>

</template>

<style>
tr{
  align-self: center;
  text-align: center;  
}
td{
  text-align: center;
}
body{
  margin: 0px;
  padding: 0px;
}
.body
{ 
    position:fixed; 
    height:100%; 
    width:100%;
    background-color: rgba(41, 85, 105, 0.178);
    margin: -19px 0 0 0;
    width: 100%;
}

#scroll{
  overflow-y: scroll;
  overflow-x: hidden;
}

</style>
