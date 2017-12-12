<template>
  <div>
    <h1>Top 100 Campers All Time</h1>
    <table>
      <tr>
        <th>Rank</th>
        <th>Username</th>
        <th>Last 30 Days</th>
        <th>All Time</th>
        <th>Last Update</th>
      </tr>
      <!--TODO: Put camper into singleCamper component-->
      <tr v-for="(camper, index) in campers">
        <td>{{ index + 1 }}</td>
        <td>{{ camper.username }}</td>
        <td>{{ camper.recent }}</td>
        <td>{{ camper.alltime }}</td>
        <td>{{ camper.lastUpdate }}</td> 
      </tr>
    </table>
  </div>
</template>

<script>

export default {
  data() {
    return {
      campers: []
    }
  },
  methods: {

  },
  created() {
    this.$http.get('https://fcctop100.herokuapp.com/api/fccusers/top/alltime').then(function(data) {
      this.campers = data.body;
    });
  }
}
</script>

<style>
</style>