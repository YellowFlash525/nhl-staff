<template>
  <div class="teamPage">
    <div class="teaminfo" v-if="is_data_fetched">
      <p>{{ teamInfo[0].name }}</p>
      <p>{{ teamInfo[0].venue.name }}</p>
      <p>{{ teamInfo[0].venue.city }}</p>
      <p>{{ teamInfo[0].firstYearOfPlay }}</p>
      <p>{{ teamInfo[0].division.name }}</p>
      <p>{{ teamInfo[0].conference.name }}</p>
      <p>{{ teamInfo[0].officialSiteUrl }}</p>
    </div>
    <div class="wrapper">
      <div class="team_statistics">
        <h1>Team Statistics</h1>
      </div>
      <div class="team_roster">
        <h1>Roster</h1>
        <div class="roster_wrapper">
          <div class="roster_box" v-for="player in teamPlayers" :key="player.person.id">
            <div class="container">
              <div class="player">
                <router-link class="roster" v-bind:to="`players/${player.person.id}`">
                  <p>{{ player.person.fullName }}</p>
                  <p>{{ player.jerseyNumber }}</p>
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

<style lang="scss" scoped>
  .teamPage {
    display: flex;
    margin: 40px 0;
  }

  .teaminfo {
    width: 30%;
  }

  .wrapper {
    width: 70%;
  }

  .roster {
    text-decoration: none;
  }

  .team_roster,
  .team_statistics {
    h1 {
      width: 60%;
      text-align: left;
      margin: 0 0 0 10px;
      background: #EEF0F3
    }
  }
  
  .roster_wrapper {
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
  }

  .roster_box {
    width: 200px;
    height: 200px;
    background: #EEF0F3;
    position: relative;
    overflow: hidden;
    margin: 10px 5px;
    box-shadow: 0;
    transform: scale(0.95);
    transition: box-shadow 0.5s, transform 0.5s;

    &:hover {
      transform: scale(1);
      box-shadow: 0 2px 0 rgba(0,0,0,0.2);
    }

    .container {
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }

  @media (max-width: 768px) {
    .teamPage {
      flex-direction: column;
      align-items: center;
    }

    .teaminfo {
      width: 100%;
    }

    .wrapper {
      width: 100%;
    }

    .team_roster,
    .team_statistics { 
      h1 {
        margin: 0 auto;
        text-align: center;
      }
    }

    .roster_wrapper {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
    }
  }
</style>

