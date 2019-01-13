<template>
  <div class="teamPage">
    <h1>This is an about team {{ $route.params.id }}</h1>
    <div class="teaminfo" v-if="is_data_fetched">
      <p>{{ teamInfo[0].name }}</p>
      <p>{{ teamInfo[0].venue.name }}</p>
      <p>{{ teamInfo[0].venue.city }}</p>
      <p>{{ teamInfo[0].firstYearOfPlay }}</p>
      <p>{{ teamInfo[0].division.name }}</p>
      <p>{{ teamInfo[0].conference.name }}</p>
      <p>{{ teamInfo[0].officialSiteUrl }}</p>
    </div>
    <div class="teamroster">
      <ul>
        <li v-for="player in teamPlayers" :key="player.person.id">
          <router-link v-bind:to="`players/${player.person.id}`">
            <p>{{ player.person.fullName }}</p>
            <p>{{ player.jerseyNumber }}</p>
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'teaminfo',
  data: () => {
    return {
      teamPlayers: [],
      teamInfo: [],
      is_data_fetched: false,
    };
  },
  async created() {
    this.$http.get(`https://statsapi.web.nhl.com/api/v1/teams/${this.$route.params.id}`).then((response) => {
      this.teamInfo = response.data.teams;
      this.is_data_fetched = true;
    }).catch((error) => {
      console.error(error);
    });

    this.$http.get(`https://statsapi.web.nhl.com/api/v1/teams/${this.$route.params.id}/roster`).then((response) => {
      this.teamPlayers = response.data.roster;
    }).catch((error) => {
      console.error(error);
    });
  },
};
</script>
