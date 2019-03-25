<template>
  <div class="teamPage">
    <div class="team_wrapper" v-if="is_data_fetched">
      <div class="team_info">
        <h1>{{ teamInfo[0].name }}</h1>
        <p>Arena: {{ teamInfo[0].venue.name }}</p>
        <p>City: {{ teamInfo[0].venue.city }}</p>
        <p>Birth: {{ teamInfo[0].firstYearOfPlay }}</p>
        <p>Division: {{ teamInfo[0].division.name }}</p>
        <p>Conference: {{ teamInfo[0].conference.name }}</p>
        <p>Url: <a v-bind:href="`${teamInfo[0].officialSiteUrl}`">Home Page</a></p>
      </div>
      <div class="team_statistics">
        <h1>Team Statistics</h1>
        <div class="statistic_wrapper">
          <div class="statistic_box">
            <div class="container">
              <div class="stat">
                <p>eggar</p>
                <p>{{ teamStats.evGGARatio }}</p>
              </div>
              <div class="stat">
                <p>fow(%)</p>
                <p>{{ teamStats.faceOffWinPercentage }}</p>
              </div>
              <div class="stat">
                <p>fol</p>
                <p>{{ teamStats.faceOffsLost }}</p>
              </div>
              <div class="stat">
                <p>fot</p>
                <p>{{ teamStats.faceOffsTaken }}</p>
              </div>
              <div class="stat">
                <p>fow</p>
                <p>{{ teamStats.faceOffsWon }}</p>
              </div>
              <div class="stat">
                <p>games</p>
                <p>{{ teamStats.gamesPlayed }}</p>
              </div>
              <div class="stat">
                <p>gapg</p>
                <p>{{ teamStats.goalsAgainstPerGame }}</p>
              </div>
              <div class="stat">
                <p>gpg</p>
                <p>{{ teamStats.goalsPerGame }}</p>
              </div>
              <div class="stat">
                <p>wins</p>
                <p>{{ teamStats.wins }}</p>
              </div>
              <div class="stat">
                <p>losses</p>
                <p>{{ teamStats.losses }}</p>
              </div>
              <div class="stat">
                <p>ot</p>
                <p>{{ teamStats.ot }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="wrapper">
      <div class="team_roster">
        <h1>Players</h1>
        <div class="roster_wrapper">
          <div class="roster_box" v-for="player in teamPlayers" :key="player.person.id">
            <div class="container">
              <div class="player">
                <router-link class="roster" v-bind:to="`players/${player.person.id}`">
                  <p class="player_number">#{{ player.jerseyNumber }}</p>
                  <p>{{ player.person.fullName }}</p>
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
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
      teamStats: [],
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

    this.$http.get(`https://statsapi.web.nhl.com/api/v1/teams/${this.$route.params.id}/stats`).then((response) => {
      this.teamStats = response.data.stats[0].splits[0].stat;
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

<style lang="scss" scoped>
  .teamPage {
    display: flex;
    margin: 40px 0;
  }

  .team_wrapper {
    width: 30%;
  }

  .wrapper {
    width: 70%;
  }

  .team_info {
    width: 85%;
    margin: 0 auto;
    background: #EEF0F3;
    padding: 20px;
    text-align: left;
    border-radius: 5px;

    h1 {
      font-size: 28px;
      margin-top: 0;
    }

    p {
      margin: 10px 0;
    }
  }

  .roster {
    text-decoration: none;
    color: #000;
  }

  .team_roster {
    h1 {
      text-align: left;
      width: 45%;
      margin: 0 0 0 10px;
      padding: 0 0 15px 0;
      border-bottom: 2px solid #EEF0F3;
    }
  }

  .roster_wrapper {
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;

    .player_number {
      font-size: 36px;
      margin: 16px 0;
    }
  }

  .roster_box {
    width: 200px;
    height: 200px;
    background: #EEF0F3;
    border-radius: 3px;
    position: relative;
    overflow: hidden;
    margin: 10px 5px;
    box-shadow: 0;
    transform: scale(0.95);
    transition: box-shadow 0.5s, transform 0.5s;

    &:hover {
      transform: scale(1);
      box-shadow: 0 2px 0 rgba(blue,0.8);
    }

    .container {
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }

  .team_statistics {
    width: 85%;
    margin: 0 auto;

    h1 {
      text-align: left;
      width: 90%;
      margin: 10px 0;
      padding: 0 0 15px 0;
      border-bottom: 2px solid #EEF0F3;
    }

    p {
      margin: 0;
    }

    .container {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      margin: 10px 0;
    }

    .stat {
      background: #EEF0F3;
      border-radius: 3px;
      width: 80px;
      height: 60px;
      margin: 5px 5px 5px 0;
      display: flex;
      flex-direction: column;
      justify-content: center;

      p {
        font-size: 14px;

        &:first-of-type {
          text-transform: uppercase;
        }
      }
    }
  }

  @media (max-width: 480px) {
    .roster_box {
      width: 140px;
      height: 160px;
    }
  }

  @media (max-width: 768px) {
    .teamPage {
      flex-direction: column;
      align-items: center;
    }

    .team_wrapper {
      width: 100%;
    }

    .wrapper {
      width: 100%;
    }

    .team_roster {
      h1 {
        margin: 0 auto;
        text-align: center;
      }
    }

    .team_statistics {
      h1 {
        width: 45%;
        margin: 15px auto 0;
        text-align: center;
      }
    }

    .roster_wrapper {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
    }

    .team_statistics {
      width: 100%;

      .statistic_wrapper {
        width: 85%;
        margin: 0 auto;
      }
    }
  }

  @media (max-width: 480px) {
    .roster_box {
      width: 140px;
      height: 160px;
    }
  }
</style>
