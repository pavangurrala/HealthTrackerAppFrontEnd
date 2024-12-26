<template>
<div class="container-fluid">
  <h3 class="text-center">User Nutrition And Calories Tracker</h3>
  <div class="row">
    <div class="col-8">
      <div style="height: 400px; overflow-y: auto;">
        <table class="table table-striped float-start">
          <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Food Taken</th>
            <th scope="col">Calorie Count</th>
            <th scope="col">FoodTakenTime</th>
            <th scope="col">WaterIntake</th>
            <th scope="col">Nutrients</th>
            <th scope="col">User ID</th>
            <th scope="col">Actions</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="ncrecord in data" :key="ncrecord.id">
            <td>{{ncrecord.id}}</td>
            <td>
              <div v-if="rowBeingEdited == ncrecord.id">
                <input type="text" class="form-control" v-model="editableNCRecords.foodtaken" required/>
              </div>
              <div v-else>
                {{ncrecord.foodtaken}}
              </div>
            </td>
            <td>
              <div v-if="rowBeingEdited == ncrecord.id">
                <input type="text" class="form-control" v-model="editableNCRecords.caloriecount" required/>
              </div>
              <div v-else>
                {{ncrecord.caloriecount}}
              </div>
            </td>
            <td>
              <div v-if="rowBeingEdited == ncrecord.id">
                <input type="datetime-local" class="form-control" v-model="editableNCRecords.foodtakentime" required/>
              </div>
              <div v-else>
                {{ncrecord.foodtakentime}}
              </div>
            </td>
            <td>
              <div v-if="rowBeingEdited == ncrecord.id">
                <input type="text" class="form-control" v-model="editableNCRecords.waterintake" required/>
              </div>
              <div v-else>
                {{ncrecord.waterintake}}
              </div>
            </td>
            <td>
              <div v-if="rowBeingEdited == ncrecord.id">
                <input type="text" class="form-control" v-model="editableNCRecords.nutrients" required/>
              </div>
              <div v-else>
                {{ncrecord.nutrients}}
              </div>
            </td>
            <td>
              <div v-if="rowBeingEdited == ncrecord.id">
                <input type="text" class="form-control" v-model="editableNCRecords.userid" required/>
              </div>
              <div v-else>
                {{ncrecord.userid}}
              </div>
            </td>
            <td>
              <!-- Update Icon -->
              <div v-if="rowBeingEdited === ncrecord.id">
                <button class="btn btn-success btn-sm me-2" @click="updateNCReport">Update</button>
                <button class="btn btn-success btn-sm me-2" @click="cancelEdit">Cancel</button>
              </div>
              <div v-else>
                <i
                    class="bi bi-pencil-square text-primary me-3"
                    style="cursor: pointer"
                    @click="editNCRecords(ncrecord)"
                ></i>
                <!-- Delete Icon -->
                <i
                    class="bi bi-trash text-danger"
                    style="cursor: pointer"
                    @click="deleteNCRecord(ncrecord.id)"
                ></i>
              </div>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
      <br/>
      <div style="height: 300px; overflow-y: auto;" v-if="showTable">
        <div class="card">
          <div class="card-header"><h5>Nutrition and Calories Records for User</h5></div>
          <div class="card-body">
            <table class="table table-striped float-start">
              <thead>
              <tr>
                <th scope="col">ID</th>
                <th scope="col">Food Taken</th>
                <th scope="col">Calorie Count</th>
                <th scope="col">FoodTakenTime</th>
                <th scope="col">WaterIntake</th>
                <th scope="col">Nutrients</th>
                <th scope="col">User ID</th>
                <th scope="col">Actions</th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="ncrecord in userNCDetails" :key="ncrecord.id">
                <td>{{ncrecord.id}}</td>
                <td>
                  <div v-if="rowBeingEdited == ncrecord.id">
                    <input type="text" class="form-control" v-model="editableNCRecords.foodtaken" required/>
                  </div>
                  <div v-else>
                    {{ncrecord.foodtaken}}
                  </div>
                </td>
                <td>
                  <div v-if="rowBeingEdited == ncrecord.id">
                    <input type="text" class="form-control" v-model="editableNCRecords.caloriecount" required/>
                  </div>
                  <div v-else>
                    {{ncrecord.caloriecount}}
                  </div>
                </td>
                <td>
                  <div v-if="rowBeingEdited == ncrecord.id">
                    <input type="datetime-local" class="form-control" v-model="editableNCRecords.foodtakentime" required/>
                  </div>
                  <div v-else>
                    {{ncrecord.foodtakentime}}
                  </div>
                </td>
                <td>
                  <div v-if="rowBeingEdited == ncrecord.id">
                    <input type="text" class="form-control" v-model="editableNCRecords.waterintake" required/>
                  </div>
                  <div v-else>
                    {{ncrecord.waterintake}}
                  </div>
                </td>
                <td>
                  <div v-if="rowBeingEdited == ncrecord.id">
                    <input type="text" class="form-control" v-model="editableNCRecords.nutrients" required/>
                  </div>
                  <div v-else>
                    {{ncrecord.nutrients}}
                  </div>
                </td>
                <td>
                  <div v-if="rowBeingEdited == ncrecord.id">
                    <input type="text" class="form-control" v-model="editableNCRecords.userid" required/>
                  </div>
                  <div v-else>
                    {{ncrecord.userid}}
                  </div>
                </td>
                <td>
                  <!-- Update Icon -->
                  <div v-if="rowBeingEdited === ncrecord.id">
                    <button class="btn btn-success btn-sm me-2" @click="updateSearchNCReport">Update</button>
                    <button class="btn btn-success btn-sm me-2" @click="cancelEdit">Cancel</button>
                  </div>
                  <div v-else>
                    <i
                        class="bi bi-pencil-square text-primary me-3"
                        style="cursor: pointer"
                        @click="editNCRecords(ncrecord)"
                    ></i>
                    <!-- Delete Icon -->
                    <i
                        class="bi bi-trash text-danger"
                        style="cursor: pointer"
                        @click="deleteSearchNCRecord(ncrecord.id)"
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
    <div class="col-4">
      <div class="card">
        <div class="card-header">Add NC Record</div>
        <div class="card-body">
          <div class="d-flex align-items-center mb3">
            <form @submit.prevent="submitNCData">
              <div class="row mb-3">
                <label for="foodtaken" class="col-sm-6 col-form-label">Food Taken</label>
                <div class="col-sm-6">
                  <input type="text" class="form-control" id="foodtaken" placeholder="Enter the Report Name" v-model="data.foodtaken" autocomplete="foodtaken" required>
                </div>
              </div>
              <div class="row mb-3">
                <label for="caloriecount" class="col-sm-6 col-form-label">Calorie Count</label>
                <div class="col-sm-6">
                  <input type="text" class="form-control" id="caloriecount" placeholder="Enter the Report Name" v-model="data.caloriecount" autocomplete="caloriecount" required>
                </div>
              </div>
              <div class="row mb-3">
                <label for="foodtakentime" class="col-sm-6 col-form-label">Food Taken Time</label>
                <div class="col-sm-6">
                  <input type="datetime-local" class="form-control" id="foodtakentime" placeholder="Enter the Report Name" v-model="data.foodtakentime" autocomplete="foodtakentime" required>
                </div>
              </div>
              <div class="row mb-3">
                <label for="waterintake" class="col-sm-6 col-form-label">Water Intake</label>
                <div class="col-sm-6">
                  <input type="text" class="form-control" id="waterintake" placeholder="Enter the Report Name" v-model="data.waterintake" autocomplete="waterintake" required>
                </div>
              </div>
              <div class="row mb-3">
                <label for="nutrients" class="col-sm-6 col-form-label">Nutrients</label>
                <div class="col-sm-6">
                  <input type="text" class="form-control" id="nutrients" placeholder="Enter the Report Name" v-model="data.nutrients" autocomplete="nutrients" required>
                </div>
              </div>
              <div class="row mb-3">
                <label for="userid" class="col-sm-6 col-form-label">User ID</label>
                <div class="col-sm-6">
                  <select class="form-select" v-model="data.userid">
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
        <div class="card-header"><h5>Search NC Records By User ID</h5></div>
        <div class="card-body">
          <div class="d-flex align-items-center mb3">
            <select class="form-select me-2" v-model="selectedUserID">
              <option disabled value="">Select User ID</option>
              <option v-for="user in userData" :key="user.id" :value="user.id">
                {{user.id}}
              </option>
            </select>
            <button class="btn btn-primary" id="searchbtn" @click="searchUserNCRecords">Search</button>
          </div>
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
      data:[],
      userData:[],
      rowBeingEdited: null,
      editableNCRecords: {},
      selectedUserID:"",
      showTable:false,
      userNCDetails: {},
      actiontype:"",
      apibaseUrl : 'https://healthtrackerapp-production.up.railway.app',
      //apibaseUrl : 'http://localhost:7001',
    }
  },
  methods:{
    async fetchAllUserNCRecords(){
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
        this.data = response.data.map((data) =>({
          ...data,
          id:Number(data.id)
        })).sort((a,b)=>a.id - b.id)
        console.log(this.data)
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    },
    async fetchUserData() {
      try {
        const response = await axios({
          method: 'GET',
          url: `${this.apibaseUrl}/api/users`,
          //url: 'https://healthtrackerapp-production.up.railway.app/api/users',
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
          },
          withCredentials:true
        })
        this.userData = response.data.map((data) =>({
          ...data,
          id:Number(data.id)
        })).sort((a,b)=>a.id - b.id)

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    },
    async submitNCData(){
      try{
        let response;
        const headers = {
          'Content-Type': 'application/json', // Ensure this header is set
          "Access-Control-Allow-Origin": "*",
        };
        switch (this.actiontype){
          case "add":
            //https://healthtrackerapp-production.up.railway.app
            response = await axios.post(`${this.apibaseUrl}/api/nutritionandcalories`, {
              foodtaken: this.data.foodtaken,
              caloriecount: this.data.caloriecount,
              foodtakentime: this.data.foodtakentime,
              waterintake: this.data.waterintake,
              nutrients: this.data.nutrients,
              userid: this.data.userid,
            }, { headers });
            console.log(this.data)
            alert("Nutrient and Calorie Record Successfully Added");
            await this.fetchAllUserNCRecords();
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
    async updateNCReport(){
      try{
        const headers = {
          'Content-Type': 'application/json', // Ensure this header is set
          "Access-Control-Allow-Origin": "*",
        };
        const response = await axios.patch(`${this.apibaseUrl}/api/nutritionandcalories/${this.editableNCRecords.id}`, this.editableNCRecords,{headers});
        //const response = await axios.patch(`https://healthtrackerapp-production.up.railway.app/api/nutritionandcalories/${this.editableNCRecords.id}`, this.editableNCRecords,{headers});
        alert("User Nutrient and Calorie Record Updated Successfully");
        console.log(response.data)
        await this.fetchAllUserNCRecords();
        this.cancelEdit();
      }catch(error){
        console.error("error updating LabReport:", error)
        alert("Failed to update Nutrient and Calorie Record. Please try again.");
      }
    },
    async updateSearchNCReport(){
      try{
        const headers = {
          'Content-Type': 'application/json', // Ensure this header is set
          "Access-Control-Allow-Origin": "*",
        };
        const response = await axios.patch(`${this.apibaseUrl}/api/nutritionandcalories/${this.editableNCRecords.id}`, this.editableNCRecords,{headers});
        //const response = await axios.patch(`https://healthtrackerapp-production.up.railway.app/api/nutritionandcalories/${this.editableNCRecords.id}`, this.editableNCRecords,{headers});
        alert("User Nutrient and Calorie Record Updated Successfully");
        console.log(response.data)
        await this.fetchAllUserNCRecords();
        await this.searchUserNCRecords();
        this.cancelEdit();
      }catch(error){
        console.error("error updating Nutrient and Calorie Record:", error)
        alert("Failed to update Nutrient and Calorie Record. Please try again.");
      }
    },
    async deleteNCRecord(ncRecordId){
      if(confirm("Do you want to delete this LabReport for this user?")){
        try{
          await axios.delete(`${this.apibaseUrl}/api/nutritionandcalories/${ncRecordId}`);
          //await axios.delete(`https://healthtrackerapp-production.up.railway.app/api/nutritionandcalories/${ncRecordId}`);
          alert("User Nutrient and Calorie Record Deleted Successfully");
          await this.fetchAllUserNCRecords();
        }catch(error){
          console.error("Error Deleting User Nutrient and Calorie Record:", error);
          alert("failed to delete User Nutrient and Calorie Record, please try again")
        }
      }
    },
    async deleteSearchNCRecord(ncRecordId){
      if(confirm("Do you want to delete this LabReport for this user?")){
        try{
          await axios.delete(`${this.apibaseUrl}/api/nutritionandcalories/${ncRecordId}`);
          //await axios.delete(`https://healthtrackerapp-production.up.railway.app/api/nutritionandcalories/${ncRecordId}`);
          alert("User Nutrient and Calorie Record Deleted Successfully");
          await this.fetchAllUserNCRecords();
          await this.searchUserNCRecords();
        }catch(error){
          console.error("Error Deleting User Nutrient and Calorie Record:", error);
          alert("failed to delete User Nutrient and Calorie Record, please try again")
        }
      }
    },
    async searchUserNCRecords(){
      if(!this.selectedUserID){
        alert("Please select a User ID");
        return;
      }
      try{
        const headers = {
          'Content-Type': 'application/json', // Ensure this header is set
          "Access-Control-Allow-Origin": "*",
        };
        const response = await axios.get(`${this.apibaseUrl}/api/nutritionandcalories/${this.selectedUserID}`,{headers});
        //const response = await axios.get(`https://healthtrackerapp-production.up.railway.app/api/nutritionandcalories/${this.selectedUserID}`,{headers});
        this.userNCDetails = response.data.map((data) =>({
          ...data,
          id:Number(data.id)
        })).sort((a,b)=>a.id - b.id)
        console.log(this.userNCDetails )
        this.showTable = true;
      }catch(error){
        console.error("error fetching Nutrient and Calorie details:", error);
        alert("Nutrient and Calorie Record for this User ID not found");
        this.showTable = false;
      }
    },
    editNCRecords(ncrecord) {
      this.rowBeingEdited = ncrecord.id;
      this.editableNCRecords = { ...ncrecord }; // Clone the user data
    },
    cancelEdit() {
      this.rowBeingEdited = null;
      this.editableNCRecords = {}; // Clear the editableUser object
    },
  },

  name:"UserNutritionandCalories",
  mounted() {
    this.fetchAllUserNCRecords();
    this.fetchUserData();
  }
}
</script>
<style scoped>

</style>