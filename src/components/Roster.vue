<template>
  <div class="team_roster">
        <h1>Players</h1>
        <div class="filters">
          <section>
            <div v-for="pos in positions" :key="pos.id">
              <input type="radio"
                    v-model="pickedPosition"
                    v-bind:value="pos.name"
                    v-on:change="fetchPlayersByPosition()">{{ pos.name }}
            </div>
          </section>
        </div>
        <div class="roster_wrapper">
          <div class="roster_box" v-for="player in rosterList" :key="player.person.id">
            <div class="container">
              <div class="player">
                <router-link class="roster" v-bind:to="`players/${player.person.id}`">
                  <p class="player_number">#{{ player.jerseyNumber }}</p>
                  <h3>{{ player.person.fullName }}</h3>
                  <p>{{ player.position.name }} </p>
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
</template>

<script>
export default {
  props: {
    roster: Array,
  },
  data() {
    return {
      positions: [
        { id: 1, name: 'All' },
        { id: 2, name: 'Goalie' },
        { id: 3, name: 'Left Wing' },
        { id: 4, name: 'Right Wing' },
        { id: 5, name: 'Defenseman' },
        { id: 6, name: 'Center' },
      ],
      pickedPosition: 'All',
      rosterList: [],
    };
  },
  computed: {
    cachedPlayersList: {
      get: function () {
        return this.rosterList;
      },
      set: function (value) {
        this.rosterList = value;
      },
    },
  },
  watch: {
    roster: function () {
      this.pickedPosition = 'All';
      this.rosterList = this.roster;
    },
  },
  methods: {
    fetchPlayersByPosition: function () {
      if (this.pickedPosition === 'All') {
        this.cachedPlayersList = this.roster;
      } else {
        this.cachedPlayersList = this.roster.filter(obj => obj.position.name === this.pickedPosition);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.roster {
  text-decoration: none;
  color: #000;

  p {
    margin-top: 0;
  }

  h3 {
    margin-bottom: 0;
  }
}

.team_roster {
  h1 {
    text-align: left;
    width: 45%;
    margin: 0 0 0 10px;
    padding: 0 0 15px 0;
    border-bottom: 2px solid #eef0f3;

    @media (max-width: 768px) {
      text-align: center;
    }
  }

  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
}

.filters {
  margin-left: 10px;

  section {
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    margin-top: 10px;

    div {
      display: flex;
      align-items: center;
      margin: 0 5px 0;
    }

    @media (max-width: 768px) {
      justify-content: center;
    }
  }
}

.roster_wrapper {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;

  .player_number {
    font-size: 36px;
    margin: 0 0 16px;
  }

  @media (max-width: 768px) {
    justify-content: center;
  }
}

.roster_box {
  width: 200px;
  height: 200px;
  background: #eef0f3;
  border-radius: 3px;
  position: relative;
  overflow: hidden;
  margin: 10px 5px;
  box-shadow: 0;
  transform: scale(0.95);
  transition: box-shadow 0.5s, transform 0.5s;

  &:hover {
    transform: scale(1);
    box-shadow: 0 2px 0 rgba(blue, 0.8);
  }

  .container {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>
