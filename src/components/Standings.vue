<template>
  <div class="conferences">
    <div class="teams">
      <div v-for="record in records" :key="record.team.id" class="teams_item">
        <h3 class="teams_rank">#{{ record.conferenceRank }}</h3>
        <div class="teams_name">{{ record.team.name }}</div>
        <p class="teams_streak">{{ record.streak.streakCode }}</p>
        <ul class="teams_records">
            <li class="teams_wins">
              <p>W</p>
              <p>{{ record.leagueRecord.wins }}</p>
            </li>
            <li class="teams_losess">
              <p>L</p>
              <p>{{ record.leagueRecord.losses }}</p>
            </li>
            <li class="teams_overtime">
              <p>OT</p>
              <p>{{ record.leagueRecord.ot }}</p>
            </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
// import { _ } from 'lodash';

export default {
  props: {
    side: String,
    records: Array,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
* {
  box-sizing: border-box;
}

.conferences:first-of-type {
  h1 {
    margin-top: 40px;
  }

  .teams {
    margin-bottom: 0;
  }
}

.teams {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  width: 100%;
  margin: 0 auto 3em;

  &_item {
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    flex: 0 1 330px;
    margin: 1em;
    padding: 2em 2.5em;
    text-align: left;
    color: #262b38;
    background: #EEF0F3;
    border-top: 3px solid #EEF0F3;
    transition: border-color 0.3s;
    border-radius: 5px;

    &:hover {
      border-color: #3e62e0;
    }
  }

  &_name {
    font-size: 22px;
    font-weight: bold;
    text-align: center;
    padding: 0.5em 0 0.75em;
    border-top: 3px solid rgba(139, 144, 157, 0.18);
  }

  &_rank {
    font-size: 2em;
    margin: 0 0 1em;
    text-align: left;
  }

  &_streak {
    font-weight: bold;
    padding: 0 0 0.5em;
    color: #9CA0A9;
    text-align: center;
    border-bottom: 3px solid rgba(139, 144, 157, 0.18);
  }

  &_records {
    font-size: 0.95em;
    font-style: italic;
    display: flex;
    justify-content: space-around;
    margin: 0;
    list-style: none;
    text-align: right;
    color: #8b909d;

    p {
      text-align: center;
    }
  }
}
</style>
