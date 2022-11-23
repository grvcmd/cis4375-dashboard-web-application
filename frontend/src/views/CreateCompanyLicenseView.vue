<template>
  <div class="row justify-content-center">
      <div class="col-md-6">
          <h3 class="text-center">License Registration</h3>
          <form @submit.prevent="handleSubmitForm">
              <label>License ID will be auto-generated</label>

              <div class="form-group">
                  <label>Location ID this license will be under</label>
                  <input type="text" class="form-control" v-model="company_license.loc_id" required>
              </div>
              <div class="form-group">
                  <label>License Status</label>
                  <!-- <input type="text" class="form-control" v-model="company_license.license_status" required> -->
                  <select class="form-select" v-model="company_license.license_status">
                    <option value="Denied">Denied</option>
                    <option value="Approved" >Approved</option>
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
              <div class="form-group">
                  <label>License Expiration Date</label>
                  <input type="text" class="form-control" v-model="company_license.license_expire_date" required>
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
              company_license: {
                  loc_id: this.$route.params.loc_id,
                  license_status: '',
                  license_status_date: '',
                  license_name: '',
                  licenst_cost: '',
                  license_expire_date: '',
              }
          }
      },
      methods: {
          handleSubmitForm() {
              this.errors = [];

              // if there are no errors, submit the form
              if (this.errors.length === 0) {

                  // parseInt(this.company.orgID)

                  console.log("License form submitted")

                  let apiURL = 'http://localhost:8080/api/company_licenses/create';

                  axios.post(apiURL, this.company_license).then(() => {
                      
                      this.$router.push(`/location-licenses/${this.$route.params.loc_id}`)

                      console.log("New company_license created")

                      // Reset form fields
                      this.company_license = {
                        loc_id: '',
                        license_status: '',
                        license_status_date: '',
                        license_name: '',
                        licenst_cost: '',
                        license_expire_date: '',
                      }
                  }).catch(error => {
                      console.log(error)
                  });
              }
          }
      }
  }

</script>