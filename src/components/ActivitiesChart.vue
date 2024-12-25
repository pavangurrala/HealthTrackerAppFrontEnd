<template>
<div class="col">
  <canvas id="activitieschart" style="width: 50%; height: 110px;"></canvas>
</div>
</template>
<script>
import { Chart, registerables } from 'chart.js';
import {ref} from 'vue';
import axios from "axios";
export default {
  data(){
    return{
      userID:null,
      userActivities:[],
      calories:[],
      description:[],
      duration:[]
    }
  },
  methods:{
      async getUserActivities(){
        try{
          const response = await axios({
            method: 'GET',
            url: `http://localhost:7001/api/activities/${this.userID}`,
            //url: `https://healthtrackerapp-production.up.railway.app/api/activities/${this.userID}`,
            headers: {
              "Access-Control-Allow-Origin": "*",
              "Content-Type": "application/json",
            },
            withCredentials:true
          })
          this.userActivities = response.data.map((data) =>({
            ...data,
            id:Number(data.id)
          })).sort((a,b)=>a.id - b.id)
          this.description = this.userActivities.map(activity => activity.description)
          this.calories = this.userActivities.map(activity => activity.calories)
          this.duration = this.userActivities.map(activity => activity.duration)
          Chart.register(...registerables);
          const chartInstance = ref(null);
          const Description = this.description
          const calories = this.calories
          console.log(this.description)
          console.log(this.calories)
          chartInstance.value = new Chart(document.getElementById('activitieschart'), {
            type: 'line',
            data: {
              labels: Description,
              datasets: [
                {
                  label: 'Calories Burnt',
                  data: calories,
                  borderColor: 'rgba(75, 192, 192, 1)',
                  borderWidth: 2,
                  fill: false,
                  tension: 0.4,
                },
                {
                  label: 'Duration',
                  data: this.duration,
                  borderColor: 'rgba(255, 99, 132, 1)',
                  borderWidth: 2,
                  fill: false,
                  tension: 0.4,
                },
              ],
            },
            options: {
              responsive: true,
              plugins: {
                legend: {
                  position: 'top',
                },
              },
              scales: {
                x: {
                  type:'category',
                  title: {
                    display: true,
                    text: 'Activity Name',
                  },
                },
                y: {
                  type:'linear',
                  title: {
                    display: true,
                    text: 'Duration (In Mins)',
                  },
                  beginAtZero: true,
                },
              },
            },
          })
          return{};


        }catch(error){
          console.error(error)
        }


      }
  },

  created() {
    this.userID = this.$route.params.userID
    console.log("received this userid",this.userID)
  },
  name:"ActivitiesChart",
  mounted() {
    console.log("received this userid for activities",this.userID)
    this.getUserActivities();

  }
}

</script>
<style>

</style>