<template>
<div class="container-fluid">
  <h3 class="text-center">User LabReports</h3>
  <div class="row">
    <div class="col-8">
      <div style="height: 400px; overflow-y: auto;">
        <table class="table table-striped float-start">
          <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Report Name</th>
            <th scope="col">Report Type</th>
            <th scope="col">Report Source</th>
            <th scope="col">PatientID</th>
            <th scope="col">Actions</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="labreport in data" :key="labreport.id">
            <td>{{labreport.id}}</td>
            <td>
              <div v-if="rowBeingEdited == labreport.id">
                <input type="text" class="form-control" v-model="editableLabreports.reportname" required/>
              </div>
              <div v-else>
                {{labreport.reportname}}
              </div>
            </td>
            <td>
              <div v-if="rowBeingEdited == labreport.id">
                <input type="text" class="form-control" v-model="editableLabreports.reporttype" required/>
              </div>
              <div v-else>
                {{labreport.reporttype}}
              </div>
            </td>
            <td>
              <div v-if="rowBeingEdited == labreport.id">
                <input type="text" class="form-control" v-model="editableLabreports.reportsource" required/>
              </div>
              <div v-else>
                {{labreport.reportsource}}
              </div>
            </td>
            <td>
              <div v-if="rowBeingEdited == labreport.id">
                <input type="text" class="form-control" v-model="editableLabreports.patientid" required/>
              </div>
              <div v-else>
                {{labreport.patientid}}
              </div>
            </td>
            <td>
              <!-- Update Icon -->
              <div v-if="rowBeingEdited === labreport.id">
                <button class="btn btn-success btn-sm me-2" @click="updateLabReport">Update</button>
                <button class="btn btn-success btn-sm me-2" @click="cancelEdit">Cancel</button>
              </div>
              <div v-else>
                <i
                    class="bi bi-pencil-square text-primary me-3"
                    style="cursor: pointer"
                    @click="editLabReports(labreport)"
                ></i>
                <!-- Delete Icon -->
                <i
                    class="bi bi-trash text-danger"
                    style="cursor: pointer"
                    @click="deleteLabReport(labreport.id)"
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
          <div class="card-header"><h5>LabReports for User</h5></div>
          <div class="card-body">
            <table class="table table-striped float-start">
              <thead>
              <tr>
                <th scope="col">ID</th>
                <th scope="col">Report Name</th>
                <th scope="col">Report Type</th>
                <th scope="col">Report Source</th>
                <th scope="col">PatientID</th>
                <th scope="col">Actions</th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="labreport in userLabReportDetails" :key="labreport.id">
                <td>{{labreport.id}}</td>
                <td>
                  <div v-if="rowBeingEdited == labreport.id">
                    <input type="text" class="form-control" v-model="editableLabreports.reportname" required/>
                  </div>
                  <div v-else>
                    {{labreport.reportname}}
                  </div>
                </td>
                <td>
                  <div v-if="rowBeingEdited == labreport.id">
                    <input type="text" class="form-control" v-model="editableLabreports.reporttype" required/>
                  </div>
                  <div v-else>
                    {{labreport.reporttype}}
                  </div>
                </td>
                <td>
                  <div v-if="rowBeingEdited == labreport.id">
                    <input type="text" class="form-control" v-model="editableLabreports.reportsource" required/>
                  </div>
                  <div v-else>
                    {{labreport.reportsource}}
                  </div>
                </td>
                <td>
                  <div v-if="rowBeingEdited == labreport.id">
                    <input type="text" class="form-control" v-model="editableLabreports.patientid" required/>
                  </div>
                  <div v-else>
                    {{labreport.patientid}}
                  </div>
                </td>
                <td>
                  <!-- Update Icon -->
                  <div v-if="rowBeingEdited === labreport.id">
                    <button class="btn btn-success btn-sm me-2" @click="updateSearchLabReport">Update</button>
                    <button class="btn btn-success btn-sm me-2" @click="cancelEdit">Cancel</button>
                  </div>
                  <div v-else>
                    <i
                        class="bi bi-pencil-square text-primary me-3"
                        style="cursor: pointer"
                        @click="editLabReports(labreport)"
                    ></i>
                    <!-- Delete Icon -->
                    <i
                        class="bi bi-trash text-danger"
                        style="cursor: pointer"
                        @click="deleteSearchLabReport(labreport.id)"
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
        <div class="card-header">Add Lab Report</div>
        <div class="card-body">
          <div class="d-flex align-items-center mb3">
            <form @submit.prevent="submitLabReportData">
              <div class="row mb-3">
                <label for="reportname" class="col-sm-6 col-form-label">Report Name</label>
                <div class="col-sm-6">
                  <input type="text" class="form-control" id="reportname" placeholder="Enter the Report Name" v-model="data.reportname" autocomplete="reportname" required>
                </div>
              </div>
              <div class="row mb-3">
                <label for="reporttype" class="col-sm-6 col-form-label">Report Type</label>
                <div class="col-sm-6">
                  <input type="text" class="form-control" id="reporttype" placeholder="Enter the Report Type" v-model="data.reporttype" autocomplete="reporttype" required>
                </div>
              </div>
              <div class="row mb-3">
                <label for="reportsource" class="col-sm-6 col-form-label">Report Source</label>
                <div class="col-sm-6">
                  <input type="text" class="form-control" id="reportsource" placeholder="Enter the Report Source" v-model="data.reportsource" autocomplete="reportsource" required>
                </div>
              </div>
              <div class="row mb-3">
                <label for="patientid" class="col-sm-6 col-form-label">Patient ID</label>
                <div class="col-sm-6">
                  <select class="form-select" v-model="data.patientid">
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
        <div class="card-header"><h5>Search LabReports By User ID</h5></div>
        <div class="card-body">
          <div class="d-flex align-items-center mb3">
            <select class="form-select me-2" v-model="selectedUserID">
              <option disabled value="">Select User ID</option>
              <option v-for="user in userData" :key="user.id" :value="user.id">
                {{user.id}}
              </option>
            </select>
            <button class="btn btn-primary" id="searchbtn" @click="searchUserLabReports">Search</button>
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
      editableLabreports: {},
      selectedUserID:"",
      showTable:false,
      userLabReportDetails: {},
      actiontype:"",
      apibaseUrl : 'https://healthtrackerapp-production.up.railway.app',
      //apibaseUrl : 'http://localhost:7001',
    }
  },
  methods:{
    async fetchAllUserLabReports(){
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
    async submitLabReportData(){
      try{
        let response;
        const headers = {
          'Content-Type': 'application/json', // Ensure this header is set
          "Access-Control-Allow-Origin": "*",
        };
        switch (this.actiontype){
          case "add":
            //https://healthtrackerapp-production.up.railway.app/api/labreports
            response = await axios.post(`${this.apibaseUrl}/api/labreports`, {
              reportname: this.data.reportname,
              reporttype: this.data.reporttype,
              reportsource: this.data.reportsource,
              patientid: this.data.patientid,
            }, { headers });
            console.log(this.data)
            alert("LabReport Successfully Added");
            await this.fetchAllUserLabReports();
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
    async updateLabReport(){
      try{
        const headers = {
          'Content-Type': 'application/json', // Ensure this header is set
          "Access-Control-Allow-Origin": "*",
        };
        const response = await axios.patch(`${this.apibaseUrl}/api/labreports/${this.editableLabreports.id}`, this.editableLabreports,{headers});
        //const response = await axios.patch(`https://healthtrackerapp-production.up.railway.app/api/labreports/${this.editableLabreports.id}`, this.editableLabreports,{headers});
        alert("User LabReport Updated Successfully");
        console.log(response.data)
        await this.fetchAllUserLabReports();
        this.cancelEdit();
      }catch(error){
        console.error("error updating LabReport:", error)
        alert("Failed to update LabReport. Please try again.");
      }
    },
    async updateSearchLabReport(){
      try{
        const headers = {
          'Content-Type': 'application/json', // Ensure this header is set
          "Access-Control-Allow-Origin": "*",
        };
        const response = await axios.patch(`${this.apibaseUrl}/api/labreports/${this.editableLabreports.id}`, this.editableLabreports,{headers});
        //const response = await axios.patch(`https://healthtrackerapp-production.up.railway.app/api/labreports/${this.editableLabreports.id}`, this.editableLabreports,{headers});
        alert("User LabReport Updated Successfully");
        console.log(response.data)
        await this.fetchAllUserLabReports();
        await this.searchUserLabReports();
        this.cancelEdit();
      }catch(error){
        console.error("error updating LabReport:", error)
        alert("Failed to update LabReport. Please try again.");
      }
    },
    async deleteLabReport(labReportId){
      if(confirm("Do you want to delete this LabReport for this user?")){
        try{
          await axios.delete(`${this.apibaseUrl}/api/labreports/${labReportId}`);
          //await axios.delete(`https://healthtrackerapp-production.up.railway.app/api/labreports/${labReportId}`);
          alert("LabReport Deleted Successfully");
          await this.fetchAllUserLabReports();
        }catch(error){
          console.error("Error Deleting LabReport:", error);
          alert("failed to delete LabReport, please try again")
        }
      }
    },
    async deleteSearchLabReport(labReportId){
      if(confirm("Do you want to delete this LabReport for this user?")){
        try{
          await axios.delete(`${this.apibaseUrl}/api/labreports/${labReportId}`);
          //await axios.delete(`https://healthtrackerapp-production.up.railway.app/api/labreports/${labReportId}`);
          alert("LabReport Deleted Successfully");
          await this.fetchAllUserLabReports();
          await this.searchUserLabReports();
        }catch(error){
          console.error("Error Deleting LabReport:", error);
          alert("failed to delete LabReport, please try again")
        }
      }
    },
    async searchUserLabReports(){
      if(!this.selectedUserID){
        alert("Please select a User ID");
        return;
      }
      try{
        const headers = {
          'Content-Type': 'application/json', // Ensure this header is set
          "Access-Control-Allow-Origin": "*",
        };
        const response = await axios.get(`${this.apibaseUrl}/api/labreports/${this.selectedUserID}`,{headers});
        //const response = await axios.get(`https://healthtrackerapp-production.up.railway.app/api/labreports/${this.selectedUserID}`,{headers});
        this.userLabReportDetails = response.data.map((data) =>({
          ...data,
          id:Number(data.id)
        })).sort((a,b)=>a.id - b.id)
        console.log(this.userLabReportDetails )
        this.showTable = true;
      }catch(error){
        console.error("error fetching LabReport details:", error);
        alert("LabReport for this User ID not found");
        this.showTable = false;
      }
    },
    editLabReports(labreports) {
      this.rowBeingEdited = labreports.id;
      this.editableLabreports = { ...labreports }; // Clone the user data
    },
    cancelEdit() {
      this.rowBeingEdited = null;
      this.editableLabreports = {}; // Clear the editableUser object
    },
  },
  name:"UserLabReports",
  mounted() {
    this.fetchAllUserLabReports();
    this.fetchUserData();
  }
}
</script>
<style>

</style>