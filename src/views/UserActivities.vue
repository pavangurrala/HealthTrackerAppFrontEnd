<template>
  <div class="container-fluid">
    <h3 class="text-center">User Activities</h3>
    <div class="row">
      <div class="col-7" style="height: 770px; overflow-y: auto;">
        <table class="table table-striped float-start" >
          <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Description</th>
            <th scope="col">Duration</th>
            <th scope="col">Calories Burnt</th>
            <th scope="col">Activity Start Time</th>
            <th scope="col">UserID</th>
            <th scope="col">Actions</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="activity in data" :key="activity.id">
            <td>{{activity.id}}</td>
            <td>
              <div v-if="rowBeingEdited == activity.id">
                <input type="text" class="form-control" v-model="editableActivity.description"/>
              </div>
              <div v-else>
                {{activity.description}}
              </div>
            </td>
            <td>
              <div v-if="rowBeingEdited == activity.id">
                <input type="text" class="form-control" v-model="editableActivity.duration"/>
              </div>
              <div v-else>
                {{activity.duration}}
              </div>
            </td>
            <td>
              <div v-if="rowBeingEdited == activity.id">
                <input type="text" class="form-control" v-model="editableActivity.calories"/>
              </div>
              <div v-else>
                {{activity.calories}}
              </div>
            </td>
            <td>
              <div v-if="rowBeingEdited == activity.id">
                <input type="datetime-local" class="form-control" v-model="editableActivity.started"/>
              </div>
              <div v-else>
                {{activity.started}}
              </div>
            </td>
            <td>
              <div v-if="rowBeingEdited == activity.id">
                <input type="text" class="form-control" v-model="editableActivity.userId"/>
              </div>
              <div v-else>
                {{activity.userId}}
              </div>
            </td>
            <td>
              <!-- Update Icon -->
              <div v-if="rowBeingEdited === activity.id">
                <button class="btn btn-success btn-sm me-2" @click="updateActivity">Update</button>
                <button class="btn btn-success btn-sm me-2" @click="cancelEdit">Cancel</button>
              </div>
              <div v-else>
                <i
                    class="bi bi-pencil-square text-primary me-3"
                    style="cursor: pointer"
                    @click="editActivity(activity)"
                ></i>
                <!-- Delete Icon -->
                <i
                    class="bi bi-trash text-danger"
                    style="cursor: pointer"
                    @click="deleteActivity(activity.id)"
                ></i>
              </div>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
      <div class="col-5">
        <div class="card">
          <div class="card-header"><h5>Add Activity</h5></div>
          <div class="card-body">
            <div class="d-flex align-items-center mb3">
              <form @submit.prevent="submitActivityData">
                <div class="row mb-3">
                  <label for="description" class="col-sm-4 col-form-label">Description</label>
                  <div class="col-sm-8">
                    <input type="text" class="form-control" id="description" placeholder="Enter the activity" v-model="data.description" autocomplete="description" required>
                  </div>
                </div>
                <!-- Name Field -->
                <div class="row mb-3">
                  <label for="duration" class="col-sm-4 col-form-label">Duration</label>
                  <div class="col-sm-8">
                    <input type="text" class="form-control" id="duration" placeholder="Enter duration" v-model="data.duration" autocomplete="duration" required>
                  </div>
                </div>
                <div class="row mb-3">
                  <label for="calories" class="col-sm-4 col-form-label">Calories Burnt</label>
                  <div class="col-sm-8">
                    <input type="text" class="form-control" id="calories"  placeholder="Enter calories" v-model="data.calories" autocomplete="calories" required>
                  </div>
                </div>
                <div class="row mb-3">
                  <label for="started" class="col-sm-4 col-form-label">Activity Start</label>
                  <div class="col-sm-8">
                    <input type="datetime-local" class="form-control" id="started" placeholder="Enter Start Date Time" v-model="data.started" autocomplete="started" required>
                  </div>
                </div>
                <div class="row mb-3 align-items-center">
                  <label for="userId" class="col-sm-4 col-form-label">User ID</label>
                  <div class="col-sm-8">
                    <select class="form-select" v-model="data.userId">
                      <option disabled value="">Select User ID</option>
                      <option v-for="user in userData" :key="user.id" :value="user.id">
                        {{user.id}}
                      </option>
                    </select>
                  </div>

                </div>

                <div class="row">
                  <div class="col-sm-10 offset-sm-2">
                    <button type="submit" class="btn btn-primary me-2" @click="actiontype='add'">Add</button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
        <br/>
        <div class="card">
          <div class="card-header"><h5>Search Activity By User ID</h5></div>
          <div class="card-body">
            <div class="d-flex align-items-center mb3">
              <select class="form-select me-2" v-model="selectedUserID">
                <option disabled value="">Select User ID</option>
                <option v-for="user in userData" :key="user.id" :value="user.id">
                  {{user.id}}
                </option>
              </select>
              <button class="btn btn-primary" id="searchbtn" @click="searchUserActivity">Search</button>
            </div>
          </div>
        </div>
        <div class="mt-4" v-if="showTable">
          <div class="card-header"><h5>User Activity Details</h5></div>
          <div class="card-body">
            <table class="table table-striped">
                <thead>
                  <tr>
                    <th scope="col">ID</th>
                    <th scope="col">Description</th>
                    <th scope="col">Duration</th>
                    <th scope="col">Calories Burnt</th>
                    <th scope="col">Activity Start Time</th>
                    <th scope="col">UserID</th>
                    <th scope="col">Actions</th>
                  </tr>
                </thead>
                <tbody>
                <tr v-for="activity in useractivityDetails" :key="activity.id">
                  <td>{{activity.id}}</td>
                  <td>
                    <div v-if="rowBeingEdited == activity.id">
                      <input type="text" class="form-control" v-model="editableActivity.description"/>
                    </div>
                    <div v-else>
                      {{activity.description}}
                    </div>
                  </td>
                  <td>
                    <div v-if="rowBeingEdited == activity.id">
                      <input type="text" class="form-control" v-model="editableActivity.duration"/>
                    </div>
                    <div v-else>
                      {{activity.duration}}
                    </div>
                  </td>
                  <td>
                    <div v-if="rowBeingEdited == activity.id">
                      <input type="text" class="form-control" v-model="editableActivity.calories"/>
                    </div>
                    <div v-else>
                      {{activity.calories}}
                    </div>
                  </td>
                  <td>
                    <div v-if="rowBeingEdited == activity.id">
                      <input type="datetime-local" class="form-control" v-model="editableActivity.started"/>
                    </div>
                    <div v-else>
                      {{activity.started}}
                    </div>
                  </td>
                  <td>
                    <div v-if="rowBeingEdited == activity.id">
                      <input type="text" class="form-control" v-model="editableActivity.userId"/>
                    </div>
                    <div v-else>
                      {{activity.userId}}
                    </div>
                  </td>
                  <td>
                    <!-- Update Icon -->
                    <div v-if="rowBeingEdited === activity.id">
                      <button class="btn btn-success btn-sm me-2" @click="updateSearchedActivity">Update</button>
                      <button class="btn btn-success btn-sm me-2" @click="cancelEdit">Cancel</button>
                    </div>
                    <div v-else>
                      <i
                          class="bi bi-pencil-square text-primary me-3"
                          style="cursor: pointer"
                          @click="editActivity(activity)"
                      ></i>
                      <!-- Delete Icon -->
                      <i
                          class="bi bi-trash text-danger"
                          style="cursor: pointer"
                          @click="deleteSearchActivity(activity.id)"
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
  data(){
    return{
      data: [],
      userData:[],
      rowBeingEdited: null,
      editableActivity: {},
      selectedUserID:"",
      showTable:false,
      useractivityDetails: {},
      actiontype:"",
    }
  },
  computed:{
    filteredData(){
      return this.data.filter(data => data.id === this.selectedUserID)
    }
  },
  methods:{
    async fetchAllActivities(){
      try{
          const response = await axios({
            method: "GET",
            url: 'http://localhost:7001/api/activities',
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
        console.log(this.data)
      }catch(error){
        console.error("error fetching the activities", error)
      }
    },
    editActivity(activity) {
      this.rowBeingEdited = activity.id;
      this.editableActivity = { ...activity }; // Clone the user data
    },

    // Cancel editing
    cancelEdit() {
      this.rowBeingEdited = null;
      this.editableActivity = {}; // Clear the editableUser object
    },
    async submitActivityData(){
      try{
        let response;
        const headers = {
          'Content-Type': 'application/json', // Ensure this header is set
          "Access-Control-Allow-Origin": "*",
        };
        switch (this.actiontype){
          case "add":
            response = await axios.post("http://localhost:7001/api/activities", {
              description: this.data.description,
              duration: this.data.duration,
              calories: this.data.calories,
              started: this.data.started,
              userId: this.data.userId,
              }, { headers });
            console.log(this.data)
            alert("Activity Successfully Added");
            await this.fetchAllActivities();
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
    },
    async updateActivity(){
      try{
        const headers = {
          'Content-Type': 'application/json', // Ensure this header is set
          "Access-Control-Allow-Origin": "*",
        };
        const response = await axios.patch(`http://localhost:7001/api/activities/${this.editableActivity.id}`, this.editableActivity,{headers});
        alert("User Activity Updated Successfully");
        console.log(response.data)
        await this.fetchAllActivities();
        this.cancelEdit();
      }catch(error){
        console.error("error updating Activity:", error)
        alert("Failed to update activity. Please try again.");
      }
    },
    async updateSearchedActivity(){
      try{
        const headers = {
          'Content-Type': 'application/json', // Ensure this header is set
          "Access-Control-Allow-Origin": "*",
        };
        const response = await axios.patch(`http://localhost:7001/api/activities/${this.editableActivity.id}`, this.editableActivity,{headers});
        alert("User Activity Updated Successfully");
        console.log(response.data)
        await this.fetchAllActivities();
        await this.searchUserActivity();
        this.cancelEdit();
      }catch(error){
        console.error("error updating Activity:", error)
        alert("Failed to update user. Please try again.");
      }
    },
    async deleteActivity(activityId){
      if(confirm("Do you want to delete this Activity for this user?")){
        try{
          await axios.delete(`http://localhost:7001/api/activities/${activityId}`);
          alert("Activity Deleted Successfully");
          await this.fetchAllActivities();
        }catch(error){
          console.error("Error Deleting Activity:", error);
          alert("failed to delete activity, please try again")
        }
      }
    },
    async deleteSearchActivity(activityId){
      if(confirm("Do you want to delete this Activity for this user?")){
        try{
          await axios.delete(`http://localhost:7001/api/activities/${activityId}`);
          alert("Activity Deleted Successfully");
          await this.fetchAllActivities();
          await this.searchUserActivity();
        }catch(error){
          console.error("Error Deleting Activity:", error);
          alert("failed to delete activity, please try again")
        }
      }
    },
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
        this.userData = response.data
            .map((data) =>({
          ...data,
          id:Number(data.id)
        })).sort((a,b)=>a.id - b.id)

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    },
    async searchUserActivity(){
      if(!this.selectedUserID){
        alert("Please select a User ID");
        return;
      }
      try{
        const headers = {
          'Content-Type': 'application/json', // Ensure this header is set
          "Access-Control-Allow-Origin": "*",
        };
        const response = await axios.get(`http://localhost:7001/api/activities/${this.selectedUserID}`,{headers});
        this.useractivityDetails = response.data
        console.log(this.useractivityDetails)
        this.showTable = true;
      }catch(error){
        console.error("error fetching activity details:", error);
        alert("Activities for this User not found");
        this.showTable = false;
      }
    },
  },
  mounted() {
    this.fetchAllActivities();
    this.fetchUserData();
  },
  name: "UserActivities",
};
</script>