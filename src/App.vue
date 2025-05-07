<template>
  <div>
    <nav class="navbar">
      <h1>Star Wars Portal</h1>
      <ul>
        <li><router-link to="/characters">Characters</router-link></li>
        <li><router-link to="/starships">Starships</router-link></li>
        <li><router-link to="/planets">Planets</router-link></li>
      </ul>
    </nav>

    <main class="main-content">
      <router-view />
    </main>
  </div>
</template>

<style scoped>
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #111;
  padding: 1rem 2rem;
  color: white;
}

.navbar h1 {
  font-size: 1.5rem;
}

.navbar ul {
  list-style: none;
  display: flex;
  gap: 1.5rem;
}

.navbar a {
  color: white;
  text-decoration: none;
  font-weight: 500;
}

.navbar a.router-link-exact-active {
  color: #ffcc00;
}

.main-content {
  padding: 2rem;
}
</style>
