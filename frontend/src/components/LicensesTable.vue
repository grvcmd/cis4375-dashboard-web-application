<!-- Component that displays all the locations under a company -->

<template>
  <div class="row justify-content-center">
    <div class="col-12 col-xl-8 mb-4 mb-lg-0">
      <!-- <div class="col-12 col-md-4 col-lg-2 d-flex align-items-center flex-nowrap">
        <input class="form-control form-control-dark" type="text" placeholder="Search Stakeholder" aria-label="Search" v-model="filter">
      </div> -->
      <div class="card">
        <router-link :to="{name: 'companylicensesignup', params: { loc_id: LocationID }}" class="btn btn-success">Add License</router-link>
        <h5 class="card-header">Locations</h5>
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
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="company_license in Company_Licenses" :key="company_license.l_id" >
                  <td>{{ company_license.license_name }}</td>
                  <td>${{ company_license.license_cost }}</td>
                  <td>{{ company_license.license_status }}</td>
                  <td>{{ company_license.license_status_date }}</td>
                  <!-- <td>{{ company_license.license_expire_date }}</td> -->
                  <td>
                    <router-link :to="{name: 'edit-location-license', params: { l_id: company_license.l_id}}" class="btn btn-success">Edit</router-link>
                    <button @click.prevent="deleteCompanyLicense(company_license.l_id)" class="btn btn-danger mx-1">Delete</button>
                  </td>
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
              Company_Licenses: [], // Get license_status from here
              LocationID: '',
          }
      },
      created() {
        let apiURL = `http://localhost:8080/api/company_licenses/location/${this.$route.params.loc_id}`;
        axios.get(apiURL)
          .then((response) => {
            this.Company_Licenses = response.data
            this.LocationID = this.$route.params.loc_id
          })
      },
      computed: {
        getLocationID() {
          return this.$route.params.loc_id
        }
      },
      methods: {
        deleteCompanyLicense(l_id){
              let apiURL = `http://localhost:8080/api/company_licenses/${l_id}`;
              let indexOfArrayItem = this.Company_Licenses.findIndex(i => i.l_id === l_id);

              if (window.confirm("Do you really want to delete this company-license?")) {
                //call to backend
                  axios.delete(apiURL).then(() => {
                    //remove one element from Companies array object to update data
                      this.Company_Licenses.splice(indexOfArrayItem, 1);
                  }).catch(error => {
                      console.log(error)
                  });
              }
          }
      }
  }
</script>