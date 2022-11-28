<!-- Component to display all stakeholders of a certain company -->

<template>
  <div class="row justify-content-center">
    <div class="col-12 col-xl-8 mb-4 mb-lg-0">
      <!-- <div class="col-12 col-md-4 col-lg-2 d-flex align-items-center flex-nowrap">
        <input class="form-control form-control-dark" type="text" placeholder="Search Stakeholder" aria-label="Search" v-model="filter">
      </div> -->
      <div class="card">
        <router-link :to="{name: 'stakeholdersignup'}" class="btn btn-success btn-lg">Add Stakeholder</router-link>
        <h5 class="card-header">Stakeholders</h5>
        <div class="card-body">
          <div class="table-responsive">
            <table class="table">
              <thead>
                <tr>
                  <th scope="col">First Name</th>
                  <th scope="col">Last Name</th>
                  <th scope="col">Title</th>
                  <th scope="col">Percent of Ownership</th>
                  <th scope="col">Loans Invested</th>
                  <th scope="col">Personal Funds Invested</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="stakeholder in Stakeholders" :key="stakeholder.c_id">
                  <td>{{ stakeholder.s_fname }}</td>
                  <td>{{ stakeholder.s_lname }}</td>
                  <td>{{ stakeholder.s_title }}</td>
                  <td>{{ stakeholder.s_percent_ownership }}%</td>
                  <td>${{ stakeholder.s_loan_invested }}</td>
                  <td>${{ stakeholder.s_personalFundsInvested }}</td>
                  <td>
                    <router-link :to="{name: 'view-stakeholders-moredetails', params: { s_id: stakeholder.s_id }}" class="btn btn-info mx-1">More Details</router-link>
                    <router-link :to="{name: 'edit-stakeholder', params: { s_id: stakeholder.s_id }}" class="btn btn-success">Edit</router-link>
                    <button @click.prevent="deleteStakeholder(stakeholder.s_id)" class="btn btn-danger mx-1">Delete</button>
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
              Stakeholders: [],
          }
      },
      computed: {
        getCompanyID() {
          return this.$route.params.c_id
        }
      },
      created(){
          let apiURL = `http://localhost:8080/api/stakeholders/company/${this.$route.params.c_id}`;
          axios.get(apiURL).then(res =>{
              this.Stakeholders = res.data;
          }).catch(error =>{
              console.log(error)
          });     
      },
      methods: {
          deleteStakeholder(s_id){
              let apiURL = `http://localhost:8080/api/stakeholders/${s_id}`;
              let indexOfArrayItem = this.Stakeholders.findIndex(i => i.s_id === s_id);

              if (window.confirm("Do you really want to delete this stakeholder?")) {
                //call to backend
                  axios.delete(apiURL).then(() => {
                    //remove one element from  array object to update data
                      this.Stakeholders.splice(indexOfArrayItem, 1);
                  }).catch(error => {
                      console.log(error)
                  });
              }
          }
      }
  }
</script>