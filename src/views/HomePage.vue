

<template>
  <br/>
  <div class="row">
    <div class="col">
      <div class="card">
        <h5 class="card-header">Registered Users</h5>
        <div class="card-body">
          <h5 class="card-title">{{users.length}} users</h5>
          <router-link class="btn btn-primary" to="/users">More Details...</router-link>
        </div>
      </div>
    </div>
    <div class="col">
      <div class="card">
        <h5 class="card-header">Total Activities</h5>
        <div class="card-body">
          <h5 class="card-title">{{activities.length}} activities</h5>
          <router-link class="btn btn-primary" to="/activities">More Details...</router-link>
        </div>
      </div>
    </div>
  </div>
  <br/>
  <div class="row">
    <div class="col">
      <div class="card">
        <h5 class="card-header">User Appointments</h5>
        <div class="card-body">
          <h5 class="card-title">{{appointments.length}} appointments</h5>
          <router-link class="btn btn-primary" to="/appointments">More Details...</router-link>
        </div>
      </div>
    </div>
    <div class="col">
      <div class="card">
        <h5 class="card-header">User Medications</h5>
        <div class="card-body">
          <h5 class="card-title">{{medications.length}} medications</h5>
          <router-link class="btn btn-primary" to="/medications">More Details...</router-link>
        </div>
      </div>
    </div>
  </div>
  <br/>
  <div class="row">
    <div class="col">
      <div class="card">
        <h5 class="card-header">User Lab Reports</h5>
        <div class="card-body">
          <h5 class="card-title">{{labreports.length}} lab reports</h5>
          <router-link class="btn btn-primary" to="/labreports">More Details...</router-link>
        </div>
      </div>
    </div>
    <div class="col">
      <div class="card">
        <h5 class="card-header">User Nutrition and Calories Tracker</h5>
        <div class="card-body">
          <h5 class="card-title">{{nutritionandCalories.length}} User Nutrition and Calorie Records</h5>
          <router-link class="btn btn-primary" to="/nutritionandcaloriestracker">More Details...</router-link>
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
    activities:[],
    appointments:[],
    medications:[],
    labreports:[],
    nutritionandCalories:[],
    apibaseUrl : 'https://healthtrackerapp-production.up.railway.app',
    //apibaseUrl : 'http://localhost:7001',
  }),
  methods: {
    async fetchUserData() {
      try {
        const response = await axios({
          method: 'GET',
          url: `${this.apibaseUrl}/api/users`,
          //url:'https://healthtrackerapp-production.up.railway.app/api/users',
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
          url: `${this.apibaseUrl}/api/activities`,
          //url: 'https://healthtrackerapp-production.up.railway.app/api/activities',
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
    },
    async fetchUserAppointments(){
      try {
        const response = await axios({
          method: 'GET',
          url: `${this.apibaseUrl}/api/appointmentscheduler`,
          //url: 'https://healthtrackerapp-production.up.railway.app/api/appointmentscheduler',
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
          },
          withCredentials:true
        })
        this.appointments = response.data

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    },
    async fetchUserMedications(){
      try {
        const response = await axios({
          method: 'GET',
          url: `${this.apibaseUrl}/api/medicationtracker`,
          //url: 'https://healthtrackerapp-production.up.railway.app/api/medicationtracker',
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
          },
          withCredentials:true
        })
        this.medications = response.data

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    },
    async fetchUserLabReports(){
      try {
        const response = await axios({
          method: 'GET',
          url: `${this.apibaseUrl}/api/labreports`,
          //url: 'https://healthtrackerapp-production.up.railway.app/api/labreports',
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
          },
          withCredentials:true
        })
        this.labreports = response.data

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    },
    async fetchUserNutritionandCalories(){
      try {
        const response = await axios({
          method: 'GET',
          url: `${this.apibaseUrl}/api/nutritionandcalories`,
          //url: 'https://healthtrackerapp-production.up.railway.app/api/nutritionandcalories',
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
          },
          withCredentials:true
        })
        this.nutritionandCalories = response.data

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    },
  },
  mounted() {
    this.fetchUserData();
    this.fetchUserActivities();
    this.fetchUserAppointments();
    this.fetchUserMedications();
    this.fetchUserLabReports();
    this.fetchUserNutritionandCalories();
  },
  name: "HomePage",
}
</script>
<style scoped>

</style>