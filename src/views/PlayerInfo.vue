<template>
  <div class="playerPage">
    <h1>This is an about player {{ $route.params.id }}</h1>
    <div class="playerinfo" v-if="is_data_fetched">
      <p>{{ playerInfo[0].fullName }}</p>
      <p>{{ playerInfo[0].primaryNumber }}</p>
      <p>{{ playerInfo[0].birthDate }}</p>
      <p>{{ playerInfo[0].birthCity }}</p>
      <p>{{ playerInfo[0].birthCountry }}</p>
      <p>{{ playerInfo[0].height }}</p>
      <p>{{ playerInfo[0].rookie }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'playerinfo',
  data: () => {
    return {
      playerInfo: [],
      is_data_fetched: false,
    };
  },
  created() {
    this.$http.get(`https://statsapi.web.nhl.com/api/v1/people/${this.$route.params.id}`).then((response) => {
      this.playerInfo = response.data.people;
      this.is_data_fetched = true;
    }).catch((error) => {
      console.error(error);
    });
  },
  // https://statsapi.web.nhl.com/api/v1/people/ID/stats - to be done stats player
};
</script>
