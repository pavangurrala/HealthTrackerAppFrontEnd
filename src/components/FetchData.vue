<template>
  <div>
    <h1>Fetched Data</h1>
    <ul>
      <li v-for="(item, index) in data" :key="index">{{ item }}</li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      data: [], // Holds the fetched data
    };
  },
  methods: {
    async fetchData() {
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
        this.data = response.data;
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    },
  },
  mounted() {
    this.fetchData();
  },
};
</script>
