<template>
  <div class="row justify-content-center">
      <div class="col-md-6">
          <h3 class="text-center">Company Registration</h3>
          <form @submit.prevent="handleSubmitForm">
              <label>Company ID will be auto-generated</label>

              <div class="form-group">
                  <label>Company Name</label>
                  <input type="text" class="form-control" v-model="company.c_name" required>
              </div>
              <div class="form-group">
                  <label>Company EIN</label>
                  <input type="number" class="form-control" v-model="company.c_ein" required>
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
              company: {
                  // c_id: '',
                  c_name: '',
                  c_ein: ''
              }
          }
      },
      methods: {
          handleSubmitForm() {
              this.errors = [];

              // Validate that c_name is > 2 letters
              if (this.company.c_name.length < 2){
                  this.errors.push("company name must be longer than 2 letters");
              };

              // if there are no errors, submit the form
              if (this.errors.length === 0) {

                  // parseInt(this.company.orgID)

                  console.log("company form submitted")

                  let apiURL = 'http://localhost:8080/api/companies/create';

                  axios.post(apiURL, this.company).then(() => {
                      //After submission, go back to the companies view
                      this.$router.push('/companies')

                      console.log("New company created")

                      // Reset form fields
                      this.company = {
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