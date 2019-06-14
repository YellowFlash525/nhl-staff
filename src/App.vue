<template>
  <div id="app">
    <div class="header">
      <h1>NHL Staff</h1>
      <ul class="main-nav">
        <li><router-link class="router" to="/">Standings</router-link></li>
        <li><router-link class="router" to="/players">Players</router-link></li>
        <li><router-link class="router" to="/teams">Teams</router-link></li>
      </ul>
    </div>
    <router-view/>
  </div>
</template>

<style lang="scss">
* {
  box-sizing: border-box;
}

body {
  margin: 0;
}

#app {
  font-family: 'Comic Sans MS';
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.header {
  padding-top: .5em;
  background-color: #f4f4f4;
  box-shadow: 0px 0px 5px 0px rgba(0,0,0,0.75);
}

ul {
  margin: 0;
  padding: 0;
  list-style: none;

  a {
    border-bottom: 2px solid #f4f4f4;

    &:hover,
    &.router-link-exact-active {
      border-bottom: 2px solid blue;
    }
  }
}

.main-nav .router {
  padding: 10px 15px;
  text-transform: uppercase;
  text-align: center;
  display: block;
  text-decoration: none;
}

.main-nav .router {
  color: #34495e;
  font-size: .99em;
}

.main-nav .router:hover {
  color: #718daa;
}

@media (min-width: 320px) {
  .header,
  .main-nav {
    display: flex;
  }

  .header {
    flex-direction: column;
    align-items: center;
    width: 100%;
  }
}

</style>
