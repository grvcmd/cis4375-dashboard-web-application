<template>
  <nav class="navbar navbar-light bg-light p-3">
    <div class="d-flex col-12 col-md-3 col-lg-2 mb-2 mb-lg-0 flex-wrap flex-md-nowrap justify-content-between">
      <a class="navbar-brand" href="#">
        Compliance Scout LLC
      </a>
      <button class="navbar-toggler d-md-none collapsed mb-3" type="button" data-toggle="collapse" data-target="#sidebar" aria-controls="sidebar" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
    </div>
    <!-- <div class="col-12 col-md-4 col-lg-2">
      <input class="form-control form-control-dark" type="text" placeholder="Search" aria-label="Search">
    </div> -->
    <div class="col-12 col-md-5 col-lg-8 d-flex align-items-center justify-content-md-end mt-3 mt-md-0">
      <div class="dropdown">
        <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-expanded="false">
          Account Settings
        </button>
        <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton">
          <li><a class="dropdown-item" href="#">Log Out</a></li>
          <li><a class="dropdown-item" href="#">Log In</a></li>
        </ul>
      </div>
    </div>
  </nav>
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
