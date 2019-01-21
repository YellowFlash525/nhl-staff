<template>
  <div class="players">
    <div class="team_list">
      <h1>Teams</h1>
      <ul>
        <li v-for="team in teams" :key="team.id">
          <p v-on:click="changeTeam(team.id)">{{ team.name }}</p>
        </li>
      </ul>
    </div>
    <div class="wrapper">
      <div class="team_roster">
        <h1>Roster</h1>
        <div class="roster_wrapper">
          <div class="roster_box" v-for="player in players" :key="player.person.id">
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
  methods: {
    changeTeam: function (id) {
      this.$http.get(`https://statsapi.web.nhl.com/api/v1/teams/${id}/roster`).then((response) => {
        this.players = response.data.roster;
      }).catch((error) => {
        console.error(error);
      });
    },
  },
};
</script>

<style scoped lang="scss">
  .players {
    display: flex;
    justify-content: center;
    margin: 40px 0;
  }

  .team_list {
    width: 30%;

    h1 {
      margin-top: 0;
    }
  }

  .wrapper {
    width: 70%;
  }

  .team_roster {
    h1 {
      width: 60%;
      text-align: left;
      margin: 0 0 0 10px;
      background: #EEF0F3;
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
    .players {
      flex-direction: column;
      align-items: center;
    }

    .team_list {
      width: 100%;
    }

    .wrapper {
      width: 100%;
    }

    .team_roster h1 {
      margin: 0 auto;
      text-align: center;
    }

    .roster_wrapper {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
    }
  }
</style>
