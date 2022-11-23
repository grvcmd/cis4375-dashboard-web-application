<!-- Component to display all stakeholders of a certain company -->

<template>
  <div class="row justify-content-center" v-if="isAuthenticated">
    <!-- Router link to create a stakeholder with the c_id of the company were viewing the stakeholders of -->
    <router-link :to="{name: 'stakeholdersignup', params: { c_id: this.getCompanyID }}" class="btn btn-success">Add Stakeholder</router-link>
    <table class="table table-striped">
      <thead class="table-dark">
        <tr>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Title</th>
          <th>Percent of Ownership</th>
          <th>Loans Invested</th>
          <th>Personal Funds Invested</th>
          <th>Actions</th>
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
            <!-- <router-link :to="{name: 'stakeholdersignup', params: { c_id: CompanyID }}" class="btn btn-success">Add Stakeholder</router-link> -->
            <router-link :to="{name: 'view-stakeholders-moredetails', params: { s_id: stakeholder.s_id }}" class="btn btn-info mx-1">More Details</router-link>
            <router-link :to="{name: 'edit-stakeholder', params: { s_id: stakeholder.s_id }}" class="btn btn-success">Edit</router-link>
            <button @click.prevent="deleteStakeholder(stakeholder.s_id)" class="btn btn-danger mx-1">Delete</button>
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