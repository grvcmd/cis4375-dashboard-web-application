<template>
  <div class="row justify-content-center" v-if="isAuthenticated">
      <div class="col-md-6">
          <!-- Update stakeholder content -->
          <h3 class="text-center">Update Location</h3>
          <form @submit.prevent="handleUpdateForm">
              <div class="form-group">
                  <label>Company ID the location is under</label>
                  <input type="text" class="form-control" v-model="location.c_id" required>
              </div>

              <div class="form-group">
                  <label>First Date Opened</label>
                  <input type="text" class="form-control" v-model="location.first_date_op" required>
              </div>

              <div class="form-group">
                  <label>Purchase Price</label>
                  <input step=0.01 type="number" class="form-control" v-model="location.purchase_price" required>
              </div>

              <div class="form-group">
                  <label>Purchase Date</label>
                  <input type="text" class="form-control" v-model="location.purchase_date" required>
              </div>

              <div class="form-group">
                  <label>Lease Expiration Date</label>
                  <input type="text" class="form-control" v-model="location.lease_exp_date" required>
              </div>

              <div class="form-group">
                  <label>Rent</label>
                  <input step=0.01 type="number" class="form-control" v-model="location.rent" required>
              </div>

              <div class="form-group">
                  <label>Property Owner Company</label>
                  <input type="text" class="form-control" v-model="location.property_owner_company" required>
              </div>

              <div class="form-group">
                  <label>Property Owner EIN</label>
                  <input type="number" class="form-control" v-model="location.property_owner_ein" required>
              </div>

              <div class="form-group">
                  <label>Address</label>
                  <input type="text" class="form-control" v-model="location.c_address" required>
              </div>

              <div class="form-group">
                  <label>Mail Address</label>
                  <input type="text" class="form-control" v-model="location.c_mailAdress" required>
              </div>

              <div class="form-group">
                  <label>City</label>
                  <input type="text" class="form-control" v-model="location.c_city" required>
              </div>

              <div class="form-group">
                  <label>County</label>
                  <input type="text" class="form-control" v-model="location.c_county" required>
              </div>

              <div class="form-group">
                  <label>Email</label>
                  <input type="text" class="form-control" v-model="location.c_email" required>
              </div>

              <div class="form-group">
                  <label>Location Name</label>
                  <input type="text" class="form-control" v-model="location.c_locationName" required>
              </div>

              <div class="form-group">
                  <label>c_phoneNumber</label>
                  <input type="text" class="form-control" v-model="location.c_phoneNumber" required>
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
              location: { }
          }
      },
      created() {
          let apiURL = `http://localhost:8080/api/locations/${this.$route.params.loc_id}`;

          // Fills out fields with current data
          axios.get(apiURL).then((res) => {
              this.location = res.data;
          })
      },
      methods: {
          handleUpdateForm() {
              let apiURL = `http://localhost:8080/api/locations/${this.$route.params.loc_id}`;

              // put the new data into the db using the api url
              axios.put(apiURL, this.location).then((res) => {
                  console.log(res)
                  this.$router.push(`/company-locations/${this.location.c_id}`)
              }).catch(error => {
                  console.log(error)
              });
          }
      }
  }
</script>