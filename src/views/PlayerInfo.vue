<template>
  <div class="player">
    <div class="player_info" v-if="is_playerInfo_fetched">
      <div class="player_info--foto">
        <img src="../../public/hockey-512.png">
      </div>
      <div class="player_wrapper">
        <div class="player_info--detail">
          <h1>#{{ playerInfo[0].primaryNumber }}</h1>
          <h1>{{ playerInfo[0].fullName }}</h1>
        </div>
        <div class="player_info--detail">
          <p>Birth Date:</p>
          <p>{{ playerInfo[0].birthDate }}</p>
        </div>
        <div class="player_info--detail">
          <p>Age:</p>
          <p>{{ playerInfo[0].currentAge }}</p>
        </div>
        <div class="player_info--detail">
          <p>City:</p>
          <p>{{ playerInfo[0].birthCity }}</p>
        </div>
        <div class="player_info--detail">
          <p>Country:</p>
          <p>{{ playerInfo[0].birthCountry }}</p>
        </div>
        <div class="player_info--detail">
          <p>Weight:</p>
          <p>{{ playerInfo[0].weight }}</p>
        </div>
        <div class="player_info--detail">
          <p>Height:</p>
          <p>{{ playerInfo[0].height }}</p>
        </div>
        <div class="player_info--detail">
          <p>Rookie:</p>
          <p>{{ playerInfo[0].rookie }}</p>
        </div>
      </div>
    </div>
    <div class="player_stats">
      <div class="player_stats--goalkeaper" v-if="goalkeaper && is_playerStat_fetched">
        <div>
          <p>GoalsAgainst</p>
          <p>{{ playerStats.goalsAgainst }}</p>
        </div>
        <div>
          <p>GoalsAgainstAvg</p>
          <p>{{ playerStats.goalAgainstAverage }}</p>
        </div>
        <div>
          <p>ShotsAgainst</p>
          <p>{{ playerStats.shotsAgainst }}</p>
        </div>
        <div>
          <p>Saves</p>
          <p>{{ playerStats.saves }}</p>
        </div>
        <div>
          <p>ShutOuts</p>
          <p>{{ playerStats.shutouts }}</p>
        </div>
        <div>
          <p>TimeOnIce</p>
          <p>{{ playerStats.timeOnIce }}</p>
        </div>
        <div>
          <p>TimeOnIcePerGAme</p>
          <p>{{ playerStats.timeOnIcePerGame }}</p>
        </div>
      </div>
      <div v-else class="player_stats--field">
        <div>
          <p>Goals</p>
          <p>{{ playerStats.goals }}</p>
        </div>
        <div>
          <p>Assists</p>
          <p>{{ playerStats.assists }}</p>
        </div>
        <div>
          <p>Points</p>
          <p>{{ playerStats.points }}</p>
        </div>
        <div>
          <p>Shots</p>
          <p>{{ playerStats.shots }}</p>
        </div>
        <div>
          <p>ShotPCT(%)</p>
          <p>{{ playerStats.shotPct }}</p>
        </div>
        <div>
          <p>PenaltyMin</p>
          <p>{{ playerStats.pim }}</p>
        </div>
        <div>
          <p>GameWinningGoals</p>
          <p>{{ playerStats.gameWinningGoals }}</p>
        </div>
        <div>
          <p>TimeOnIce</p>
          <p>{{ playerStats.timeOnIce }}</p>
        </div>
        <div>
          <p>TimeOnIcePerGame</p>
          <p>{{ playerStats.timeOnIcePerGame }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'playerinfo',
  data() {
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
    width: 90%;
    margin: 30px auto;
    display: flex;

  &_info {
    width: 80%;
    display: flex;
    flex-direction: column;
    justify-content: center;
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
      margin: 0 5px 0 0;
    }

    &--foto {
      img {
        border-radius: 50%;
        width: 150px;
      }
    }

    &--detail {
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }

  &_stats--field,
  &_stats--goalkeaper {
    display: flex;
    margin-left: 20px;
    border-radius: 3px;
    flex-wrap: wrap;
    justify-content: space-around;

    div {
      width: 200px;
      background: #f4f4f4;
      margin-bottom: 10px;
      border-radius: 5px;
      border-bottom: 1px solid blue;
    }
  }
}
</style>
