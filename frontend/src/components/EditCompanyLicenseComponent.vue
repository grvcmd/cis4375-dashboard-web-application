<template>
  <div class="row justify-content-center" v-if="isAuthenticated">
      <div class="col-md-6">
          <h3 class="text-center">Update Company</h3>
          <form @submit.prevent="handleUpdateForm">
            
              <!-- You are not allowed to edit l_id as it breaks the DB -->
              <label>License ID: {{this.company_license.l_id}}</label>

              <div class="form-group">
                  <label>Location ID this entry is under</label>
                  <input type="text" class="form-control" v-model="company_license.loc_id" required>
              </div>

              <div class="form-group">
                  <label>License Status</label>
                  <!-- <input type="text" class="form-control" v-model="company_license.license_status" required> -->
                  <select class="form-select" v-model="company_license.license_status">
                    <option selected>{{company_license.license_status}}</option>
                    <option v-if="this.getLicenseStatus === 'approved'" value="Denied">Denied</option>
                    <option v-else value="Approved">Approved</option>
                  </select>
              </div>

              <div class="form-group">
                  <label>License Name</label>
                  <input type="text" class="form-control" v-model="company_license.license_name" required>
              </div>

              <div class="form-group">
                  <label>License Cost</label>
                  <input step=0.01 type="number" class="form-control" v-model="company_license.license_cost" required>
              </div>

              <div class="form-group">
                  <label>License Status Date</label>
                  <input type="text" class="form-control" v-model="company_license.license_status_date" required>
              </div>

              <!-- <div class="form-group">
                  <label>License Expiration Date</label>
                  <input type="text" class="form-control" v-model="company_license.license_expire_date" required>
              </div> -->

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
              company_license: { },
          }
      },
      computed: {
        getLicenseStatus() {
            return this.company_license.license_status.toLowerCase()
        }
      },
      created() {
          let apiURL = `http://localhost:8080/api/company_licenses/${this.$route.params.l_id}`;

          // Fills out fields with current data
          axios.get(apiURL).then((res) => {
              this.company_license = res.data;
          })
      },
      methods: {
          handleUpdateForm() {
              let apiURL = `http://localhost:8080/api/company_licenses/${this.$route.params.l_id}`;

              // put the new data into the db using the api url
              axios.put(apiURL, this.company_license).then((res) => {
                  console.log(res)
                  this.$router.push(`/location-licenses/${this.company_license.loc_id}`)
              }).catch(error => {
                  console.log(error)
              });
          }
      }
  }
</script>