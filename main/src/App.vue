<template>
  <div>
    <nav>
      <router-link to="/sub1">sub1</router-link> |
      <router-link to="/sub2">sub2</router-link> |
      <router-link to="/sub3">sub3</router-link>
    </nav>
    <main id="micro-container">
        <div class="home">主-----------------------------页</div>
    </main>
  </div>
</template>

<style>
#main-container {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
