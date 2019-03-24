<template>
  <div class="teams">
    <div class="team_wrapper" v-for="team in teams" :key="team.id">
      <router-link class="router" v-bind:to="`teams/${team.id}`">
        <div class="team">
          <div class="team_front_info">
            <p>{{ team.name }}</p>
          </div>
          <div class="team_back_info">
            <p>{{ team.division.name }}</p>
            <p>{{ team.locationName }}</p>
            <p>{{ team.firstYearOfPlay }}</p>
          </div>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'teams',
  data: () => {
    return {
      teams: [],
    };
  },
  created() {
    this.$http.get('https://statsapi.web.nhl.com/api/v1/teams').then((response) => {
      this.teams = response.data.teams;
    }).catch((error) => {
      console.error(error);
    });
  },
};
</script>

<style scoped lang="scss">
.teams {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  margin: 50px auto;
  width: 100%;
  flex-basis: 25%;
}

.router {
  text-decoration: none;
}

.team {
  height: 60px;
  background: #EEF0F3;
  position: relative;
  width: 120px;
  transition: .25s;
  transform: scale(1.0000001);
  margin: 40px 20px;
  color: black;
  display: flex;
  align-items: center;
  justify-content: center;

  .team_front_info {
    display: flex;
    align-items: center;
    justify-content: center;

    p {
      padding: 10px;
    }
  }

  .team_back_info {
    display: none;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    
    p {
      margin: 0;
    }
  }
}

.team:after {
  border-left: 60px solid transparent;
  border-right: 60px solid transparent;
  border-top: 35px solid #EEF0F3;
  bottom: -35px;
  height: 0;
  content: '';
  left: 0;
  position: absolute;
  width: 0;
}

.team:before {
  border-bottom: 35px solid #EEF0F3;
  border-left: 60px solid transparent;
  border-right: 60px solid transparent;
  height: 0;
  content: '';
  left: 0;
  position: absolute;
  top: -35px;
  width: 0;
}

.team:hover {
  transform: scale(1.3);

  .team_front_info {
    display: none;
  }

  .team_back_info {
    display: flex;
  }
}
</style>
