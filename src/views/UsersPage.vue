


<template>
  <div class="container mt-4">
    <h3 class="text-center">User Table</h3>
    <table class="table table-striped">
      <thead>
      <tr>
        <th scope="col">ID</th>
        <th scope="col">Name</th>
        <th scope="col">Email</th>
        <th scope="col">Weight</th>
        <th scope="col">Height</th>
        <th scope="col">Gender</th>
        <th scope="col">DateOfBirth</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="user in data" :key="user.id">
        <td>{{user.id}}</td>
        <td>{{user.name}}</td>
        <td>{{user.email}}</td>
        <td>{{user.weight}}</td>
        <td>{{user.height}}</td>
        <td>{{user.gender}}</td>
        <td>{{user.dateofbirth}}</td>
      </tr>
      </tbody>
    </table>


  </div>
</template>
<script>
import axios from 'axios';
export default {
  data() {
    return {
      sortAscending: true,
      data: [], // Holds the fetched data
    };
  },
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
        this.data = response.data.map((data) =>({
          ...data,
          id:Number(data.id)
        })).sort((a,b)=>a.id - b.id)

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    },
  },
  mounted() {
    this.fetchUserData();
  },
  name: "UsersPage",
}
</script>
<style scoped>

</style>