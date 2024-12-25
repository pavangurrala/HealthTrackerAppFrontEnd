<template>
  <div class="container-fluid" >
    <h3 class="text-center">User Management</h3>
    <div class="row">
      <div class="col-6" style="height: 770px; overflow-y: auto;">
        <table class="table table-striped float-start">
          <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">Weight</th>
            <th scope="col">Height</th>
            <th scope="col">Gender</th>
            <th scope="col">DateOfBirth</th>
            <th scope="col">Actions</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="user in data" :key="user.id">
            <td>{{user.id}}</td>
            <td>
              <div v-if="rowBeingEdited == user.id">
                <input type="text" class="form-control" v-model="editableUser.name"/>
              </div>
              <div v-else>
                <router-link  :to="{ name: 'OverViewPage', params: { userID: user.id } }">
                  {{user.name}}
                </router-link>
              </div>
            </td>
            <td>
              <div v-if="rowBeingEdited == user.id">
                <input type="email" class="form-control" v-model="editableUser.email"/>
              </div>
              <div v-else>
                {{user.email}}
              </div>
            </td>
            <td>
              <div v-if="rowBeingEdited == user.id">
                <input type="number" class="form-control" v-model="editableUser.weight"/>
              </div>
              <div v-else>
                {{user.weight}}
              </div>
            </td>
            <td>
              <div v-if="rowBeingEdited == user.id">
                <input type="number" class="form-control" v-model="editableUser.height"/>
              </div>
              <div v-else>
                {{user.height}}
              </div>
            </td>
            <td>
              <div v-if="rowBeingEdited == user.id">
                <input type="text" class="form-control" v-model="editableUser.gender"/>
              </div>
              <div v-else>
                {{user.gender}}
              </div>
            </td>
            <td>
              <div v-if="rowBeingEdited == user.id">
                <input type="date" class="form-control" v-model="editableUser.dateofbirth"/>
              </div>
              <div v-else>
                {{user.dateofbirth}}
              </div>
            </td>
<!--            <td>{{user.email}}</td>-->
<!--            <td>{{user.weight}}</td>-->
<!--            <td>{{user.height}}</td>-->
<!--            <td>{{user.gender}}</td>-->
<!--            <td>{{user.dateofbirth}}</td>-->
            <td>
              <!-- Update Icon -->
              <div v-if="rowBeingEdited === user.id">
                <button class="btn btn-success btn-sm me-2" @click="updateUser">Update</button>
                <button class="btn btn-success btn-sm me-2" @click="cancelEdit">Cancel</button>
              </div>
              <div v-else>
                <i
                    class="bi bi-pencil-square text-primary me-3"
                    style="cursor: pointer"
                    @click="editUser(user)"
                ></i>
                <!-- Delete Icon -->
                <i
                    class="bi bi-trash text-danger"
                    style="cursor: pointer"
                    @click="deleteUser(user.id)"
                ></i>
              </div>

            </td>
          </tr>
          </tbody>
        </table>
      </div>
      <div class="col-6">
        <h2 class="mb-4">User Form</h2>
        <form @submit.prevent="submitUserData">
          <div class="row mb-3">
            <label for="id" class="col-sm-2 col-form-label">UserID</label>
            <div class="col-sm-10">
              <input type="text" class="form-control" id="id" placeholder="Enter User ID" v-model="data.id" autocomplete="id" required>
            </div>
          </div>
          <!-- Name Field -->
          <div class="row mb-3">
            <label for="name" class="col-sm-2 col-form-label">Name</label>
            <div class="col-sm-10">
              <input type="text" class="form-control" id="name" placeholder="Enter name" v-model="data.name" autocomplete="name" required>
            </div>
          </div>
          <div class="row mb-3">
            <label for="email" class="col-sm-2 col-form-label">Email</label>
            <div class="col-sm-10">
              <input type="text" class="form-control" id="email"  placeholder="Enter Email" v-model="data.email" autocomplete="email" required>
            </div>
          </div>
          <div class="row mb-3">
            <label for="weight" class="col-sm-2 col-form-label">Weight</label>
            <div class="col-sm-10">
              <input type="text" class="form-control" id="weight" placeholder="Enter Weight" v-model="data.weight" autocomplete="weight" required>
            </div>
          </div>
          <div class="row mb-3">
            <label for="height" class="col-sm-2 col-form-label">Height</label>
            <div class="col-sm-10">
              <input type="text" class="form-control" id="height" placeholder="Enter Height" v-model="data.height" autocomplete="height" required>
            </div>
          </div>
          <div class="row mb-3">
            <label for="gender" class="col-sm-2 col-form-label">Gender</label>
            <div class="col-sm-10">
              <select class="form-select" id="gender" v-model="data.gender" required>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>

          </div>
          <div class="row mb-3">
            <label for="dateofbirth" class="col-sm-2 col-form-label">Date Of Birth</label>
            <div class="col-sm-10">
              <input type="date" class="form-control" id="dateofbirth" placeholder="Enter Date of Birth" v-model="data.dateofbirth" autocomplete="dateofbirth" required>
            </div>
          </div>

          <div class="row">
            <div class="col-sm-10 offset-sm-2">
              <button type="submit" class="btn btn-primary me-2" @click="actiontype='add'">Add</button>
            </div>
          </div>
        </form>
        <br/>
        <div class="card">
          <div class="card-header"><h5>Search By User ID</h5></div>
          <div class="card-body">
            <div class="d-flex align-items-center mb3">
              <select class="form-select me-2" v-model="selectedUserID">
                <option disabled value="">Select User ID</option>
                <option v-for="user in data" :key="user.id" :value="user.id">
                  {{user.id}}
                </option>
              </select>
              <button class="btn btn-primary" id="searchbtn" @click="searchUser">Search</button>
            </div>
          </div>
        </div>
        <div class="mt-4" v-if="showTable">
          <div class="card-header"><h5>User Details</h5></div>
          <div class="card-body">
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
                <th scope="col">Actions</th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="user in filteredData" :key="user.id">
                <td>{{userDetails.id}}</td>
                <td>
                  <div v-if="rowBeingEdited == user.id">
                    <input type="text" class="form-control" v-model="editableUser.name"/>
                  </div>
                  <div v-else>
                    {{userDetails.name}}
                  </div>
                </td>
                <td>
                  <div v-if="rowBeingEdited == user.id">
                    <input type="email" class="form-control" v-model="editableUser.email"/>
                  </div>
                  <div v-else>
                    {{userDetails.email}}
                  </div>
                </td>
                <td>
                  <div v-if="rowBeingEdited == user.id">
                    <input type="number" class="form-control" v-model="editableUser.weight"/>
                  </div>
                  <div v-else>
                    {{userDetails.weight}}
                  </div>
                </td>
                <td>
                  <div v-if="rowBeingEdited == user.id">
                    <input type="number" class="form-control" v-model="editableUser.height"/>
                  </div>
                  <div v-else>
                    {{userDetails.height}}
                  </div>
                </td>
                <td>
                  <div v-if="rowBeingEdited == user.id">
                    <input type="text" class="form-control" v-model="editableUser.gender"/>
                  </div>
                  <div v-else>
                    {{userDetails.gender}}
                  </div>
                </td>
                <td>
                  <div v-if="rowBeingEdited == user.id">
                    <input type="date" class="form-control" v-model="editableUser.dateofbirth"/>
                  </div>
                  <div v-else>
                    {{userDetails.dateofbirth}}
                  </div>
                </td>
                <!--            <td>{{user.email}}</td>-->
                <!--            <td>{{user.weight}}</td>-->
                <!--            <td>{{user.height}}</td>-->
                <!--            <td>{{user.gender}}</td>-->
                <!--            <td>{{user.dateofbirth}}</td>-->
                <td>
                  <!-- Update Icon -->
                  <div v-if="rowBeingEdited === user.id">
                    <button class="btn btn-success btn-sm me-2" @click="updateSearchedUser">Update</button>
                    <button class="btn btn-success btn-sm me-2" @click="cancelEdit">Cancel</button>
                  </div>
                  <div v-else>
                    <i
                        class="bi bi-pencil-square text-primary me-3"
                        style="cursor: pointer"
                        @click="editUser(user)"
                    ></i>
                    <!-- Delete Icon -->
                    <i
                        class="bi bi-trash text-danger"
                        style="cursor: pointer"
                        @click="deleteSearchUser(user.id)"
                    ></i>
                  </div>
                </td>
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
import axios from 'axios';

export default {
  data() {
    return {
      sortAscending: true,
      data: [], // Holds the fetched data
      rowBeingEdited: null, // Tracks the row being edited
      editableUser: {}, // Holds the data of the user being edited
      selectedUserID:"",
      showTable:false,
      userDetails: {},
      userDataF:[],
      actiontype:"",
    };
  },
  computed:{
    filteredData(){
      return this.data.filter(data => data.id === this.selectedUserID)
    }
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
    editUser(user) {
      this.rowBeingEdited = user.id;
      this.editableUser = { ...user }; // Clone the user data
    },

    // Cancel editing
    cancelEdit() {
      this.rowBeingEdited = null;
      this.editableUser = {}; // Clear the editableUser object
    },
    async updateUser(){
      try{
        const headers = {
          'Content-Type': 'application/json', // Ensure this header is set
          "Access-Control-Allow-Origin": "*",
        };
        const response = await axios.patch(`http://localhost:7001/api/users/${this.editableUser.id}`, this.editableUser,{headers});
        alert("User Updated Successfully");
        console.log(response.data)
        await this.fetchUserData();
        this.cancelEdit();
      }catch(error){
        console.error("error updating user:", error)
        alert("Failed to update user. Please try again.");
      }
    },
    async updateSearchedUser(){

      try{
        const headers = {
          'Content-Type': 'application/json', // Ensure this header is set
          "Access-Control-Allow-Origin": "*",
        };
        const response = await axios.patch(`http://localhost:7001/api/users/${this.editableUser.id}`, this.editableUser,{headers});
        alert("User Updated Successfully");
        console.log(response.data)
        await this.fetchUserData();
        await this.searchUser();
        this.cancelEdit();
      }catch(error){
        console.error("error updating user:", error)
        alert("Failed to update user. Please try again.");
      }
    },
    async deleteUser(userId){
      if(confirm("Do you want to delete this user?")){
        try{
          await axios.delete(`http://localhost:7001/api/users/${userId}`);
          alert("User Deleted Successfully");
          await this.fetchUserData();
        }catch(error){
          console.error("Error Deleting User:", error);
          alert("failed to delete user, please try again")
        }
      }
    },
    async deleteSearchUser(userId){
      if(confirm("Do you want to delete this user?")){
        try{
          await axios.delete(`http://localhost:7001/api/users/${userId}`);
          alert("User Deleted Successfully");
          await this.fetchUserData();
          await this.searchUser();
        }catch(error){
          console.error("Error Deleting User:", error);
          alert("failed to delete user, please try again")
        }
      }
    },
    async searchUser(){
      if(!this.selectedUserID){
        alert("Please select a User ID");
        return;
      }
      try{
        const headers = {
          'Content-Type': 'application/json', // Ensure this header is set
          "Access-Control-Allow-Origin": "*",
        };
        const response = await axios.get(`http://localhost:7001/api/users/${this.selectedUserID}`,{headers});
        this.userDetails = response.data
        console.log(this.userDetails)
        this.showTable = true;
      }catch(error){
        console.error("error fetching user details:", error);
        alert("User not found");
        this.showTable = false;
      }
    },
    async submitUserData(){
      try{
        let response;
        const headers = {
          'Content-Type': 'application/json', // Ensure this header is set
          "Access-Control-Allow-Origin": "*",
        };
        switch (this.actiontype){
          case "add":
            response = await axios.post("http://localhost:7001/api/users", {
              id:this.data.id,
              name: this.data.name,
              email: this.data.email,
              weight: this.data.weight,
              height: this.data.height,
              gender: this.data.gender,
              dateofbirth: this.data.dateofbirth}, { headers });
            console.log(this.data)
            alert("User Successfully Added");
            await this.fetchUserData();
            break;
          default:
            alert("Please Select an option");
            return;
        }
        console.log(response.data)
      }catch(error){
        console.error(error);
        alert("There was an error with the operation.");
      }
    }
  },
  mounted() {
    this.fetchUserData();
  },
  name: "UsersPage",
}
</script>
<style scoped>

</style>