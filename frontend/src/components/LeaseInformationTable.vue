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
  <div class="row justify-content-center" v-if="isAuthenticated">
    <table class="table table-striped">
      <thead class="table-dark">
        <tr>
          <th>First Date Opened</th>
          <th>Purchase Price</th>
          <th>Purchase Date</th>
          <th>Lease Expiration Date</th>
          <th>Rent</th>
          <th>Property Owner Company</th>
          <th>Property Owner EIN</th>
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