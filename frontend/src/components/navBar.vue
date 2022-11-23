<template>
    <div>
      <!-- NAV BAR-->
      <nav class="navbar navbar-expand navbar-light bg-light">
        <div class="container">
          <a class="navbar-brand float-left" href="/" style="font-family: 'Arvo', serif;">
            <img 
              alt="ComplianceScout"
              src="../assets/ComplianceScout.webp"
              class="d-inline-block align-text-top"
            />
            <p style="align-self:;">Compliance Scout LCC</p>
          </a>
          <ul class="nav navbar-nav mr-auto fw-bold">
            <li class="nav-item">
              <router-link class="nav-link" to="/">Home</router-link>
            </li>
            <li class="nav-item" v-if="isAuthenticated">
              <router-link class="nav-link" to="/companies">Companies</router-link>
            </li>
            <li class="nav-item" v-if="!isAuthenticated">
                <button @click="login" class="navButton">Login</button>
            </li>
            <br />
            <li class="nav-item" v-if="isAuthenticated">
                <button @click="logout" class="navButton">Logout</button>
            </li>
           
            <!-- <li class="nav-item">
              <router-link class="nav-link" to="/view-clients">Charts</router-link>
            </li> -->
          </ul>
        </div>
      </nav>
  
    </div>
  </template>

<script>
import { useAuth0 } from '@auth0/auth0-vue';
  
  export default {
    setup() {
      const { loginWithRedirect, logout, isAuthenticated } = useAuth0();

      return {
        login: () => {
          loginWithRedirect();
        },logout: () => {
            logout({ returnTo: window.location.origin });
        }, isAuthenticated
      };
    }
  };
</script>
  
<style>
.navButton {
  border: none;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  transition-duration: 0.4s;
  border: 2px solid #4CAF50;
  border-radius: 4px;
}
button:hover {
  background-color: #4CAF50; /* Green */
  color: white;
}

ul{
  gap: 10px;
  align-items: center;
}
</style>