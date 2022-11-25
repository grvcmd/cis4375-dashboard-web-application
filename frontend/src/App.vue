<script setup>
import { RouterLink, RouterView } from 'vue-router'
import NavBar from './components/navBar.vue';
</script>

<template>
  <NavBar></NavBar>
  <!-- SideBar goes here -->
  <div class="mt-3 ml-5">
    <RouterView></RouterView>
  </div>
</template>
