

<template>
  <div class="container-fluid">
    <h3 class="text-center">User Appointments</h3>
    <div class="row">
      <div class="col-8">
        <div style="height: 400px; overflow-y: auto;">
          <table class="table table-striped float-start">
            <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">AppointmentStart</th>
              <th scope="col">AppointmentEnd</th>
              <th scope="col">AppointmentType</th>
              <th scope="col">Location</th>
              <th scope="col">Reason</th>
              <th scope="col">Status</th>
              <th scope="col">Patient ID</th>
              <th scope="col">Actions</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="appointment in data" :key="appointment.id">
              <td>{{appointment.id}}</td>
              <td>
                <div v-if="rowBeingEdited == appointment.id">
                  <input type="datetime-local" class="form-control" v-model="editableAppointments.appointmentstartdatetime"/>
                </div>
                <div v-else>
                  {{appointment.appointmentstartdatetime}}
                </div>
              </td>
              <td>
                <div v-if="rowBeingEdited == appointment.id">
                  <input type="datetime-local" class="form-control" v-model="editableAppointments.appointmentendtime"/>
                </div>
                <div v-else>
                  {{appointment.appointmentendtime}}
                </div>
              </td>
              <td>
                <div v-if="rowBeingEdited == appointment.id">
                  <!--                  <input type="text" class="form-control" v-model="editableAppointments.appointmenttype"/>-->
                  <select class="form-select-sm" v-model="editableAppointments.appointmenttype">
                    <option value="" selected disabled>Select AppointType</option>
                    <option value="Online">Online</option>
                    <option value="Walkin">Walk-In</option>
                  </select>
                </div>
                <div v-else>
                  {{appointment.appointmenttype}}
                </div>
              </td>
              <td>
                <div v-if="rowBeingEdited == appointment.id">
                  <input type="text" class="form-control" v-model="editableAppointments.locationofappointment"/>
                </div>
                <div v-else>
                  {{appointment.locationofappointment}}
                </div>
              </td>
              <td>
                <div v-if="rowBeingEdited == appointment.id">
                  <input type="text" class="form-control" v-model="editableAppointments.reasonforappointment"/>
                </div>
                <div v-else>
                  {{appointment.reasonforappointment}}
                </div>
              </td>
              <td>
                <div v-if="rowBeingEdited == appointment.id">
                  <input type="text" class="form-control" v-model="editableAppointments.appointmentstatus"/>
                </div>
                <div v-else>
                  {{appointment.appointmentstatus}}
                </div>
              </td>
              <td>
                <div v-if="rowBeingEdited == appointment.id">
                  <input type="text" class="form-control" v-model="editableAppointments.patientid"/>
                </div>
                <div v-else>
                  {{appointment.patientid}}
                </div>
              </td>
              <td>
                <!-- Update Icon -->
                <div v-if="rowBeingEdited === appointment.id">
                  <button class="btn btn-success btn-sm me-2" @click="updateAppointment">Update</button>
                  <button class="btn btn-success btn-sm me-2" @click="cancelEdit">Cancel</button>
                </div>
                <div v-else>
                  <i
                      class="bi bi-pencil-square text-primary me-3"
                      style="cursor: pointer"
                      @click="editAppointment(appointment)"
                  ></i>
                  <!-- Delete Icon -->
                  <i
                      class="bi bi-trash text-danger"
                      style="cursor: pointer"
                      @click="deleteAppointment(appointment.id)"
                  ></i>
                </div>
              </td>
            </tr>
            </tbody>
          </table>
        </div>
        <div style="height: 300px; overflow-y: auto;" v-if="showTable">
          <div class="card">
            <div class="card-header"><h5>Appointment Details for User</h5></div>
            <div class="card-body">
              <table class="table table-striped float-start">
                <thead>
                <tr>
                  <th scope="col">ID</th>
                  <th scope="col">AppointmentStart</th>
                  <th scope="col">AppointmentEnd</th>
                  <th scope="col">AppointmentType</th>
                  <th scope="col">Location</th>
                  <th scope="col">Reason</th>
                  <th scope="col">Status</th>
                  <th scope="col">Patient ID</th>
                  <th scope="col">Actions</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="appointment in userAppointmentDetails" :key="appointment.id">
                  <td>{{appointment.id}}</td>
                  <td>
                    <div v-if="rowBeingEdited == appointment.id">
                      <input type="datetime-local" class="form-control" v-model="editableAppointments.appointmentstartdatetime"/>
                    </div>
                    <div v-else>
                      {{appointment.appointmentstartdatetime}}
                    </div>
                  </td>
                  <td>
                    <div v-if="rowBeingEdited == appointment.id">
                      <input type="datetime-local" class="form-control" v-model="editableAppointments.appointmentendtime"/>
                    </div>
                    <div v-else>
                      {{appointment.appointmentendtime}}
                    </div>
                  </td>
                  <td>
                    <div v-if="rowBeingEdited == appointment.id">
                      <!--                  <input type="text" class="form-control" v-model="editableAppointments.appointmenttype"/>-->
                      <select class="form-select-sm" v-model="editableAppointments.appointmenttype">
                        <option value="" selected disabled>Select AppointType</option>
                        <option value="Online">Online</option>
                        <option value="Walkin">Walk-In</option>
                      </select>
                    </div>
                    <div v-else>
                      {{appointment.appointmenttype}}
                    </div>
                  </td>
                  <td>
                    <div v-if="rowBeingEdited == appointment.id">
                      <input type="text" class="form-control" v-model="editableAppointments.locationofappointment"/>
                    </div>
                    <div v-else>
                      {{appointment.locationofappointment}}
                    </div>
                  </td>
                  <td>
                    <div v-if="rowBeingEdited == appointment.id">
                      <input type="text" class="form-control" v-model="editableAppointments.reasonforappointment"/>
                    </div>
                    <div v-else>
                      {{appointment.reasonforappointment}}
                    </div>
                  </td>
                  <td>
                    <div v-if="rowBeingEdited == appointment.id">
                      <input type="text" class="form-control" v-model="editableAppointments.appointmentstatus"/>
                    </div>
                    <div v-else>
                      {{appointment.appointmentstatus}}
                    </div>
                  </td>
                  <td>
                    <div v-if="rowBeingEdited == appointment.id">
                      <input type="text" class="form-control" v-model="editableAppointments.patientid"/>
                    </div>
                    <div v-else>
                      {{appointment.patientid}}
                    </div>
                  </td>
                  <td>
                    <!-- Update Icon -->
                    <div v-if="rowBeingEdited === appointment.id">
                      <button class="btn btn-success btn-sm me-2" @click="updateSearchAppointment">Update</button>
                      <button class="btn btn-success btn-sm me-2" @click="cancelEdit">Cancel</button>
                    </div>
                    <div v-else>
                      <i
                          class="bi bi-pencil-square text-primary me-3"
                          style="cursor: pointer"
                          @click="editAppointment(appointment)"
                      ></i>
                      <!-- Delete Icon -->
                      <i
                          class="bi bi-trash text-danger"
                          style="cursor: pointer"
                          @click="deleteSearchAppointment(appointment.id)"
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
          <div class="card-header"><h5>Add Appointment</h5></div>
          <div class="card-body">
            <div class="d-flex align-items-center mb3">
              <form @submit.prevent="submitAppointmentData">
                <div class="row mb-3">
                  <label for="appointmentstartdatetime" class="col-sm-6 col-form-label">Appointment Start Time</label>
                  <div class="col-sm-6">
                    <input type="datetime-local" class="form-control" id="appointmentstartdatetime" placeholder="Enter the Appointment start time" v-model="data.appointmentstartdatetime" autocomplete="appointmentstartdatetime" required>
                  </div>
                </div>
                <div class="row mb-3">
                  <label for="appointmentendtime" class="col-sm-6 col-form-label">Appointment End Time</label>
                  <div class="col-sm-6">
                    <input type="datetime-local" class="form-control" id="appointmentendtime" placeholder="Enter the Appointment start time" v-model="data.appointmentendtime" autocomplete="appointmentendtime" required>
                  </div>
                </div>
                <div class="row mb-3">
                  <label for="appointmenttype" class="col-sm-6 col-form-label">Appointment Type</label>
                  <div class="col-sm-6">
<!--                    <input type="datetime-local" class="form-control" id="appointmenttype" placeholder="Enter the Appointment start time" v-model="data.appointmenttype" autocomplete="appointmenttype" required>-->
                    <select class="form-select" v-model="data.appointmenttype" required>
                      <option value="" selected disabled>Select AppointType</option>
                      <option value="Online">Online</option>
                      <option value="Walkin">Walk-In</option>
                    </select>
                  </div>
                </div>
                <div class="row mb-3">
                  <label for="locationofappointment" class="col-sm-6 col-form-label">Location</label>
                  <div class="col-sm-6">
                    <!--                    <input type="datetime-local" class="form-control" id="appointmenttype" placeholder="Enter the Appointment start time" v-model="data.appointmenttype" autocomplete="appointmenttype" required>-->
                    <select class="form-select" v-model="data.locationofappointment" required>
                      <option value="" selected disabled>Select Location</option>
                      <option value="Online">Online</option>
                      <option value="Hospital">Hospital</option>
                      <option value="Lab">Lab</option>
                    </select>
                  </div>
                </div>
                <div class="row mb-3">
                  <label for="reasonforappointment" class="col-sm-6 col-form-label">Reason</label>
                  <div class="col-sm-6">
                    <input type="text" class="form-control" id="reasonforappointment" placeholder="Enter the Reason for Appointment" v-model="data.reasonforappointment" autocomplete="reasonforappointment" required>
                  </div>
                </div>
                <div class="row mb-3">
                  <label for="appointmentstatus" class="col-sm-6 col-form-label">Appointment Status</label>
                  <div class="col-sm-6">
                    <!--                    <input type="datetime-local" class="form-control" id="appointmenttype" placeholder="Enter the Appointment start time" v-model="data.appointmenttype" autocomplete="appointmenttype" required>-->
                    <select class="form-select" v-model="data.appointmentstatus" required>
                      <option value="" selected disabled>Select Location</option>
                      <option value="Booked">Booked</option>
                      <option value="Cancelled">Cancelled</option>
                      <option value="OnHold">OnHold</option>
                      <option value="PostPoned">PostPoned</option>
                    </select>
                  </div>
                </div>
                <div class="row mb-3 align-items-center">
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
          <div class="card-header"><h5>Search Appointments By User ID</h5></div>
          <div class="card-body">
            <div class="d-flex align-items-center mb3">
              <select class="form-select me-2" v-model="selectedUserID">
                <option disabled value="">Select User ID</option>
                <option v-for="user in userData" :key="user.id" :value="user.id">
                  {{user.id}}
                </option>
              </select>
              <button class="btn btn-primary" id="searchbtn" @click="searchUserAppointments">Search</button>
            </div>
          </div>
        </div>
      </div>


    </div>
  </div>
</template>

<style scoped>

</style>
<script>
import axios from 'axios';
export default {
  data(){
    return{
      data:[],
      userData:[],
      rowBeingEdited: null,
      editableAppointments: {},
      selectedUserID:"",
      showTable:false,
      userAppointmentDetails: {},
      actiontype:"",
      apibaseUrl : 'https://healthtrackerapp-production.up.railway.app',
      //apibaseUrl : 'http://localhost:7001',
    }
  },
  methods:{
    async fetchAllAppointments(){
      try{
        const response = await axios({
          method: "GET",

          url: `${this.apibaseUrl}/api/appointmentscheduler`,
          //url: 'https://healthtrackerapp-production.up.railway.app/api/appointmentscheduler',
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
    async submitAppointmentData(){
      try{
        let response;
        const headers = {
          'Content-Type': 'application/json', // Ensure this header is set
          "Access-Control-Allow-Origin": "*",
        };
        switch (this.actiontype){
          case "add":
            response = await axios.post(`${this.apibaseUrl}/api/appointmentscheduler`, {
              appointmentstartdatetime: this.data.appointmentstartdatetime,
              appointmentendtime: this.data.appointmentendtime,
              appointmenttype: this.data.appointmenttype,
              locationofappointment: this.data.locationofappointment,
              reasonforappointment: this.data.reasonforappointment,
              appointmentstatus: this.data.appointmentstatus,
              patientid: this.data.patientid,
            }, { headers });
            console.log(this.data)
            alert("Appointment Successfully Added");
            await this.fetchAllAppointments();
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
    async updateAppointment(){
      try{
        const headers = {
          'Content-Type': 'application/json', // Ensure this header is set
          "Access-Control-Allow-Origin": "*",
        };
        const response = await axios.patch(`${this.apibaseUrl}/api/appointmentscheduler/${this.editableAppointments.id}`, this.editableAppointments,{headers});
        //const response = await axios.patch(`https://healthtrackerapp-production.up.railway.app/api/appointmentscheduler/${this.editableAppointments.id}`, this.editableAppointments,{headers});
        alert("User Appointment Updated Successfully");
        console.log(response.data)
        await this.fetchAllAppointments();
        this.cancelEdit();
      }catch(error){
        console.error("error updating appointment:", error)
        alert("Failed to update appointment. Please try again.");
      }
    },
    async updateSearchAppointment(){
      try{
        const headers = {
          'Content-Type': 'application/json', // Ensure this header is set
          "Access-Control-Allow-Origin": "*",
        };
        const response = await axios.patch(`${this.apibaseUrl}/api/appointmentscheduler/${this.editableAppointments.id}`, this.editableAppointments,{headers});
        //const response = await axios.patch(`https://healthtrackerapp-production.up.railway.app/api/appointmentscheduler/${this.editableAppointments.id}`, this.editableAppointments,{headers});
        alert("User Appointment Updated Successfully");
        console.log(response.data)
        await this.fetchAllAppointments();
        await this.searchUserAppointments();
        this.cancelEdit();
      }catch(error){
        console.error("error updating user:", error)
        alert("Failed to update appointment. Please try again.");
      }
    },
    async deleteAppointment(appointmentId){
      if(confirm("Do you want to delete this Activity for this user?")){
        try{
          await axios.delete(`${this.apibaseUrl}/api/appointmentscheduler/${appointmentId}`);
          //await axios.delete(`https://healthtrackerapp-production.up.railway.app/api/appointmentscheduler/${appointmentId}`);
          alert("Appointment Deleted Successfully");
          await this.fetchAllAppointments();
        }catch(error){
          console.error("Error Deleting User:", error);
          alert("failed to delete appointment, please try again")
        }
      }
    },
    async deleteSearchAppointment(appointmentId){
      if(confirm("Do you want to delete this Activity for this user?")){
        try{
          await axios.delete(`${this.apibaseUrl}/api/appointmentscheduler/${appointmentId}`);
          //await axios.delete(`https://healthtrackerapp-production.up.railway.app/api/appointmentscheduler/${appointmentId}`);
          alert("Appointment Deleted Successfully");
          await this.fetchAllAppointments();
          await this.searchUserAppointments();
        }catch(error){
          console.error("Error Deleting Appointment:", error);
          alert("failed to delete appointment, please try again")
        }
      }
    },
    async searchUserAppointments(){
      if(!this.selectedUserID){
        alert("Please select a User ID");
        return;
      }
      try{
        const headers = {
          'Content-Type': 'application/json', // Ensure this header is set
          "Access-Control-Allow-Origin": "*",
        };
        const response = await axios.get(`${this.apibaseUrl}/api/appointmentscheduler/${this.selectedUserID}`,{headers});
        //const response = await axios.get(`https://healthtrackerapp-production.up.railway.app/api/appointmentscheduler/${this.selectedUserID}`,{headers});
        this.userAppointmentDetails = response.data.map((data) =>({
          ...data,
          id:Number(data.id)
        })).sort((a,b)=>a.id - b.id)
        console.log(this.userAppointmentDetails)
        this.showTable = true;
      }catch(error){
        console.error("error fetching activity details:", error);
        alert("Appointments for this User ID not found");
        this.showTable = false;
      }
    },
    editAppointment(appointment) {
      this.rowBeingEdited = appointment.id;
      this.editableAppointments = { ...appointment }; // Clone the user data
    },

    // Cancel editing
    cancelEdit() {
      this.rowBeingEdited = null;
      this.editableAppointments = {}; // Clear the editableUser object
    },
  },
  name:"UserAppointments",
  mounted() {
    this.fetchAllAppointments();
    this.fetchUserData();
  }

}
</script>