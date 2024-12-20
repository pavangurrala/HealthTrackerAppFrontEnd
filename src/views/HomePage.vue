

<template>
  <div class="row">
    <div class="col">
      <div class="card">
        <h5 class="card-header">Registered Users</h5>
        <div class="card-body">
          <h5 class="card-title">{{users.length}} users</h5>
          <a href="/users" class="btn btn-primary">More Details...</a>
        </div>
      </div>
    </div>
    <div class="col">
      <div class="card">
        <h5 class="card-header">Total Activities</h5>
        <div class="card-body">
          <h5 class="card-title">{{activities.length}} activities</h5>
          <a href="/activities" class="btn btn-primary">More Details...</a>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from 'axios';
export default {
  data: ()=>({
    users:[],
    activities:[]
  }),
  methods: {
    async fetchUserData() {
      try {
        const response = await axios({
          method: 'GET',
          url: 'http://localhost:7001/api/users',
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
          },
          withCredentials:true
        })

        this.users = response.data.map((data) =>({
          ...data,
          id:Number(data.id)
        })).sort((a,b)=>a.id - b.id)

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    },
    async fetchUserActivities(){
      try {
        const response = await axios({
          method: 'GET',
          url: 'http://localhost:7001/api/activities',
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
          },
          withCredentials:true
        })
        this.activities = response.data

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
  },
  mounted() {
    this.fetchUserData();
    this.fetchUserActivities();
  },
  name: "HomePage",
}
</script>
<style scoped>

</style>