<template>
  <div class="conferences">
    <h1> {{ side }} Conference</h1>
    <ul class="responsive-table">
      <li class="table-header">
        <div class="col col-1">Rank</div>
        <div class="col col-2">Team</div>
        <div class="col col-3">W</div>
        <div class="col col-4">L</div>
        <div class="col col-4">OT</div>
        <div class="col col-4">Streak</div>
      </li>
      <li v-for="recordEast in recordsEast" :key="recordEast.team.id" class="table-row">
        <div class="col col-1" data-label="Rank">{{ recordEast.conferenceRank }}</div>
        <div class="col col-2" data-label="Team">{{ recordEast.team.name }}</div>
        <div class="col col-3" data-label="W">{{ recordEast.leagueRecord.wins }}</div>
        <div class="col col-4" data-label="L">{{ recordEast.leagueRecord.losses }}</div>
        <div class="col col-4" data-label="OT">{{ recordEast.leagueRecord.ot }}</div>
        <div class="col col-4" data-label="Streak">{{ recordEast.streak.streakCode }}</div>
      </li>
      <li v-for="recordWest in recordsWest" :key="recordWest.team.id" class="table-row">
        <div class="col col-1" data-label="Rank">{{ recordWest.conferenceRank }}</div>
        <div class="col col-2" data-label="Team">{{ recordWest.team.name }}</div>
        <div class="col col-3" data-label="W">{{ recordWest.leagueRecord.wins }}</div>
        <div class="col col-4" data-label="L">{{ recordWest.leagueRecord.losses }}</div>
        <div class="col col-4" data-label="OT">{{ recordWest.leagueRecord.ot }}</div>
        <div class="col col-4" data-label="Streak">{{ recordWest.streak.streakCode }}</div>
      </li>
      <!-- <p>{{ orderedUsers }}</p> -->
    </ul>
  </div>
</template>

<script>
import { _ } from 'lodash';

export default {
  name: 'Standings',
  data: () => {
    return {
      records: Array,
    };
  },
  props: {
    side: String,
    recordsEast: Array,
    recordsWest: Array,
  },
  computed: {
    orderedUsers: () => {
      this.records = this.side;
      console.log(this.records);
      return _.orderBy(this.records, 'conferenceRank');
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.conferences {
  width: 40%;
  margin: 0 20px;

  @media all and (max-width: 992px) {
    width: 80%;
  }
}

.responsive-table {
  padding: 0;

  li {
    border-radius: 3px;
    padding: 25px 30px;
    display: flex;
    justify-content: space-between;
    margin-bottom: 25px;
  }

  .table-header {
    background-color: #95A5A6;
    font-size: 14px;
    text-transform: uppercase;
    letter-spacing: 0.03em;
  }

  .table-row {
    background-color: #ffffff;
    box-shadow: 0px 0px 9px 0px rgba(0,0,0,0.1);
  }

  .col-1 {
    flex-basis: 10%;
  }
  .col-2 {
    flex-basis: 40%;
  }
  .col-3 {
    flex-basis: 25%;
  }
  .col-4 {
    flex-basis: 25%;
  }

  @media all and (max-width: 767px) {
    .table-header {
      display: none;
    }

    li {
      display: block;
    }

    .col {
      flex-basis: 100%;
    }

    .col {
      display: flex;
      padding: 10px 0;

      &:before {
        color: #6C7A89;
        padding-right: 10px;
        content: attr(data-label);
        flex-basis: 50%;
        text-align: right;
      }
    }
  }
}
</style>
