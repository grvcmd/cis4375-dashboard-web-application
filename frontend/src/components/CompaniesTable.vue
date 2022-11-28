<!-- Component that displays all the companies -->

<template>
  <div class="row justify-content-center">
    <div class="col-12 col-xl-8 mb-4 mb-lg-0">
      <div class="col-12 col-md-4 col-lg-2 d-flex align-items-center flex-nowrap">
        <input class="form-control form-control-dark" type="text" placeholder="Search Company" aria-label="Search" v-model="filter">
      </div>
      <div class="card">
        <router-link :to="{name: 'companysignup'}" class="btn btn-success btn-lg">Add Company</router-link>
        <h5 class="card-header">Companies</h5>
        <div class="card-body">
          <div class="table-responsive">
            <table class="table">
              <thead>
                <tr>
                  <th scope="col">Name</th>
                  <th scope="col">EIN</th>
                  <th scope="col"># Of Stakeholders</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="company, index in filteredRows" :key="company.c_id">
                  <td v-html="highlightMatches(company.c_name)"></td>
                  <td>{{ company.c_ein }}</td>
                  <td>{{ CompanyStakeholders[index] }}</td>
                  <td>
                    <router-link :to="{name: 'view-stakeholders', params: { c_id: company.c_id }}" class="btn btn-info mx-1">View Stakeholders</router-link>
                    <router-link :to="{name: 'view-locations', params: { c_id: company.c_id }}" class="btn btn-info mx-1">Locations</router-link>
                    <router-link :to="{name: 'edit-company', params: { c_id: company.c_id }}" class="btn btn-success">Edit</router-link>
                    <button @click.prevent="deleteCompany(company.c_id)" class="btn btn-danger mx-1">Delete</button>
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
              filter: '',
              Companies: [],
              CompanyStakeholders: [],
          }
      },
      created(){
          let apiURL = 'http://localhost:8080/api/companies';
          axios.get(apiURL).then(res =>{
              this.Companies = res.data;

              // Call api to get all stakeholders of each company in Companies list
              this.Companies.forEach(company => {
                axios.get(`http://localhost:8080/api/stakeholders/company/${company.c_id}`).then(res => {
                  // Set CompanyStakeholders list to hold the # of stakeholders each company has
                  this.CompanyStakeholders.push(res.data.length)
                }).catch(error => {
                  console.log(error)
                })
              })
              
          }).catch(error =>{
              console.log(error)
          });     
      },

      methods: {
          deleteCompany(c_id){
              let apiURL = `http://localhost:8080/api/companies/${c_id}`;
              let indexOfArrayItem = this.Companies.findIndex(i => i.c_id === c_id);

              if (window.confirm("Do you really want to delete this company?")) {
                //call to backend
                  axios.delete(apiURL).then(() => {
                    //remove one element from Companies array object to update data
                      this.Companies.splice(indexOfArrayItem, 1);
                  }).catch(error => {
                      console.log(error)
                  });
              }
          },
          highlightMatches(text) {
            const matchExists = text.toLowerCase().includes(this.filter.toLowerCase())
            if(!matchExists) return text;

            const re = new RegExp(this.filter, 'ig');
            return text.replace(re, matchedText => `<strong>${matchedText}</strong>`)
          }
      },
      computed: {
        filteredRows() {
          return this.Companies.filter(company => {
            const companyName = company.c_name.toString().toLowerCase();
            const searchTerm = this.filter.toLowerCase()

            return companyName.includes(searchTerm);
          })
        }
      },
  }
</script>