<template>
  <div id="app">
    <Navbar 
      :language="currentLanguage"
      @search="handleSearch" 
      @languageChange="handleLanguageChange"
    />
    
    <router-view :language="currentLanguage" :key="currentLanguage" />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import Navbar from '@/components/Navbar.vue';

const currentLanguage = ref('uz');

const handleLanguageChange = (lang) => {
  currentLanguage.value = lang;
  
  // Save to localStorage
  localStorage.setItem('language', lang);
};

const handleSearch = (value) => {
  console.log('Search:', value);
  // Qidiruv logikasini bu yerda yozing
};

// Load language from localStorage on mount
onMounted(() => {
  const savedLanguage = localStorage.getItem('language') || 'uz';
  currentLanguage.value = savedLanguage;
});
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