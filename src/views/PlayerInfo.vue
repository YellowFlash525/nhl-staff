<template>
  <div class="player">
    <div class="player_info" v-if="is_playerInfo_fetched">
      <div>
        <p>Full Name</p>
        <p>{{ playerInfo[0].fullName }}</p>
      </div>
      <div>
        <p>Primary Number</p>
        <p>{{ playerInfo[0].primaryNumber }}</p>
      </div>
      <div>
        <p>Position</p>
        <p>{{ playerInfo[0].primaryPosition.name }}</p>
      </div>
      <div>
        <p>Birth Date</p>
        <p>{{ playerInfo[0].birthDate }}</p>
      </div>
      <div>
        <p>City</p>
        <p>{{ playerInfo[0].birthCity }}</p>
      </div>
      <div>
        <p>Country</p>
        <p>{{ playerInfo[0].birthCountry }}</p>
      </div>
      <div>
        <p>Height</p>
        <p>{{ playerInfo[0].height }}</p>
      </div>
      <div>
        <p>Rookie</p>
        <p>{{ playerInfo[0].rookie }}</p>
      </div>
    </div>
    <div class="player_stats">
      <div class="player_stats--field" v-if="field_player && is_playerStat_fetched">
        <p>Goals {{ playerStats.goals }}</p>
        <p>Assists {{ playerStats.assists }}</p>
        <p>Points {{ playerStats.points }}</p>
        <p>Shots{{ playerStats.shots }}</p>
        <p>ShotPCT(%) {{ playerStats.shotPct }}</p>
        <p>PenaltyMin {{ playerStats.pim }}</p>
        <p>GameWinningGoals {{ playerStats.gameWinningGoals }}</p>
        <p>TimeOnIce {{ playerStats.timeOnIce }}</p>
        <p>TimeOnIcePerGame {{ playerStats.timeOnIcePerGame }}</p>
      </div>
      <div class="player_stats--goalkeaper" v-if="goalkeaper && is_playerStat_fetched">
        <p>GoalsAgainst {{ playerStats.goalsAgainst }}</p>
        <p>GoalsAgainstAvg {{ playerStats.goalAgainstAverage }}</p>
        <p>ShotsAgainst {{ playerStats.shotsAgainst }}</p>
        <p>Saves {{ playerStats.saves }}</p>
        <p>ShutOuts {{ playerStats.shutouts }}</p>
        <p>TimeOnIce {{ playerStats.timeOnIce }}</p>
        <p>TimeOnIcePerGAme {{ playerStats.timeOnIcePerGame }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'playerinfo',
  data: () => {
    return {
      playerInfo: [],
      playerStats: [],
      is_playerInfo_fetched: false,
      is_playerStat_fetched: false,
      field_player: false,
      goalkeaper: false,
    };
  },
  created() {
    this.$http.get(`https://statsapi.web.nhl.com/api/v1/people/${this.$route.params.id}`).then((response) => {
      this.playerInfo = response.data.people;

      if (this.playerInfo[0].primaryPosition.name === 'Goalie') {
        this.goalkeaper = true;
      } else {
        this.field_player = true;
      }

      this.is_playerInfo_fetched = true;
    }).catch((error) => {
      console.error(error);
    });

    this.$http.get(`https://statsapi.web.nhl.com/api/v1/people/${this.$route.params.id}/stats?stats=statsSingleSeason`).then((response) => {
      this.playerStats = response.data.stats[0].splits[0].stat;
      this.is_playerStat_fetched = true;
    }).catch((error) => {
      console.error(error);
    });
  },
};
</script>

<style scoped lang="scss">
.player {
  display: flex;
  justify-content: center;
  margin: 40px 0;
  width: 100%;

  &_info {
    div {
      p {
        font-size: 15px;
        margin: 0 5px;

        &:first-of-type {
          font-size: 11px;
          margin: 0;
        }
      }
    }
  }
}
</style>
