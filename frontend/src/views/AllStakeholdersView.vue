<!-- View to display all stakeholders in the DB -->
// TODO: Action buttons
// TODO: Search bar


<template>
  <div class="row justify-content-center">
    <div class="col-12 col-xl-8 mb-4 mb-lg-0">
      <!-- <div class="col-12 col-md-4 col-lg-2 d-flex align-items-center flex-nowrap">
        <input class="form-control form-control-dark" type="text" placeholder="Search Company" aria-label="Search" v-model="filter">
      </div> -->
      <div class="card">
        <h5 class="card-header">All Stakeholders</h5>
        <div class="card-body">
          <div class="table-responsive">
            <table class="table">
              <thead>
                <tr>
                  <th scope="col">Name</th>
                  <th scope="col">Title</th>
                  <th scope="col">Email</th>
                  <th scope="col">Percent of Ownership</th>
                  <th scope="col">Loans Invested</th>
                  <th scope="col">Personal Funds Invested</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="stakeholder in Stakeholders" :key="stakeholder.s_id">
                  <td>{{ stakeholder.s_fname }} {{ stakeholder.s_lname }}</td>
                  <td>{{ stakeholder.s_title }}</td>
                  <td>{{ stakeholder.s_email }}</td>
                  <td>{{ stakeholder.s_percent_ownership }}%</td>
                  <td>${{ stakeholder.s_loan_invested }}</td>
                  <td>${{ stakeholder.s_personalFundsInvested }}</td>
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
              filter: '',
              Stakeholders: []
          }
      },
      created() {
          let apiURL = 'http://localhost:8080/api/stakeholders';
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
    },
  }
</script>
