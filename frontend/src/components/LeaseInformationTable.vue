<!-- 
  Component to display the lease related details for a location.
  first_date_op
  purchase_price
  purchase_date
  lease_exp_date
  rent
  property_owner_company
  property_owner_ein
 -->

 <template>
  <div class="row justify-content-center">
    <div class="col-12 col-xl-8 mb-4 mb-lg-0">
      <!-- <div class="col-12 col-md-4 col-lg-2 d-flex align-items-center flex-nowrap">
        <input class="form-control form-control-dark" type="text" placeholder="Search Stakeholder" aria-label="Search" v-model="filter">
      </div> -->
      <div class="card">
        <h5 class="card-header">Locations</h5>
        <div class="card-body">
          <div class="table-responsive">
            <table class="table">
              <thead>
                <tr>
                  <th scope="col">First Date Opened</th>
                  <th scope="col">Purchase Price</th>
                  <th scope="col">Purchase Date</th>
                  <th scope="col">Lease Expiration Date</th>
                  <th scope="col">Rent</th>
                  <th scope="col">Property Owner Company</th>
                  <th scope="col">Property Owner EIN</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{{ Location.first_date_op}}</td>
                  <td>${{ Location.purchase_price }}</td>
                  <td>{{ Location.purchase_date }}</td>
                  <td>{{ Location.lease_exp_date }}</td>
                  <td>${{ Location.rent }}</td>
                  <td>{{ Location.property_owner_company }}</td>
                  <td>{{ Location.property_owner_ein }}</td>
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
            // Object to store model data
              Location: {}
          }
      },
      created(){
          let apiURL = `http://localhost:8080/api/locations/${this.$route.params.loc_id}`;
          axios.get(apiURL).then(res =>{
              this.Location = res.data;
              // console.log(this.Location)
          }).catch(error =>{
              console.log(error)
          });     
      },
      methods: {

      }
  }
</script>