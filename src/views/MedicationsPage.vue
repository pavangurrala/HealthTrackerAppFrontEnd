

<template>
<div>
  <p>medications page</p>
</div>
</template>
<script>
import axios from 'axios';
export default {
  async fetchAllUserMedications(){
    try {
      const response = await axios({
        method: 'GET',
        url: 'http://localhost:7001/api/medicationtracker',
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
  name:"UserMedications"
}
</script>
<style scoped>

</style>