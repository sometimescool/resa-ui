<template>
    <nav>
        <RouterLink to="/">Home</RouterLink><br>
        <RouterLink to="/about">About</RouterLink><br>
        <RouterLink to="/clients">Clients</RouterLink><br>

    </nav>
</template>

<script setup>
import { RouterLink } from 'vue-router'
</script>

<style scoped>
nav {
    grid-area: nav;
    max-height: calc(100vh - 60px);
    overflow: auto;
    background-color: var(--black-light);
    color: var(--vt-c-white);
    font-size: 16px;
    padding: 4px 8px;
    font-weight: bold;
}


nav a.router-link-exact-active {
    opacity: 1
}

nav a.router-link-exact-active:hover {
    background-color: transparent;
}
</style>