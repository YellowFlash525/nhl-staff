<template>
  <div class="teams">
    <h1>This is an about teams</h1>
    <p v-for="team in teams" :key="team.id"><router-link v-bind:to="`teams/${team.id}`">{{ team.name }}</router-link></p>
  </div>
</template>

<script>
export default {
  name: 'teams',
  data: () => {
    return {
      teams: [],
    };
  },
  created() {
    this.$http.get('https://statsapi.web.nhl.com/api/v1/teams').then((response) => {
      this.teams = response.data.teams;
    }).catch((error) => {
      console.error(error);
    });
  },
};
</script>
