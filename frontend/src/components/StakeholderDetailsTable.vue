<!-- 
  Component to display the rest of the details for a stakeholder
  s_placeOfBirth
  s_address
  s_email
  s_spouse_fname
  s_spouse_lname
 -->

<template>
  <div class="row justify-content-center" v-if="isAuthenticated">
    <table class="table table-striped">
      <thead class="table-dark">
        <tr>
          <th>Place of Birth</th>
          <th>Address</th>
          <th>Email</th>
          <th>Spouse</th>
        </tr>
      </thead>
      <tbody>
       <tr>
          <td>{{ Stakeholder.s_placeOfBirth}}</td>
          <td>{{ Stakeholder.s_address }}</td>
          <td>{{ Stakeholder.s_email }}</td>
          <td>{{ Stakeholder.s_spouse_fname }} {{ Stakeholder.s_spouse_lname }}</td>
          <td>
            <!-- <router-link :to="{name: 'edit-stakeholder', params: { s_id: stakeholder.s_id }}" class="btn btn-success">Edit</router-link> -->
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
            // Object to store model data
              Stakeholder: {}
          }
      },
      created(){
          let apiURL = `http://localhost:8080/api/stakeholders/${this.$route.params.s_id}`;
          axios.get(apiURL).then(res =>{
              this.Stakeholder = res.data;
              console.log(this.Stakeholder)
          }).catch(error =>{
              console.log(error)
          });     
      },
      methods: {

      }
  }
</script>