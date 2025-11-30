<template>
  <div id="app">
    <Navbar 
      @search="handleSearch" 
    />
    
    <router-view />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import Navbar from '@/components/Navbar.vue';

const handleSearch = (value) => {
  console.log('Search:', value);
 
};

</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  background-color: #ffffff;
}

#app {
  min-height: 100vh;
}
</style>