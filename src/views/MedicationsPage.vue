<template>
<div class="container-fluid">
  <h3 class="text-center">User Medications</h3>
  <div class="row">
    <div class="col-8">
      <div style="height: 400px; overflow-y: auto;">
        <table class="table table-striped float-start">
          <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Medicine Name</th>
            <th scope="col">DateTimeOfIntake</th>
            <th scope="col">Dosage</th>
            <th scope="col">MedTakenOrNot</th>
            <th scope="col">PatientID</th>
            <th scope="col">Actions</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="medication in data" :key="medication.id">
            <td>{{medication.id}}</td>
            <td>
              <div v-if="rowBeingEdited == medication.id">
                <input type="text" class="form-control" v-model="editableMedications.medicinename" required/>
              </div>
              <div v-else>
                {{medication.medicinename}}
              </div>
            </td>
            <td>
              <div v-if="rowBeingEdited == medication.id">
                <input type="datetime-local" class="form-control" v-model="editableMedications.datetimeofintake" required/>
              </div>
              <div v-else>
                {{medication.datetimeofintake}}
              </div>
            </td>
            <td>
              <div v-if="rowBeingEdited == medication.id">
                <input type="text" class="form-control" v-model="editableMedications.dosage" required/>
              </div>
              <div v-else>
                {{medication.dosage}}
              </div>
            </td>
            <td>
              <div v-if="rowBeingEdited == medication.id">
                <input type="text" class="form-control" v-model="editableMedications.medtakenornot" required/>
              </div>
              <div v-else>
                {{medication.medtakenornot}}
              </div>
            </td>
            <td>
              <div v-if="rowBeingEdited == medication.id">
                <input type="text" class="form-control" v-model="editableMedications.patientid" required/>
              </div>
              <div v-else>
                {{medication.patientid}}
              </div>
            </td>
            <td>
              <!-- Update Icon -->
              <div v-if="rowBeingEdited === medication.id">
                <button class="btn btn-success btn-sm me-2" @click="updateMedication">Update</button>
                <button class="btn btn-success btn-sm me-2" @click="cancelEdit">Cancel</button>
              </div>
              <div v-else>
                <i
                    class="bi bi-pencil-square text-primary me-3"
                    style="cursor: pointer"
                    @click="editMedication(medication)"
                ></i>
                <!-- Delete Icon -->
                <i
                    class="bi bi-trash text-danger"
                    style="cursor: pointer"
                    @click="deleteMedication(medication.id)"
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
          <div class="card-header"><h5>Medication Details for User</h5></div>
          <div class="card-body">
            <table class="table table-striped float-start">
              <thead>
              <tr>
                <th scope="col">ID</th>
                <th scope="col">Medicine Name</th>
                <th scope="col">DateTimeOfIntake</th>
                <th scope="col">Dosage</th>
                <th scope="col">MedTakenOrNot</th>
                <th scope="col">PatientID</th>
                <th scope="col">Actions</th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="medication in userMedicationDetails" :key="medication.id">
                <td>{{medication.id}}</td>
                <td>
                  <div v-if="rowBeingEdited == medication.id">
                    <input type="text" class="form-control" v-model="editableMedications.medicinename" required/>
                  </div>
                  <div v-else>
                    {{medication.medicinename}}
                  </div>
                </td>
                <td>
                  <div v-if="rowBeingEdited == medication.id">
                    <input type="datetime-local" class="form-control" v-model="editableMedications.datetimeofintake" required/>
                  </div>
                  <div v-else>
                    {{medication.datetimeofintake}}
                  </div>
                </td>
                <td>
                  <div v-if="rowBeingEdited == medication.id">
                    <input type="text" class="form-control" v-model="editableMedications.dosage" required/>
                  </div>
                  <div v-else>
                    {{medication.dosage}}
                  </div>
                </td>
                <td>
                  <div v-if="rowBeingEdited == medication.id">
                    <input type="text" class="form-control" v-model="editableMedications.medtakenornot" required/>
                  </div>
                  <div v-else>
                    {{medication.medtakenornot}}
                  </div>
                </td>
                <td>
                  <div v-if="rowBeingEdited == medication.id">
                    <input type="text" class="form-control" v-model="editableMedications.patientid" required/>
                  </div>
                  <div v-else>
                    {{medication.patientid}}
                  </div>
                </td>
                <td>
                  <!-- Update Icon -->
                  <div v-if="rowBeingEdited === medication.id">
                    <button class="btn btn-success btn-sm me-2" @click="updateSearchMedication">Update</button>
                    <button class="btn btn-success btn-sm me-2" @click="cancelEdit">Cancel</button>
                  </div>
                  <div v-else>
                    <i
                        class="bi bi-pencil-square text-primary me-3"
                        style="cursor: pointer"
                        @click="editMedication(medication)"
                    ></i>
                    <!-- Delete Icon -->
                    <i
                        class="bi bi-trash text-danger"
                        style="cursor: pointer"
                        @click="deleteSearchMedication(medication.id)"
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
        <div class="card-header"><h5>Add Medication</h5></div>
        <div class="card-body">
          <div class="d-flex align-items-center mb3">
            <form @submit.prevent="submitMedicationData">
              <div class="row mb-3">
                <label for="medicinename" class="col-sm-6 col-form-label">Medicine Name</label>
                <div class="col-sm-6">
                  <input type="text" class="form-control" id="medicinename" placeholder="Enter the Medicine Name" v-model="data.medicinename" autocomplete="medicinename" required>
                </div>
              </div>
              <div class="row mb-3">
                <label for="datetimeofintake" class="col-sm-6 col-form-label">Time Of Intake</label>
                <div class="col-sm-6">
                  <input type="datetime-local" class="form-control" id="datetimeofintake" placeholder="Enter the Medicine Intake Time" v-model="data.datetimeofintake" autocomplete="datetimeofintake" required>
                </div>
              </div>
              <div class="row mb-3">
                <label for="dosage" class="col-sm-6 col-form-label">Dosage</label>
                <div class="col-sm-6">
                  <input type="text" class="form-control" id="dosage" placeholder="Enter the Dosage" v-model="data.dosage" autocomplete="dosage" required>
                </div>
              </div>
              <div class="row mb-3">
                <label for="medtakenornot" class="col-sm-6 col-form-label">MedTakenOrNot</label>
                <div class="col-sm-6">
                  <input type="text" class="form-control" id="medtakenornot" placeholder="Mention Medicine Taken or Not" v-model="data.medtakenornot" autocomplete="medtakenornot" required>
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
        <div class="card-header"><h5>Search Medications By User ID</h5></div>
        <div class="card-body">
          <div class="d-flex align-items-center mb3">
            <select class="form-select me-2" v-model="selectedUserID">
              <option disabled value="">Select User ID</option>
              <option v-for="user in userData" :key="user.id" :value="user.id">
                {{user.id}}
              </option>
            </select>
            <button class="btn btn-primary" id="searchbtn" @click="searchUserMedications">Search</button>
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
      editableMedications: {},
      selectedUserID:"",
      showTable:false,
      userMedicationDetails: {},
      actiontype:"",
    }
  },
  methods:{
    async fetchAllUserMedications(){
      try {
        const response = await axios({
          method: 'GET',
          url: 'http://localhost:7001/api/medicationtracker',
          //url: 'https://healthtrackerapp-production.up.railway.app/api/medicationtracker',
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
          url: 'http://localhost:7001/api/users',
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
    async submitMedicationData(){
      try{
        let response;
        const headers = {
          'Content-Type': 'application/json', // Ensure this header is set
          "Access-Control-Allow-Origin": "*",
        };
        switch (this.actiontype){
          case "add":
            //https://healthtrackerapp-production.up.railway.app/api/medicationtracker
            response = await axios.post("http://localhost:7001/api/medicationtracker", {
              medicinename: this.data.medicinename,
              datetimeofintake: this.data.datetimeofintake,
              dosage: this.data.dosage,
              medtakenornot: this.data.medtakenornot,
              patientid: this.data.patientid,
            }, { headers });
            console.log(this.data)
            alert("Medication Successfully Added");
            await this.fetchAllUserMedications();
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
    async updateMedication(){
      try{
        const headers = {
          'Content-Type': 'application/json', // Ensure this header is set
          "Access-Control-Allow-Origin": "*",
        };
        const response = await axios.patch(`http://localhost:7001/api/medicationtracker/${this.editableMedications.id}`, this.editableMedications,{headers});
        //const response = await axios.patch(`https://healthtrackerapp-production.up.railway.app/api/medicationtracker/${this.editableMedications.id}`, this.editableMedications,{headers});
        alert("User Medication Updated Successfully");
        console.log(response.data)
        await this.fetchAllUserMedications();
        this.cancelEdit();
      }catch(error){
        console.error("error updating Medication:", error)
        alert("Failed to update Medication. Please try again.");
      }
    },
    async updateSearchMedication(){
      try{
        const headers = {
          'Content-Type': 'application/json', // Ensure this header is set
          "Access-Control-Allow-Origin": "*",
        };
        const response = await axios.patch(`http://localhost:7001/api/medicationtracker/${this.editableMedications.id}`, this.editableMedications,{headers});
        //const response = await axios.patch(`https://healthtrackerapp-production.up.railway.app/api/medicationtracker/${this.editableMedications.id}`, this.editableMedications,{headers});
        alert("User Medication Updated Successfully");
        console.log(response.data)
        await this.fetchAllUserMedications();
        await this.searchUserMedications();
        this.cancelEdit();
      }catch(error){
        console.error("error updating Medication:", error)
        alert("Failed to update Medication. Please try again.");
      }
    },
    async deleteMedication(medicationId){
      if(confirm("Do you want to delete this Medication for this user?")){
        try{
          await axios.delete(`http://localhost:7001/api/medicationtracker/${medicationId}`);
          //await axios.delete(`https://healthtrackerapp-production.up.railway.app/api/medicationtracker/${medicationId}`);
          alert("Medication Deleted Successfully");
          await this.fetchAllUserMedications();
        }catch(error){
          console.error("Error Deleting Medication:", error);
          alert("failed to delete medication, please try again")
        }
      }
    },
    async deleteSearchMedication(medicationId){
      if(confirm("Do you want to delete this Medication for this user?")){
        try{
          await axios.delete(`http://localhost:7001/api/medicationtracker/${medicationId}`);
          //await axios.delete(`https://healthtrackerapp-production.up.railway.app/api/medicationtracker/${medicationId}`);
          alert("Medication Deleted Successfully");
          await this.fetchAllUserMedications();
          await this.searchUserMedications();
        }catch(error){
          console.error("Error Deleting Medication:", error);
          alert("failed to delete medication, please try again")
        }
      }
    },
    async searchUserMedications(){
      if(!this.selectedUserID){
        alert("Please select a User ID");
        return;
      }
      try{
        const headers = {
          'Content-Type': 'application/json', // Ensure this header is set
          "Access-Control-Allow-Origin": "*",
        };
        const response = await axios.get(`http://localhost:7001/api/medicationtracker/${this.selectedUserID}`,{headers});
        //const response = await axios.get(`https://healthtrackerapp-production.up.railway.app/api/medicationtracker/${this.selectedUserID}`,{headers});
        this.userMedicationDetails = response.data.map((data) =>({
          ...data,
          id:Number(data.id)
        })).sort((a,b)=>a.id - b.id)
        console.log(this.userMedicationDetails )
        this.showTable = true;
      }catch(error){
        console.error("error fetching medication details:", error);
        alert("Medication for this User ID not found");
        this.showTable = false;
      }
    },
    editMedication(medication) {
      this.rowBeingEdited = medication.id;
      this.editableMedications = { ...medication }; // Clone the user data
    },

    // Cancel editing
    cancelEdit() {
      this.rowBeingEdited = null;
      this.editableMedications = {}; // Clear the editableUser object
    },
  },
  name:"UserMedications",
  mounted() {
    this.fetchAllUserMedications();
    this.fetchUserData();
  }
}
</script>
<style scoped>

</style>