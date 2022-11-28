<!-- Component that displays all the locations under a company -->

<template>
  <div class="row justify-content-center">
    <div class="col-12 col-xl-8 mb-4 mb-lg-0">
      <!-- <div class="col-12 col-md-4 col-lg-2 d-flex align-items-center flex-nowrap">
        <input class="form-control form-control-dark" type="text" placeholder="Search Stakeholder" aria-label="Search" v-model="filter">
      </div> -->
      <div class="card">
        <router-link :to="{name: 'locationsignup', params: { c_id: this.getTheCompanyID }}" class="btn btn-success">Add Location</router-link>
        <h5 class="card-header">Locations</h5>
        <div class="card-body">
          <div class="table-responsive">
            <table class="table">
              <thead>
                <tr>
                  <th scope="col">Location Name</th>
                  <th scope="col">Address</th>
                  <th scope="col">City</th>
                  <th scope="col">County</th>
                  <th scope="col">Location Email</th>
                  <th scope="col">Location Phone Number</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="location in Locations" :key="location.c_id">
                  <td>{{ location.c_locationName }}</td>
                  <td>{{ location.c_address }}</td>
                  <td>{{ location.c_city }}</td>
                  <td>{{ location.c_county }}</td>
                  <td>{{ location.c_email }}</td>
                  <td>{{ location.c_phoneNumber }}</td>
                  <td>
                    <router-link :to="{name: 'view-licenses', params: { loc_id: location.loc_id }}" class="btn btn-info mx-1">Licenses</router-link>
                    <router-link :to="{name: 'view-locations-leaseinfo', params: { loc_id: location.loc_id }}" class="btn btn-info mx-1">Lease Info</router-link>
                    <router-link :to="{name: 'edit-location', params: { loc_id: location.loc_id }}" class="btn btn-success">Edit</router-link>
                    <button @click.prevent="deleteLocation(location.loc_id)" class="btn btn-danger mx-1">Delete</button>
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
              Locations: [],
          }
      },
      created(){
          let apiURL = `http://localhost:8080/api/locations/company/${this.$route.params.c_id}`;
          axios.get(apiURL).then(res =>{
              this.Locations = res.data;
          }).catch(error =>{
              console.log(error)
          });     
      },
      computed: {
        getTheCompanyID() {
          return this.$route.params.c_id
        }
      },
      methods: {
          deleteLocation(loc_id){
              let apiURL = `http://localhost:8080/api/locations/${loc_id}`;
              let indexOfArrayItem = this.Locations.findIndex(i => i.loc_id === loc_id);

              if (window.confirm("Do you really want to delete this location?")) {
                //call to backend
                  axios.delete(apiURL).then(() => {
                    //remove one element from Companies array object to update data
                      this.Locations.splice(indexOfArrayItem, 1);
                  }).catch(error => {
                      console.log(error)
                  });
              }
          }
      }
  }
</script>