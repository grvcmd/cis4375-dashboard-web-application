<template>
  <div class="row justify-content-center" v-if="isAuthenticated">
      <div class="col-md-6">
          <!-- Update stakeholder content -->
          <h3 class="text-center">Update Company</h3>
          <form @submit.prevent="handleUpdateForm">
              <!-- <div class="form-group">
                  <label>Company ID</label>
                  <input type="text" class="form-control" v-model="company.c_id" required>
              </div> -->
            
              <!-- You are not allowed to edit c_id as it breaks the DB -->
              <label>Company ID: {{this.company.c_id}}</label>

              <div class="form-group">
                  <label>Company Name</label>
                  <!-- <input type="text" class="form-control" v-model="stakeholder.s_id" required> -->
                  <input type="text" class="form-control" v-model="company.c_name" required>
              </div>

              <div class="form-group">
                  <label>Company EIN</label>
                  <!-- <input type="text" class="form-control" v-model="stakeholder.orgDesc" required> -->
                  <input type="number" class="form-control" v-model="company.c_ein" required>
              </div>

              <button class="btn btn-danger mt-3">Update</button>

          </form>
      </div>
  </div>
</template>

<script>
  import axios from 'axios';
  import { useAuth0 } from '@auth0/auth0-vue';


export default {
  setup() {
    const { isAuthenticated } = useAuth0();

    return {
      isAuthenticated
    };
  },
      data() {
          return {
              // object to store model data
              company: { }
          }
      },
      created() {
          let apiURL = `http://localhost:8080/api/companies/${this.$route.params.c_id}`;

          // Fills out fields with current data
          axios.get(apiURL).then((res) => {
              this.company = res.data;
          })
      },
      methods: {
          handleUpdateForm() {
              let apiURL = `http://localhost:8080/api/companies/${this.$route.params.c_id}`;

              // put the new data into the db using the api url
              axios.put(apiURL, this.company).then((res) => {
                  console.log(res)
                  this.$router.push(`/companies`)
              }).catch(error => {
                  console.log(error)
              });
          }
      }
  }
</script>