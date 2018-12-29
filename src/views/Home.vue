<template>
  <div class="home">
    <div class="home_content">
      <Standings side="Eastern" :recordsEast="standingsEastern"/>
      <Standings side="Western" :recordsWest="standingsWestern"/>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Standings from '@/components/Standings.vue';

export default {
  name: 'home',
  components: {
    Standings,
  },
  data: () => {
    return {
      standings: [],
      standingsEastern: [],
      standingsWestern: [],
    }
  },
  created() {
    this.$http.get('https://statsapi.web.nhl.com/api/v1/standings')
    .then((response) => {
      this.standings = response.data.records;

      this.standings.forEach((record) => {
        if (record.conference.name === 'Eastern') {
          this.standingsEastern.push(record.teamRecords);
       } else {
          this.standingsWestern.push(record.teamRecords);
       }
      });

      this.standingsEastern = [].concat(...this.standingsEastern);
      this.standingsWestern = [].concat(...this.standingsWestern);
    })
    .catch((error) => {
      console.error(error);
    });
  },
};
</script>

<style lang="scss">
  .home_content {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }
</style>
