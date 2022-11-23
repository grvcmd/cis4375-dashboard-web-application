<template>
  <div class="row justify-content-center">
      <div class="col-md-6">
          <h3 class="text-center">Location Registration</h3>
          <form @submit.prevent="handleSubmitForm">
              <label>Location ID will be auto-generated</label>
              <br />
              <label>This location will be under the Company ID: {{ this.location.c_id }}</label>
              <!-- <div class="form-group">
                  <label>Company ID the location is under</label>
                  <input type="text" class="form-control" v-model="location.c_id" required>
              </div> -->
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
                  <label>Phone Number</label>
                  <input type="text" class="form-control" v-model="location.c_phoneNumber" required>
              </div>

              <!-- If there are anything in the error list - display those errors. -->
              <p v-if="errors.length">
                  <br>
                  <b>Please correct the following error(s):</b>
                  <ul>
                      <li v-for="error in errors" :key="error">{{ error }} </li>
                  </ul>
              </p>

              <button type="submit" class="btn btn-danger mt-3">Create</button>
          </form>
      </div>
  </div>
</template>

<script>
  import axios from "axios";

  export default {
      data() {
          return {
              errors: [],
              location: {
                  // c_id: '',
                  c_id: this.$route.params.c_id, // STRING
                  first_date_op: '', // DATE
                  purchase_price: '', // DECIMAL
                  purchase_date: '', // DATE
                  lease_exp_date: '', // DATE
                  rent: '', // DECIMAL
                  property_owner_company: '', // STRING
                  property_owner_ein: '', // INTEGER
                  c_address: '', // STRING
                  c_mailAdress: '', // STRING
                  c_city: '', // STRING
                  c_county: '', // STRING
                  c_email: '', // STRING
                  c_locationName: '', // STRING
                  c_phoneNumber: '', // STRING
              }
          }
      },
      methods: {
          handleSubmitForm() {
              this.errors = [];

              // if there are no errors, submit the form
              if (this.errors.length === 0) {

                  // parseInt(this.location.orgID)

                  console.log("location form submitted")

                  let apiURL = 'http://localhost:8080/api/locations/create';

                  axios.post(apiURL, this.location).then(() => {
                      //After submission, go back to the locations view
                      this.$router.push(`/company-locations/${this.$route.params.c_id}`)

                      console.log("New location created")

                      // Reset form fields
                      this.location = {
                          c_name: '',
                          c_ein: ''
                      }
                  }).catch(error => {
                      console.log(error)
                  });
              }
          }
      }
  }

</script>