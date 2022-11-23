<template>
  <div class="row justify-content-center">
      <div class="col-md-6">
          <h3 class="text-center">Stakeholder Registration</h3>
          <form @submit.prevent="handleSubmitForm">
              <label>Stakeholder ID will be auto-generated</label>

              <div class="form-group">
                  <label>Company ID the stakeholder is a part of</label>
                  <input type="text" class="form-control" v-model="stakeholder.c_id" required>
              </div>
              <div class="form-group">
                  <label>First Name</label>
                  <input type="text" class="form-control" v-model="stakeholder.s_fname" required>
              </div>
              <div class="form-group">
                  <label>Last Name</label>
                  <input type="text" class="form-control" v-model="stakeholder.s_lname" required>
              </div>
              <div class="form-group">
                  <label>Title</label>
                  <input type="text" class="form-control" v-model="stakeholder.s_title" required>
              </div>
              <div class="form-group">
                  <label>DOB</label>
                  <input type="text" class="form-control" v-model="stakeholder.s_dob" required>
              </div>
              <div class="form-group">
                  <label>Place of Birth</label>
                  <input type="text" class="form-control" v-model="stakeholder.s_placeOfBirth" required>
              </div>
              <div class="form-group">
                  <label>Address</label>
                  <input type="text" class="form-control" v-model="stakeholder.s_address" required>
              </div>
              <div class="form-group">
                  <label>Email</label>
                  <input type="text" class="form-control" v-model="stakeholder.s_email" required>
              </div>
              <div class="form-group">
                  <label>Percent Ownership</label>
                  <input step=0.01 type="number" class="form-control" v-model="stakeholder.s_percent_ownership" required>
              </div>
              <div class="form-group">
                  <label>Spouse First Name</label>
                  <input type="text" class="form-control" v-model="stakeholder.s_spouse_fname" required>
              </div>
              <div class="form-group">
                  <label>Spouse Last Name</label>
                  <input type="text" class="form-control" v-model="stakeholder.s_spouse_lname" required>
              </div>
              <div class="form-group">
                  <label>Loan Invested</label>
                  <input step=0.01 type="number" class="form-control" v-model="stakeholder.s_loan_invested" required>
              </div>
              <div class="form-group">
                  <label>Personal Funds Invested</label>
                  <input step=0.01 type="number" class="form-control" v-model="stakeholder.s_personalFundsInvested" required>
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
              stakeholder: {
                  // s_id: '', // s_id is auto-generated
                  c_id: this.$route.params.c_id, // pre-filled by the code in created()
                  s_fname: '',
                  s_lname: '',
                  s_title: '',
                  s_dob: '', // datatype: date
                  s_placeOfBirth: '',
                  s_address: '',
                  s_email: '',
                  s_percent_ownership: '', // datatype: decimal
                  s_spouse_fname: '',
                  s_spouse_lname: '',
                  s_loan_invested: '', // datatype: decimal
                  s_personalFundsInvested: '', // datatype: decimal
              }
          }
      },
      created() {
        // this.stakeholder.c_id = this.$route.params.c_id
      },
      methods: {
          handleSubmitForm() {
              this.errors = [];

              // if there are no errors, submit the form
              if (this.errors.length === 0) {

                  parseInt(this.stakeholder.s_percent_ownership)
                  parseInt(this.stakeholder.s_loan_invested)
                  parseInt(this.stakeholder.s_personalFundsInvested)

                  let apiURL = 'http://localhost:8080/api/stakeholders/create';

                  console.log("stakeholder form submitted")

                  axios.post(apiURL, this.stakeholder).then(() => {
                      //After submission, go back to the companies view
                      this.$router.push(`/company-stakeholders/${this.$route.params.c_id}`)

                      console.log("New stakeholder created")

                      // Reset form fields
                      this.stakeholder = {
                        c_id: '',
                        s_fname: '',
                        s_lname: '',
                        s_title: '',
                        s_dob: '', // datatype: date
                        s_placeOfBirth: '',
                        s_address: '',
                        s_email: '',
                        s_percent_ownership: '', // datatype: decimal
                        s_spouse_fname: '',
                        s_spouse_lname: '',
                        s_loan_invested: '', // datatype: decimal
                        s_personalFundsInvested: '', // datatype: decimal
                      }
                  }).catch(error => {
                      console.log(error)
                  });
              }
          }
      }
  }

</script>