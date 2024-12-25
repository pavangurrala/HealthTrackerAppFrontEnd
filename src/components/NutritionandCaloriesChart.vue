<template>
  <div class="col">
    <canvas id="ncchart" style="width: 50%; height: 110px;"></canvas>
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
      userNCRecords:[],
      calories:[],
      nutrients:[],
      foodName:[]
    }
  },
  methods:{
    async getNutritionandCalorieRecords(){
      try {
        const response = await axios({
          method: 'GET',
          url: `http://localhost:7001/api/nutritionandcalories/${this.userID}`,
          //url: `https://healthtrackerapp-production.up.railway.app/api/nutritionandcalories/${this.userID}`,
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
          },
          withCredentials:true
        })
        this.userNCRecords = response.data.map((data) =>({
          ...data,
          id:Number(data.id)
        })).sort((a,b)=>a.id - b.id)
        this.calories = this.userNCRecords.map(ncrecord => ncrecord.caloriecount)
        this.nutrients = this.userNCRecords.map(ncrecord => ncrecord.nutrients)
        this.foodName = this.userNCRecords.map(ncrecord => ncrecord.foodtaken)
        Chart.register(...registerables);
        const chartInstance = ref(null);
       chartInstance.value = new Chart(document.getElementById('ncchart'),{
         type: 'line',
         data:{
           labels:this.foodName,
           datasets:[
               {
                 label: 'Calories',
                 data: this.calories,
                 borderColor: 'rgba(75, 192, 192, 1)',
                 borderWidth: 2,
                 fill: false,
                 tension: 0.4,
               },
             {
               label: 'Nutrients',
               data: this.nutrients,
               borderColor: 'rgba(255, 99, 132, 1)',
               borderWidth: 2,
               fill: false,
               tension: 0.4,
             },
           ],
         },
         options:{
           responsive: true,
           plugins: {
             legend: {
               position: 'top',
             },
           },
           scales:{
             x: {
               type:'category',
               title: {
                 display: true,
                 text: 'Food',
               },
             },
             y: {
               type:'linear',
               title: {
                 display: true,
                 text: 'Values',
               },
               beginAtZero: true,
             },
           },
         },
       })
        return{};
      }
      catch(error){
        console.error(error)
      }
    }
  },
  created() {
    this.userID = this.$route.params.userID
    console.log("received this userid",this.userID)
  },
  name:"NutritionandCaloriesChart",
  mounted() {
    this.getNutritionandCalorieRecords();
  }
}
</script>
<style>

</style>