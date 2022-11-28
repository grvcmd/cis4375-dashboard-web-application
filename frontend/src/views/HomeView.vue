
<template>
  <div class="container-fluid">
    <div class="row">
      <!-- DASHBOARD START -->
      <main class="col-md-9 ml-sm-auto col-lg-10 px-md-4 py-4">
        <!-- BREADCRUMB START -->
        <!-- <nav aria-label="breadcrumb">
          <ol class="breadcrumb">
            <li class="breadcrumb-item active" aria-current="page">Home</li>
          </ol>
        </nav> -->
        <!-- BREADCRUMB END -->
        <h1 class="h2">Dashboard</h1>
        <p>This is the homepage to see overall business statistics</p>

        <div class="row my-4">
          <div class="col-12 col-md-6 col-lg-3 mb-4 mb-lg-0">
            <div class="card">
              <h5 class="card-header">Companies</h5>
              <div class="card-body">
                <h5 class="card-title">{{ countCompanies }}</h5>
                  <p class="card-text text-success">in database</p>
              </div>
            </div>
          </div>
          <div class="col-12 col-md-6 col-lg-3 mb-4 mb-lg-0">
            <div class="card">
              <h5 class="card-header">Stakeholders</h5>
              <div class="card-body">
                <h5 class="card-title">{{ countStakeholders }}</h5>
                  <p class="card-text text-success">in database</p>
              </div>
            </div>
          </div>
          <div class="col-12 col-md-6 col-lg-3 mb-4 mb-lg-0">
            <div class="card">
              <h5 class="card-header">Licenses</h5>
              <div class="card-body">
                <h5 class="card-title">{{ countLicenses }}</h5>
                  <p class="card-text text-success">in database</p>
              </div>
            </div>
          </div>
        </div>


        <!-- TABLE PREVIEW START -->
        <div class="row">
          <div class="col-12 col-xl-8 mb-4 mb-lg-0">
            <div class="card">
              <h5 class="card-header">Companies</h5>
              <div class="card-body">
                <div class="table-responsive">
                  <table class="table">
                    <thead>
                      <tr>
                        <th scope="col">Name</th>
                        <th scope="col">EIN</th>
                        <th scope="col">Stakeholders</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="company, index in Companies.slice(0, 4)" :key="company.c_id">
                        <td>{{ company.c_name }}</td>
                        <td>{{ company.c_ein }}</td>
                        <td>{{ CompanyStakeholders[index] }}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                  <router-link to="/companies" class="btn btn-block btn-light">View All</router-link>
              </div>
            </div>
          </div>
        </div>
        <!-- TABLE PREVIEW END -->

      </main>
      <!-- DASHBOARD END -->

    </div>
  </div>
</template>

<script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        Companies: [],
        CompanyStakeholders: [],
        Stakeholders: 0,
        Licenses: 0,
        response: 0,
      }
      
    },

    computed: {
      // get total companies in DB
      countCompanies() {
        return this.Companies.length
      },

      // get total stakeholders in DB
      countStakeholders() {
        axios.get('http://localhost:8080/api/stakeholders').then(res => {
          this.Stakeholders = res.data.length
        })
        return this.Stakeholders
      },

      // get total licenses in DB
      countLicenses() {
        axios.get(`http://localhost:8080/api/company_licenses`).then(res => {
          this.Licenses = res.data.length
        })
        return this.Licenses
      }
    },

    created() {
      // Call api to get all companies
      let apiURL = 'http://localhost:8080/api/companies';
      axios.get(apiURL).then(res => {
        // Set Companies list to hold all companies
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

        console.log(this.CompanyStakeholders)

      }).catch(error => {
        console.log(error)
      });
    },

  }
</script>

<style>
  .sidebar {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    z-index: 100;
    padding: 50px 0 0;
    box-shadow: inset -1px 0 0 rgba(0, 0, 0, .1);
    z-index: 99;
  }

  @media (max-width: 767.98px) {
    .sidebar {
      top: 11.5rem;
      padding: 0;
    }
  }

  .navbar {
    box-shadow: inset 0 -1px 0 rgba(0, 0, 0, .1);
  }

  @media (min-width: 767.98px) {
    .navbar {
      top: 0;
      position: sticky;
      z-index: 999;
    }
  }

  .sidebar .nav-link {
    color: #333;
  }

  .sidebar .nav-link.active {
    color: #0d6efd;
  }
</style>
