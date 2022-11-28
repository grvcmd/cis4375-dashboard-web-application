<!-- View to display all licenses in the DB -->
// TODO: Action buttons
// TODO: Search bar


<template>
  <div class="row justify-content-center">
    <div class="col-12 col-xl-8 mb-4 mb-lg-0">
      <!-- <div class="col-12 col-md-4 col-lg-2 d-flex align-items-center flex-nowrap">
        <input class="form-control form-control-dark" type="text" placeholder="Search Company" aria-label="Search" v-model="filter">
      </div> -->
      <div class="card">
        <h5 class="card-header">All Licenses</h5>
        <div class="card-body">
          <div class="table-responsive">
            <table class="table">
              <thead>
                <tr>
                  <th>License Name</th>
                  <th>License Cost</th>
                  <th>License Status</th>
                  <th>License Status Date</th>
                  <!-- <th>License Expiration Date</th> -->
                </tr>
              </thead>
              <tbody>
                <tr v-for="license in Licenses" :key="license.l_id" >
                  <td>{{ license.license_name }}</td>
                  <td>${{ license.license_cost }}</td>
                  <td>{{ license.license_status }}</td>
                  <td>{{ license.license_status_date }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
  import axios from "axios";
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
              Licenses: [],
          }
      },
      created() {
        let apiURL = `http://localhost:8080/api/company_licenses`;
        axios.get(apiURL)
          .then((response) => {
            this.Licenses = response.data
          })
      },
  }
</script>