<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-8">
        <div class="card">
          <div class="card-header d-flex justify-content-between align-items-center">
            <div class="mb-0">Overview For {{ this.userData.name }}</div>
            <button @click="toggleCollapse" class="btn btn-link">
              <i class="bi bi-plus"></i>
            </button>
          </div>
          <div :class="['collapse', { 'show': isCollapsed }]">
            <div class="card-body">
              <div class="d-flex align-items-center mb3">
                <form>
                  <div class="row mb-3">
                    <label for="id" class="col-sm-3 col-form-label">User ID</label>
                    <div class="col-sm-9">
                      <input type="text" class="form-control" id="id" placeholder="Enter ID" v-model="userData.id"
                             autocomplete="id" disabled>
                    </div>
                  </div>
                  <div class="row mb-3">
                    <label for="name" class="col-sm-3 col-form-label">Name</label>
                    <div class="col-sm-9">
                      <input type="text" class="form-control" id="name" placeholder="Enter the User Name"
                             v-model="userData.name" autocomplete="name" required>
                    </div>
                  </div>
                  <div class="row mb-3">
                    <label for="email" class="col-sm-3 col-form-label">Email</label>
                    <div class="col-sm-9">
                      <input type="text" class="form-control" id="email" placeholder="Enter the User Email"
                             v-model="userData.email" autocomplete="email" required>
                    </div>
                  </div>
                  <div class="row mb-3">
                    <label for="dateofbirth" class="col-sm-3 col-form-label">D.O.B</label>
                    <div class="col-sm-9">
                      <input type="date" class="form-control" id="dateofbirth" placeholder="Enter the User dateofbirth"
                             v-model="userData.dateofbirth" autocomplete="dateofbirth" required>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        <br/>
        <div class="card">
          <div class="card-header d-flex justify-content-between align-items-center">
            <div class="mb-0">Activities For {{ this.userData.name }}</div>
            <button @click="toggleCollapseActivities" class="btn btn-link">
              <i class="bi bi-plus"></i>
            </button>
          </div>
          <div :class="['collapse', { 'show': isCollapsedActivities }]">
            <div class="card-body">
              <div class="d-flex align-items-center mb3">
                <div class="mt-5" v-if="showTable">
                  <table class="table table-striped">
                    <thead>
                    <tr>
                      <th scope="col">ID</th>
                      <th scope="col">Description</th>
                      <th scope="col">Duration(In Mins)</th>
                      <th scope="col">Calories Burnt</th>
                      <th scope="col">Activity Start Time</th>
                      <th scope="col">UserID</th>
                      <th scope="col">Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="activity in useractivityDetails" :key="activity.id">
                      <td>{{ activity.id }}</td>
                      <td>
                        <div v-if="rowBeingEdited == activity.id">
                          <input type="text" class="form-control" v-model="editableActivity.description"/>
                        </div>
                        <div v-else>
                          {{ activity.description }}
                        </div>
                      </td>
                      <td>
                        <div v-if="rowBeingEdited == activity.id">
                          <input type="text" class="form-control" v-model="editableActivity.duration"/>
                        </div>
                        <div v-else>
                          {{ activity.duration }}
                        </div>
                      </td>
                      <td>
                        <div v-if="rowBeingEdited == activity.id">
                          <input type="text" class="form-control" v-model="editableActivity.calories"/>
                        </div>
                        <div v-else>
                          {{ activity.calories }}
                        </div>
                      </td>
                      <td>
                        <div v-if="rowBeingEdited == activity.id">
                          <input type="datetime-local" class="form-control" v-model="editableActivity.started"/>
                        </div>
                        <div v-else>
                          {{ activity.started }}
                        </div>
                      </td>
                      <td>
                        <div v-if="rowBeingEdited == activity.id">
                          <input type="text" class="form-control" v-model="editableActivity.userId"/>
                        </div>
                        <div v-else>
                          {{ activity.userId }}
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
        <br/>
        <div class="card">
          <div class="card-header d-flex justify-content-between align-items-center">
            <div class="mb-0">Appointments For {{ this.userData.name }}</div>
            <button @click="toggleCollapseAppointments" class="btn btn-link">
              <i class="bi bi-plus"></i>
            </button>
          </div>
          <div :class="['collapse', { 'show': isCollapsedAppointments }]">
            <div class="card-body">
              <div class="d-flex align-items-center mb3">
                <div class="mt-4" v-if="showTable">
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
                    <tr v-for="appointment in userappointmentDetails" :key="appointment.id">
                      <td>{{ appointment.id }}</td>
                      <td>
                        <div v-if="rowBeingEditedA == appointment.id">
                          <input type="datetime-local" class="form-control"
                                 v-model="editableAppointments.appointmentstartdatetime"/>
                        </div>
                        <div v-else>
                          {{ appointment.appointmentstartdatetime }}
                        </div>
                      </td>
                      <td>
                        <div v-if="rowBeingEditedA == appointment.id">
                          <input type="datetime-local" class="form-control"
                                 v-model="editableAppointments.appointmentendtime"/>
                        </div>
                        <div v-else>
                          {{ appointment.appointmentendtime }}
                        </div>
                      </td>
                      <td>
                        <div v-if="rowBeingEditedA == appointment.id">
                          <!--                  <input type="text" class="form-control" v-model="editableAppointments.appointmenttype"/>-->
                          <select class="form-select-sm" v-model="editableAppointments.appointmenttype">
                            <option value="" selected disabled>Select AppointType</option>
                            <option value="Online">Online</option>
                            <option value="Walkin">Walk-In</option>
                          </select>
                        </div>
                        <div v-else>
                          {{ appointment.appointmenttype }}
                        </div>
                      </td>
                      <td>
                        <div v-if="rowBeingEditedA == appointment.id">
                          <input type="text" class="form-control" v-model="editableAppointments.locationofappointment"/>
                        </div>
                        <div v-else>
                          {{ appointment.locationofappointment }}
                        </div>
                      </td>
                      <td>
                        <div v-if="rowBeingEditedA == appointment.id">
                          <input type="text" class="form-control" v-model="editableAppointments.reasonforappointment"/>
                        </div>
                        <div v-else>
                          {{ appointment.reasonforappointment }}
                        </div>
                      </td>
                      <td>
                        <div v-if="rowBeingEditedA == appointment.id">
                          <input type="text" class="form-control" v-model="editableAppointments.appointmentstatus"/>
                        </div>
                        <div v-else>
                          {{ appointment.appointmentstatus }}
                        </div>
                      </td>
                      <td>
                        <div v-if="rowBeingEditedA == appointment.id">
                          <input type="text" class="form-control" v-model="editableAppointments.patientid"/>
                        </div>
                        <div v-else>
                          {{ appointment.patientid }}
                        </div>
                      </td>
                      <td>
                        <!-- Update Icon -->
                        <div v-if="rowBeingEditedA === appointment.id">
                          <button class="btn btn-success btn-sm me-2" @click="updateSearchAppointment">Update</button>
                          <button class="btn btn-success btn-sm me-2" @click="cancelEditA">Cancel</button>
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
        </div>
        <br/>
        <div class="card">
          <div class="card-header d-flex justify-content-between align-items-center">
            <div class="mb-0">Medications For {{ this.userData.name }}</div>
            <button @click="toggleCollapseMedications" class="btn btn-link">
              <i class="bi bi-plus"></i>
            </button>
          </div>
          <div :class="['collapse', { 'show': isCollapsedMedications }]">
            <div class="card-body">
              <div class="mt-4" v-if="showTable">
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
                  <tr v-for="medication in usermedicationDetails" :key="medication.id">
                    <td>{{ medication.id }}</td>
                    <td>
                      <div v-if="rowBeingEditedM == medication.id">
                        <input type="text" class="form-control" v-model="editableMedications.medicinename" required/>
                      </div>
                      <div v-else>
                        {{ medication.medicinename }}
                      </div>
                    </td>
                    <td>
                      <div v-if="rowBeingEditedM == medication.id">
                        <input type="datetime-local" class="form-control" v-model="editableMedications.datetimeofintake"
                               required/>
                      </div>
                      <div v-else>
                        {{ medication.datetimeofintake }}
                      </div>
                    </td>
                    <td>
                      <div v-if="rowBeingEditedM == medication.id">
                        <input type="text" class="form-control" v-model="editableMedications.dosage" required/>
                      </div>
                      <div v-else>
                        {{ medication.dosage }}
                      </div>
                    </td>
                    <td>
                      <div v-if="rowBeingEditedM == medication.id">
                        <input type="text" class="form-control" v-model="editableMedications.medtakenornot" required/>
                      </div>
                      <div v-else>
                        {{ medication.medtakenornot }}
                      </div>
                    </td>
                    <td>
                      <div v-if="rowBeingEditedM == medication.id">
                        <input type="text" class="form-control" v-model="editableMedications.patientid" required/>
                      </div>
                      <div v-else>
                        {{ medication.patientid }}
                      </div>
                    </td>
                    <td>
                      <!-- Update Icon -->
                      <div v-if="rowBeingEditedM === medication.id">
                        <button class="btn btn-success btn-sm me-2" @click="updateMedication">Update</button>
                        <button class="btn btn-success btn-sm me-2" @click="cancelEditM">Cancel</button>
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
            </div>
          </div>
        </div>
        <br/>
        <div class="card">
          <div class="card-header d-flex justify-content-between align-items-center">
            <div class="mb-0">LabReports For {{ this.userData.name }}</div>
            <button @click="toggleCollapseLabReports" class="btn btn-link">
              <i class="bi bi-plus"></i>
            </button>
          </div>
          <div :class="['collapse', { 'show': isCollapsedLabreports }]">
            <div class="card-body">
              <div class="mt-4" v-if="showTable">
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
                    <td>{{ labreport.id }}</td>
                    <td>
                      <div v-if="rowBeingEditedL == labreport.id">
                        <input type="text" class="form-control" v-model="editableLabreports.reportname" required/>
                      </div>
                      <div v-else>
                        {{ labreport.reportname }}
                      </div>
                    </td>
                    <td>
                      <div v-if="rowBeingEditedL == labreport.id">
                        <input type="text" class="form-control" v-model="editableLabreports.reporttype" required/>
                      </div>
                      <div v-else>
                        {{ labreport.reporttype }}
                      </div>
                    </td>
                    <td>
                      <div v-if="rowBeingEditedL == labreport.id">
                        <input type="text" class="form-control" v-model="editableLabreports.reportsource" required/>
                      </div>
                      <div v-else>
                        {{ labreport.reportsource }}
                      </div>
                    </td>
                    <td>
                      <div v-if="rowBeingEditedL == labreport.id">
                        <input type="text" class="form-control" v-model="editableLabreports.patientid" required/>
                      </div>
                      <div v-else>
                        {{ labreport.patientid }}
                      </div>
                    </td>
                    <td>
                      <!-- Update Icon -->
                      <div v-if="rowBeingEditedL === labreport.id">
                        <button class="btn btn-success btn-sm me-2" @click="updateLabReport">Update</button>
                        <button class="btn btn-success btn-sm me-2" @click="cancelEditL">Cancel</button>
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
            </div>
          </div>
        </div>
        <br/>
        <div class="card">
          <div class="card-header d-flex justify-content-between align-items-center">
            <div class="mb-0">Nutrition and Calories Records For {{ this.userData.name }}</div>
            <button @click="toggleCollapseNCRecords" class="btn btn-link">
              <i class="bi bi-plus"></i>
            </button>
          </div>
          <div :class="['collapse', { 'show': isCollapsedNCRecords }]">
            <div class="card-body">
              <div class="mt-4" v-if="showTable">
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
                    <td>{{ ncrecord.id }}</td>
                    <td>
                      <div v-if="rowBeingEditedN == ncrecord.id">
                        <input type="text" class="form-control" v-model="editableNCRecords.foodtaken" required/>
                      </div>
                      <div v-else>
                        {{ ncrecord.foodtaken }}
                      </div>
                    </td>
                    <td>
                      <div v-if="rowBeingEditedN == ncrecord.id">
                        <input type="text" class="form-control" v-model="editableNCRecords.caloriecount" required/>
                      </div>
                      <div v-else>
                        {{ ncrecord.caloriecount }}
                      </div>
                    </td>
                    <td>
                      <div v-if="rowBeingEditedN == ncrecord.id">
                        <input type="datetime-local" class="form-control" v-model="editableNCRecords.foodtakentime"
                               required/>
                      </div>
                      <div v-else>
                        {{ ncrecord.foodtakentime }}
                      </div>
                    </td>
                    <td>
                      <div v-if="rowBeingEditedN == ncrecord.id">
                        <input type="text" class="form-control" v-model="editableNCRecords.waterintake" required/>
                      </div>
                      <div v-else>
                        {{ ncrecord.waterintake }}
                      </div>
                    </td>
                    <td>
                      <div v-if="rowBeingEditedN == ncrecord.id">
                        <input type="text" class="form-control" v-model="editableNCRecords.nutrients" required/>
                      </div>
                      <div v-else>
                        {{ ncrecord.nutrients }}
                      </div>
                    </td>
                    <td>
                      <div v-if="rowBeingEditedN == ncrecord.id">
                        <input type="text" class="form-control" v-model="editableNCRecords.userid" required/>
                      </div>
                      <div v-else>
                        {{ ncrecord.userid }}
                      </div>
                    </td>
                    <td>
                      <!-- Update Icon -->
                      <div v-if="rowBeingEditedN === ncrecord.id">
                        <button class="btn btn-success btn-sm me-2" @click="updateNCReport">Update</button>
                        <button class="btn btn-success btn-sm me-2" @click="cancelEditN">Cancel</button>
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
            </div>
          </div>
        </div>
      </div>
      <div class="col-4">
        <div class="card">
          <div class="card-header"><h5>Activity Graph for {{ this.userData.name }}</h5></div>
          <div class="card-body">
            <ActivitiesChart :userID="this.userID"/>
          </div>
        </div>
        <br/>
        <div class="card">
          <div class="card-header"><h5>NutritionandCalories Graph for {{ this.userData.name }}</h5></div>
          <div class="card-body">
            <NutritionandCaloriesChart :userID="this.userID"/>
          </div>
        </div>
      </div>
    </div>
  </div>


</template>
<script>
import axios from "axios";
import ActivitiesChart from "@/components/ActivitiesChart.vue";
import NutritionandCaloriesChart from "@/components/NutritionandCaloriesChart.vue";

export default {
  components: {
    ActivitiesChart,
    NutritionandCaloriesChart
  },
  data() {
    return {
      userID: null,
      userData: [],
      useractivityDetails: {},
      userappointmentDetails: {},
      usermedicationDetails: {},
      userLabReportDetails: {},
      userNCDetails: {},
      rowBeingEdited: null,
      rowBeingEditedA: null,
      rowBeingEditedM: null,
      rowBeingEditedL: null,
      rowBeingEditedN: null,
      editableActivity: {},
      editableAppointments: {},
      editableMedications: {},
      editableLabreports: {},
      editableNCRecords: {},
      selectedUserID: "",
      showTable: false,
      isCollapsed: false,
      isCollapsedActivities: false,
      isCollapsedAppointments: false,
      isCollapsedMedications: false,
      isCollapsedLabreports: false,
      isCollapsedNCRecords: false,
      apibaseUrl : 'https://healthtrackerapp-production.up.railway.app',
      //apibaseUrl : 'http://localhost:7001',
    }
  },
  created() {
    this.userID = this.$route.params.userID
    console.log(this.userID)
  },
  methods: {
    async fetchUserData() {
      try {
        const response = await axios({
          method: 'GET',
          url: `${this.apibaseUrl}/api/users/${this.userID}`,
          //url: `https://healthtrackerapp-production.up.railway.app/api/users/${this.userID}`,
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
          },
          withCredentials: true
        })
        this.userData = response.data
        console.log(this.userData)
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    },
    async fetchUserActivities() {
      try {
        const response = await axios({
          method: 'GET',
          url: `${this.apibaseUrl}/api/activities/${this.userID}`,
          //url: `https://healthtrackerapp-production.up.railway.app/api/activities/${this.userID}`,
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
          },
          withCredentials: true
        })
        this.useractivityDetails = response.data.map((data) => ({
          ...data,
          id: Number(data.id)
        })).sort((a, b) => a.id - b.id)
        this.showTable = true;
        console.log(this.useractivityDetails)
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    },
    async fetchUserAppointments() {
      try {
        const response = await axios({
          method: 'GET',
          url: `${this.apibaseUrl}/api/appointmentscheduler/${this.userID}`,
          //url: `https://healthtrackerapp-production.up.railway.app/api/appointmentscheduler/${this.userID}`,
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
          },
          withCredentials: true
        })
        this.userappointmentDetails = response.data.map((data) => ({
          ...data,
          id: Number(data.id)
        })).sort((a, b) => a.id - b.id)
        this.showTable = true;
        console.log(this.userappointmentDetails)
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    },
    async fetchUserMedications() {
      try {
        const response = await axios({
          method: 'GET',
          url: `${this.apibaseUrl}/api/medicationtracker/${this.userID}`,
          //url: `https://healthtrackerapp-production.up.railway.app/api/medicationtracker/${this.userID}`,
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
          },
          withCredentials: true
        })
        this.usermedicationDetails = response.data.map((data) => ({
          ...data,
          id: Number(data.id)
        })).sort((a, b) => a.id - b.id)
        this.showTable = true;
        console.log(this.usermedicationDetails)
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    },
    async fetchUserLabReports() {
      try {
        const response = await axios({
          method: 'GET',
          url: `${this.apibaseUrl}/api/labreports/${this.userID}`,
          //url: `https://healthtrackerapp-production.up.railway.app/api/labreports/${this.userID}`,
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
          },
          withCredentials: true
        })
        this.userLabReportDetails = response.data.map((data) => ({
          ...data,
          id: Number(data.id)
        })).sort((a, b) => a.id - b.id)
        this.showTable = true;
        console.log(this.data)
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    },
    async fetchUserNCRecords() {
      try {
        const response = await axios({
          method: 'GET',
          url: `${this.apibaseUrl}/api/nutritionandcalories/${this.userID}`,
          //url: `https://healthtrackerapp-production.up.railway.app/api/nutritionandcalories/${this.userID}`,
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
          },
          withCredentials: true
        })
        this.userNCDetails = response.data.map((data) => ({
          ...data,
          id: Number(data.id)
        })).sort((a, b) => a.id - b.id)
        this.showTable = true;
        console.log(this.data)
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    },
    async updateSearchedActivity() {
      try {
        const headers = {
          'Content-Type': 'application/json', // Ensure this header is set
          "Access-Control-Allow-Origin": "*",
        };
        const response = await axios.patch(`${this.apibaseUrl}/api/activities/${this.editableActivity.id}`, this.editableActivity, {headers});
        //const response = await axios.patch(`https://healthtrackerapp-production.up.railway.app/api/activities/${this.editableActivity.id}`, this.editableActivity, {headers});
        alert("User Activity Updated Successfully");
        console.log(response.data)
        await this.fetchUserActivities();
        this.cancelEdit();
      } catch (error) {
        console.error("error updating Activity:", error)
        alert("Failed to update user. Please try again.");
      }
    },
    async updateSearchAppointment() {
      try {
        const headers = {
          'Content-Type': 'application/json', // Ensure this header is set
          "Access-Control-Allow-Origin": "*",
        };
        const response = await axios.patch(`${this.apibaseUrl}/api/appointmentscheduler/${this.editableAppointments.id}`, this.editableAppointments, {headers});
        //const response = await axios.patch(`https://healthtrackerapp-production.up.railway.app/api/appointmentscheduler/${this.editableAppointments.id}`, this.editableAppointments, {headers});
        alert("User Appointment Updated Successfully");
        console.log(response.data)
        await this.fetchUserAppointments();
        this.cancelEditA();
      } catch (error) {
        console.error("error updating appointment:", error)
        alert("Failed to update appointment. Please try again.");
      }
    },
    async updateMedication() {
      try {
        const headers = {
          'Content-Type': 'application/json', // Ensure this header is set
          "Access-Control-Allow-Origin": "*",
        };
        const response = await axios.patch(`${this.apibaseUrl}/api/medicationtracker/${this.editableMedications.id}`, this.editableMedications, {headers});
        //const response = await axios.patch(`https://healthtrackerapp-production.up.railway.app/api/medicationtracker/${this.editableMedications.id}`, this.editableMedications, {headers});
        alert("User Medication Updated Successfully");
        console.log(response.data)
        await this.fetchUserMedications();
        this.cancelEditM();
      } catch (error) {
        console.error("error updating Medication:", error)
        alert("Failed to update Medication. Please try again.");
      }
    },
    async updateLabReport() {
      try {
        const headers = {
          'Content-Type': 'application/json', // Ensure this header is set
          "Access-Control-Allow-Origin": "*",
        };
        const response = await axios.patch(`${this.apibaseUrl}/api/labreports/${this.editableLabreports.id}`, this.editableLabreports, {headers});
        //const response = await axios.patch(`https://healthtrackerapp-production.up.railway.app/api/labreports/${this.editableLabreports.id}`, this.editableLabreports, {headers});
        alert("User LabReport Updated Successfully");
        console.log(response.data)
        await this.fetchUserLabReports();
        this.cancelEditL();
      } catch (error) {
        console.error("error updating LabReport:", error)
        alert("Failed to update LabReport. Please try again.");
      }
    },
    async updateNCReport() {
      try {
        const headers = {
          'Content-Type': 'application/json', // Ensure this header is set
          "Access-Control-Allow-Origin": "*",
        };
        const response = await axios.patch(`${this.apibaseUrl}/api/nutritionandcalories/${this.editableNCRecords.id}`, this.editableNCRecords, {headers});
        //const response = await axios.patch(`https://healthtrackerapp-production.up.railway.app/api/nutritionandcalories/${this.editableNCRecords.id}`, this.editableNCRecords, {headers});
        alert("User Nutrient and Calorie Record Updated Successfully");
        console.log(response.data)
        await this.fetchUserNCRecords();
        this.cancelEditN();
      } catch (error) {
        console.error("error updating LabReport:", error)
        alert("Failed to update Nutrient and Calorie Record. Please try again.");
      }
    },
    async deleteLabReport(labReportId) {
      if (confirm("Do you want to delete this LabReport for this user?")) {
        try {
          await axios.delete(`${this.apibaseUrl}/api/labreports/${labReportId}`);
          //await axios.delete(`https://healthtrackerapp-production.up.railway.app/api/labreports/${labReportId}`);
          alert("LabReport Deleted Successfully");
          await this.fetchUserLabReports();
        } catch (error) {
          console.error("Error Deleting LabReport:", error);
          alert("failed to delete LabReport, please try again")
        }
      }
    },
    async deleteSearchActivity(activityId) {
      if (confirm("Do you want to delete this Activity for this user?")) {
        try {
          await axios.delete(`${this.apibaseUrl}/api/activities/${activityId}`);
          //await axios.delete(`https://healthtrackerapp-production.up.railway.app/api/activities/${activityId}`);
          alert("Activity Deleted Successfully");
          await this.fetchUserActivities();
        } catch (error) {
          console.error("Error Deleting Activity:", error);
          alert("failed to delete activity, please try again")
        }
      }
    },
    async deleteSearchAppointment(appointmentId) {
      if (confirm("Do you want to delete this Activity for this user?")) {
        try {
          await axios.delete(`${this.apibaseUrl}/api/appointmentscheduler/${appointmentId}`);
          //await axios.delete(`https://healthtrackerapp-production.up.railway.app/api/appointmentscheduler/${appointmentId}`);
          alert("Appointment Deleted Successfully");
          await this.fetchUserAppointments();
        } catch (error) {
          console.error("Error Deleting Appointment:", error);
          alert("failed to delete appointment, please try again")
        }
      }
    },
    async deleteMedication(medicationId) {
      if (confirm("Do you want to delete this Medication for this user?")) {
        try {
          await axios.delete(`${this.apibaseUrl}/api/medicationtracker/${medicationId}`);
          //await axios.delete(`https://healthtrackerapp-production.up.railway.app/api/medicationtracker/${medicationId}`);
          alert("Medication Deleted Successfully");
          await this.fetchUserMedications();
        } catch (error) {
          console.error("Error Deleting Medication:", error);
          alert("failed to delete medication, please try again")
        }
      }
    },
    async deleteNCRecord(ncRecordId) {
      if (confirm("Do you want to delete this LabReport for this user?")) {
        try {
          await axios.delete(`${this.apibaseUrl}/api/nutritionandcalories/${ncRecordId}`);
          //await axios.delete(`https://healthtrackerapp-production.up.railway.app/api/nutritionandcalories/${ncRecordId}`);
          alert("User Nutrient and Calorie Record Deleted Successfully");
          await this.fetchUserNCRecords();
        } catch (error) {
          console.error("Error Deleting User Nutrient and Calorie Record:", error);
          alert("failed to delete User Nutrient and Calorie Record, please try again")
        }
      }
    },
    toggleCollapse() {
      this.isCollapsed = !this.isCollapsed;
    },
    toggleCollapseActivities() {
      this.isCollapsedActivities = !this.isCollapsedActivities;
    },
    toggleCollapseAppointments() {
      this.isCollapsedAppointments = !this.isCollapsedAppointments;
    },
    toggleCollapseMedications() {
      this.isCollapsedMedications = !this.isCollapsedMedications;
    },
    toggleCollapseLabReports() {
      this.isCollapsedLabreports = !this.isCollapsedLabreports;
    },
    toggleCollapseNCRecords() {
      this.isCollapsedNCRecords = !this.isCollapsedNCRecords;
    },
    editActivity(activity) {
      this.rowBeingEdited = activity.id;
      this.editableActivity = {...activity}; // Clone the user data
    },

    // Cancel editing
    cancelEdit() {
      this.rowBeingEdited = null;
      this.editableActivity = {}; // Clear the editableUser object
    },
    editAppointment(appointment) {
      this.rowBeingEditedA = appointment.id;
      this.editableAppointments = {...appointment}; // Clone the user data
    },

    // Cancel editing
    cancelEditA() {
      this.rowBeingEditedA = null;
      this.editableAppointments = {}; // Clear the editableUser object
    },
    editMedication(medication) {
      this.rowBeingEditedM = medication.id;
      this.editableMedications = {...medication}; // Clone the user data
    },

    // Cancel editing
    cancelEditM() {
      this.rowBeingEditedM = null;
      this.editableMedications = {}; // Clear the editableUser object
    },
    editLabReports(labreports) {
      this.rowBeingEditedL = labreports.id;
      this.editableLabreports = {...labreports}; // Clone the user data
    },
    cancelEditL() {
      this.rowBeingEditedL = null;
      this.editableLabreports = {}; // Clear the editableUser object
    },
    editNCRecords(ncrecord) {
      this.rowBeingEditedN = ncrecord.id;
      this.editableNCRecords = {...ncrecord}; // Clone the user data
    },
    cancelEditN() {
      this.rowBeingEditedN = null;
      this.editableNCRecords = {}; // Clear the editableUser object
    },
  },
  name: "OverViewPage",
  mounted() {
    this.fetchUserData();
    this.fetchUserActivities();
    this.fetchUserAppointments();
    this.fetchUserMedications();
    this.fetchUserLabReports();
    this.fetchUserNCRecords();
    this.isCollapsed = true;
    this.isCollapsedActivities = true;
    this.isCollapsedAppointments = true;
    this.isCollapsedMedications = true;
    this.isCollapsedLabreports = true;
    this.isCollapsedNCRecords = true;
  }
}
</script>
<style>

</style>