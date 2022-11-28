<script setup>
import { RouterLink, RouterView } from 'vue-router'
import NavBar from './components/navBar.vue';
import SideBar from './components/SideBar.vue'
</script>

<template>
  <NavBar></NavBar>
  <SideBar></SideBar>
  <div class="mt-3 ml-5">
    <RouterView></RouterView>
  </div>
</template>
