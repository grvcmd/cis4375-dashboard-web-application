import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createAuth0 } from '@auth0/auth0-vue';

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";

// import './assets/main.css'

const app = createApp(App)

app.use(router)

app.use(
    createAuth0({
      domain: import.meta.env.VITE_AUTH0_DOMAIN, //need to remove key from .env on final push.
      client_id: import.meta.env.VITE_AUTH0_CLIENT, //need to remove key from .env on final push.
      redirect_uri: window.location.origin
    })
  );

app.mount('#app')
