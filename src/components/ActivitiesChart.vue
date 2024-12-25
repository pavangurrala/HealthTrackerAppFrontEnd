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
      description:[]
    }
  },
  methods:{
      async getUserActivities(){
        try{
          const response = await axios({
            method: 'GET',
            url: `http://localhost:7001/api/activities/${this.userID}`,
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
                  label: 'Activities',
                  data: calories,
                  borderColor: 'rgba(75, 192, 192, 1)',
                  borderWidth: 2,
                  fill: false,
                },
              ],
            },
            options: {
              responsive: true,
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
                    text: 'Calories Burnt',
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