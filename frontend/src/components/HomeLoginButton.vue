<template>
    <h1 v-if="!isAuthenticated">Login below to get started!</h1>
    <button @click="login" class="HomeLoginButton" v-if="!isAuthenticated">
        Login
    </button>

    <h2 v-if="isAuthenticated">You're Logged in!</h2>
</template>

<script>
import { useAuth0 } from '@auth0/auth0-vue';
  
  export default {
    setup() {
      const { loginWithRedirect, isAuthenticated } = useAuth0();

      return {
        login: () => {
          loginWithRedirect();
        }, isAuthenticated
      };
    }
  };



</script>




<style>
.HomeLoginButton {
  border: none;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  transition-duration: 0.4s;
  border: 2px solid #4CAF50;
  border-radius: 100px;
  width: 200px;
  font-weight: bold;
  font-size: 2rem;
}
button:hover {
background-color: #4CAF50; /* Green */
color: white;
}

</style>