<template>
  <div class="layout">
    <header>
      <h1>HealthTrackerApp</h1>
      <nav class="navbar navbar-expand-lg navbar-light">
        <a class="navbar-brand" href="/">Home</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
                data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav me-auto">
            <li class="navbar-nav me-auto"><router-link class="nav-link" to="/">Users</router-link></li>
            <li class="nav-item"><router-link class="nav-link" to="/">Activities</router-link></li>
          </ul>
        </div>
      </nav>
    </header>
    <div class="content mt-3">
      <main class="container-fluid">
        <router-view/>
      </main>
    </div>
<!--    <div class="content mt">-->
<!--      <footer>-->
<!--        <p>HealthTrackerApp © 2024</p>-->
<!--      </footer>-->
<!--    </div>-->

  </div>
</template>
<script>
export default {
  name: "BaseLayout"
}
</script>
<style>
.navbar {
  background-color: #e3f2fd;
}
</style>