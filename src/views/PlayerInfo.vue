<template>
  <div class="player">
    <div class="player_info" v-if="is_playerInfo_fetched">
      <div class="player_info--foto">
        <img src="../../public/hockey-512.png">
      </div>
      <div class="player_wrapper">
        <div class="player_info--detail">
          <h1>{{ playerInfo[0].fullName }}</h1>
          <h1>#{{ playerInfo[0].primaryNumber }}</h1>
          <h1>{{ playerInfo[0].primaryPosition.name }}</h1>
        </div>
        <div class="player_info--detail">
          <p>Birth Date</p>
          <p>{{ playerInfo[0].birthDate }}</p>
        </div>
        <div class="player_info--detail">
          <p>Age</p>
          <p>{{ playerInfo[0].currentAge }}</p>
        </div>
        <div class="player_info--detail">
          <p>City</p>
          <p>{{ playerInfo[0].birthCity }}</p>
        </div>
        <div class="player_info--detail">
          <p>Country</p>
          <p>{{ playerInfo[0].birthCountry }}</p>
        </div>
        <div class="player_info--detail">
          <p>Weight</p>
          <p>{{ playerInfo[0].weight }}</p>
        </div>
        <div class="player_info--detail">
          <p>Height</p>
          <p>{{ playerInfo[0].height }}</p>
        </div>
        <div class="player_info--detail">
          <p>Rookie</p>
          <p>{{ playerInfo[0].rookie }}</p>
        </div>
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
      console.log(response.data.people);

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
  width: 75%;
  margin: 30px auto;

  &_info {
    display: flex;
    background: #d3d3d3;
    border-radius: 3px;
    padding: 30px;

    h1 {
      margin-top: 0;
      margin-right: 20px;
      padding-right: 20px;
      border-right: 2px solid;

      &:last-of-type {
        border-right: none;
      }
    }

    p {
      margin: 0;
    }

    &--foto {
      padding-right: 30px;

      img {
        border-radius: 50%;
        width: 200px;
      }
    }

    &--detail {
      display: flex;
      align-items: baseline;
      
      p {
        &:first-of-type {
          width: 150px;
          text-align: left;
        }
      }
    }
  }

  &_stats--field,
  &_stats--goalkeaper {
    display: flex;
    background: #EEF0F3;
    margin-top: 20px;
    border-radius: 3px;
  }
}
</style>
