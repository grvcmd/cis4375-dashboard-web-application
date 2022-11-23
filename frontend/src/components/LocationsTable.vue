<!-- Component that displays all the locations under a company -->

<template>
  <div class="row justify-content-center" v-if="isAuthenticated" >
    <!-- Router link to create a location with the c_id of the company were viewing the locations of -->
    <router-link :to="{name: 'locationsignup', params: { c_id: this.getTheCompanyID }}" class="btn btn-success">Add Location</router-link>
    <table class="table table-striped">
      <thead class="table-dark">
        <tr>
          <th>Location Name</th>
          <th>Address</th>
          <th>City</th>
          <th>County</th>
          <th>Location Email</th>
          <th>Location Phone Number</th>
          <th>Actions</th>
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
            <!-- Router link to create a license with the loc_id of the location you clicked on -->
            <router-link :to="{name: 'view-licenses', params: { loc_id: location.loc_id }}" class="btn btn-info mx-1">View Licenses</router-link>
            <router-link :to="{name: 'view-locations-leaseinfo', params: { loc_id: location.loc_id }}" class="btn btn-info mx-1">Lease Information</router-link>
            <router-link :to="{name: 'edit-location', params: { loc_id: location.loc_id }}" class="btn btn-success">Edit</router-link>
            <button @click.prevent="deleteLocation(location.loc_id)" class="btn btn-danger mx-1">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>
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