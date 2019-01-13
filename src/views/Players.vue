<template>
  <div class="players">
    <h1>This is an about players</h1>
    <div class="team_list">
      <ul>
        <li v-for="team in teams" :key="team.id">
          <p>{{ team.name }}</p>
        </li>
      </ul>
    </div>
    <div class="roster_box">
      <ul>
        <li v-for="player in players" :key="player.person.id">
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
  name: 'playerinfo',
  data: () => {
    return {
      teams: [],
      players: [],
      initialID: 1,
    };
  },
  created() {
    this.$http.get('https://statsapi.web.nhl.com/api/v1/teams').then((response) => {
      this.teams = response.data.teams;
    }).catch((error) => {
      console.error(error);
    });

    this.$http.get(`https://statsapi.web.nhl.com/api/v1/teams/${this.initialID}/roster`).then((response) => {
      this.players = response.data.roster;
    }).catch((error) => {
      console.error(error);
    });
  },
};
</script>
