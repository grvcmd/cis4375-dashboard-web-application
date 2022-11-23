<template>
  <div class="row justify-content-center" v-if="isAuthenticated">
      <div class="col-md-6">
          <!-- Update stakeholder content -->
          <h3 class="text-center">Update Stakeholder</h3>
          <form @submit.prevent="handleUpdateForm">
              <div class="form-group">
                  <label>Company ID you are a stakeholder in</label>
                  <input type="text" class="form-control" v-model="stakeholder.c_id" required>
              </div>

              <div class="form-group">
                  <label>First Name</label>
                  <!-- <input type="text" class="form-control" v-model="stakeholder.s_id" required> -->
                  <input type="text" class="form-control" v-model="stakeholder.s_fname" required>
              </div>

              <div class="form-group">
                  <label>Last Name</label>
                  <!-- <input type="text" class="form-control" v-model="stakeholder.orgDesc" required> -->
                  <input type="text" class="form-control" v-model="stakeholder.s_lname" required>
              </div>

              <div class="form-group">
                  <label>Title</label>
                  <!-- <input type="text" class="form-control" v-model="stakeholder.orgDesc" required> -->
                  <input type="text" class="form-control" v-model="stakeholder.s_title" required>
              </div>

              <div class="form-group">
                  <label>DOB</label>
                  <!-- <input type="text" class="form-control" v-model="stakeholder.orgDesc" required> -->
                  <input type="text" class="form-control" v-model="stakeholder.s_dob" required>
              </div>

              <div class="form-group">
                  <label>Place of Birth</label>
                  <!-- <input type="text" class="form-control" v-model="stakeholder.orgDesc" required> -->
                  <input type="text" class="form-control" v-model="stakeholder.s_placeOfBirth" required>
              </div>

              <div class="form-group">
                  <label>Address</label>
                  <!-- <input type="text" class="form-control" v-model="stakeholder.orgDesc" required> -->
                  <input type="text" class="form-control" v-model="stakeholder.s_address" required>
              </div>

              <div class="form-group">
                  <label>Email</label>
                  <!-- <input type="text" class="form-control" v-model="stakeholder.orgDesc" required> -->
                  <input type="text" class="form-control" v-model="stakeholder.s_email" required>
              </div>

              <div class="form-group">
                  <label>Percent Ownership</label>
                  <!-- <input type="text" class="form-control" v-model="stakeholder.orgDesc" required> -->
                  <input step=0.01 type="number" class="form-control" v-model="stakeholder.s_percent_ownership" required>
              </div>

              <div class="form-group">
                  <label>Spouse First Name</label>
                  <!-- <input type="text" class="form-control" v-model="stakeholder.orgDesc" required> -->
                  <input type="text" class="form-control" v-model="stakeholder.s_spouse_fname" required>
              </div>

              <div class="form-group">
                  <label>Spouse Last Name</label>
                  <!-- <input type="text" class="form-control" v-model="stakeholder.orgDesc" required> -->
                  <input type="text" class="form-control" v-model="stakeholder.s_spouse_lname" required>
              </div>

              <div class="form-group">
                  <label>Loan Invested</label>
                  <!-- <input type="text" class="form-control" v-model="stakeholder.orgDesc" required> -->
                  <input step=0.01 type="number" class="form-control" v-model="stakeholder.s_loan_invested" required>
              </div>

              <div class="form-group">
                  <label>Personal Funds Invested</label>
                  <!-- <input type="text" class="form-control" v-model="stakeholder.orgDesc" required> -->
                  <input step=0.01 type="number" class="form-control" v-model="stakeholder.s_personalFundsInvested" required>
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
              stakeholder: { }
          }
      },
      created() {
          let apiURL = `http://localhost:8080/api/stakeholders/${this.$route.params.s_id}`;

          // Fills out fields with current data
          axios.get(apiURL).then((res) => {
              this.stakeholder = res.data;
          })
      },
      methods: {
          handleUpdateForm() {
              let apiURL = `http://localhost:8080/api/stakeholders/${this.$route.params.s_id}`;

              // put the new data into the db using the api url
              axios.put(apiURL, this.stakeholder).then((res) => {
                  console.log(res)
                  this.$router.push(`/company-stakeholders/${this.stakeholder.c_id}`)
              }).catch(error => {
                  console.log(error)
              });
          }
      }
  }
</script>