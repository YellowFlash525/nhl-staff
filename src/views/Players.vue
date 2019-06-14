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
      <Roster :roster="players"/>
    </div>
  </div>
</template>

<script>
import Roster from '@/components/Roster.vue';

export default {
  name: 'playerinfo',
  components: {
    Roster,
  },
  data() {
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
    height: 900px;

    h1 {
      width: 85%;
      margin: 0 auto 15px;
      padding: 0 0 15px 0;
      border-bottom: 2px solid #EEF0F3;
    }

    ul {
      width: 100%;
      height: 60%;
      overflow: overlay;

      &::-webkit-scrollbar-track {
        -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
        border-radius: 2px;
        background-color: #F5F5F5;
      }

      &::-webkit-scrollbar {
        width: 12px;
        background-color: #F5F5F5;
      }

      &::-webkit-scrollbar-thumb {
        border-radius: 2px;
        -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.3);
        background-color: #EEF0F3;
      }
    }

    li {
      display: inline-block;
      width: 85%;
      margin-bottom: 10px;

      p {
        background: #EEF0F3;
        padding: 20px 40px;
        width: 100%;
        cursor: pointer;
        border-bottom: 2px solid #EEF0F3;
        margin: 0;

        &:hover {
          border-bottom: 2px solid blue;
        }
      }
    }

    @media (max-width: 768px) {
      height: 100%;
    }
  }

  .wrapper {
    width: 70%;
    margin-left: 15px;

    @media (max-width: 768px) {
      margin-left: 0;
    }
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
      box-shadow: 0 2px 0 rgba(blue,0.8);
    }

    .container {
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .roster {
      text-decoration: none;
      color: black;
    }

    .player_number {
      font-size: 36px;
      margin: 16px 0;
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
      width: 85%;
      margin: 0 auto;
      text-align: center;
    }

    .roster_wrapper {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
    }
  }

  @media (min-width: 769px ) and (max-width: 992px) {
    .team_list {
      width: 40%;
    }

    .wrapper {
      width: 60%;
    }
  }
</style>
