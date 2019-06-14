<template>
  <div class="home">
    <div class="home_content">
      <div class="conference_switchers">
        <p class="is-active" v-on:click="takeByConference('Eastern', $event)" >East</p>
        <p v-on:click="takeByConference('Western', $event)" >West</p>
      </div>
      <Standings :records="teams"/>
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
  data() {
    return {
      standings: [],
      teams: [],
      conf: String,
    };
  },
  methods: {
    takeByConference: function (conf, event) {
      if (event) {
        this.$el.querySelector('.is-active').classList.remove('is-active');
        event.target.classList.add('is-active');
      }

      this.teams = [];
      this.standings.forEach((standing) => {
        if (standing.conference.name === conf) {
          this.teams.push(standing.teamRecords);
        }
      });

      this.teams = [].concat(...this.teams);
    },
  },
  created() {
    this.$http
      .get('https://statsapi.web.nhl.com/api/v1/standings/byConference')
      .then((response) => {
        this.standings = response.data.records;
        this.takeByConference('Eastern');
      })
      .catch((error) => {
        console.error(error);
      });
  },
};
</script>

<style lang="scss" scoped>
.home_content {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.conference_switchers {
  display: flex;
  margin-top: 15px;

  p {
    padding: 5px 24px;
    margin: 0 5px;
    border-radius: 3px;
    background-color: #fff;
    cursor: pointer;
    border: 2px solid #e6e8ea;

    &.is-active,
    &:hover {
      background-color: #e6e8ea;
    }
  }
}
</style>
