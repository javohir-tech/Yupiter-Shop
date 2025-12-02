<template>
  <!-- Desktop & Tablet Header -->
  <a-layout-header class="desktop-header">
    <!-- Brand Logo -->
    <router-link to="/" class="brand-logo">
      Yupiter Shop
    </router-link>

    <!-- Desktop Navigation Links -->
    <a-menu
      mode="horizontal"
      v-model:selectedKeys="selectedKeys"
      class="desktop-menu"
    >
      <a-menu-item key="home">
        <router-link to="/" class="menu-link">
          <HomeOutlined />
          <span class="menu-text">{{ langStore.lang === 'uz' ? 'Bosh sahifa' : 'Главная' }}</span>
        </router-link>
      </a-menu-item>
      <a-menu-item key="about">
        <router-link to="/about" class="menu-link">
          <InfoCircleOutlined />
          <span class="menu-text">{{ langStore.lang === 'uz' ? 'Biz haqimizda' : 'О нас' }}</span>
        </router-link>
      </a-menu-item>
      <a-menu-item key="products">
        <router-link to="/products" class="menu-link">
          <ShoppingOutlined />
          <span class="menu-text">{{ langStore.lang === 'uz' ? 'Mahsulotlar' : 'Продукты' }}</span>
        </router-link>
      </a-menu-item>
      <a-menu-item key="contacts">
        <router-link to="/contacts" class="menu-link">
          <ContactsOutlined />
          <span class="menu-text">{{ langStore.lang === 'uz' ? 'Aloqa' : 'Контакты' }}</span>
        </router-link>
      </a-menu-item>
    </a-menu>

    <!-- Search & Language Selector -->
    <a-space :size="16" class="search-space">
      <a-select
        v-model:value="langStore.lang"
        class="language-selector"
        @change="langStore.handleChangeLang"
      >
        <a-select-option value="uz">O'zbekcha</a-select-option>
        <a-select-option value="ru">Русский</a-select-option>
      </a-select>
    </a-space>
  </a-layout-header>

  <!-- Mobile Top Header -->
  <a-layout-header class="mobile-header">
    <!-- Brand -->
    <router-link to="/" class="mobile-brand">
      Yupiter Shop
    </router-link>

    
    <a-select
      v-model:value="langStore.lang"
      class="mobile-language"
      size="small"
      @change="langStore.handleChangeLang"
    >
      <a-select-option value="uz">UZ</a-select-option>
      <a-select-option value="ru">RU</a-select-option>
    </a-select>
  </a-layout-header>

  <!-- Mobile Bottom Navigation -->
  <div class="mobile-bottom-nav">
    <div class="pastki-oyna">
      <!-- Home Button -->
      <router-link
        to="/"
        class="nav-item"
        :class="{ active: selectedKeys[0] === 'home' }"
        @click="changePage('home')"
      >
        <HomeOutlined class="nav-icon" />
        <span class="nav-label">{{ langStore.lang === 'uz' ? 'Bosh sahifa' : 'Главная' }}</span>
      </router-link>

      <!-- About Us Button -->
      <router-link
        to="/about"
        class="nav-item"
        :class="{ active: selectedKeys[0] === 'about' }"
        @click="changePage('about')"
      >
        <InfoCircleOutlined class="nav-icon" />
        <span class="nav-label">{{ langStore.lang === 'uz' ? 'Biz haqimizda' : 'О нас' }}</span>
      </router-link>

      <!-- Products Button -->
      <router-link
        to="/products"
        class="nav-item"
        :class="{ active: selectedKeys[0] === 'products' }"
        @click="changePage('products')"
      >
        <ShoppingOutlined class="nav-icon" />
        <span class="nav-label">{{ langStore.lang === 'uz' ? 'Mahsulotlar' : 'Продукты' }}</span>
      </router-link>

      <!-- Contacts Button -->
      <router-link
        to="/contacts"
        class="nav-item"
        :class="{ active: selectedKeys[0] === 'contacts' }"
        @click="changePage('contacts')"
      >
        <ContactsOutlined class="nav-icon" />
        <span class="nav-label">{{ langStore.lang === 'uz' ? 'Aloqa' : 'Контакты' }}</span>
      </router-link>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import { 
  HomeOutlined, 
  InfoCircleOutlined, 
  ShoppingOutlined,
  ContactsOutlined,
} from '@ant-design/icons-vue';
import { lanStore } from '@/Stores/lanStore';

const langStore = lanStore();

const route = useRoute();
const selectedKeys = ref(['home']);

// Watch route changes to update selected key
watch(() => route.path, (newPath) => {
  if (newPath === '/') {
    selectedKeys.value = ['home'];
  } else if (newPath.includes('/about')) {
    selectedKeys.value = ['about'];
  } else if (newPath.includes('/products')) {
    selectedKeys.value = ['products'];
  } else if (newPath.includes('/contacts')) {
    selectedKeys.value = ['contacts'];
  }
}, { immediate: true });

const changePage = (key) => {
  selectedKeys.value = [key];
  window.scrollTo({top : 0, behavior : "smooth"})
};

const onSearch = (value) => {
  console.log('Search:', value);
  // Bu yerda search logikangizni amalga oshirishingiz mumkin
};
</script>

<style scoped>
/* Desktop Header */
.desktop-header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  display: flex !important;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  background-color: #ffffff;
  border-bottom: 1px solid #f0f0f0;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

.brand-logo {
  font-size: 24px;
  font-weight: bold;
  background: linear-gradient(90deg, #f59e0b, #f97316 60%, #ef4444);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  color: transparent;
  min-width: 150px;
  text-decoration: none;
  transition: all 0.3s ease;
}

.brand-logo:hover {
  transform: scale(1.05);
  filter: brightness(1.2);
}

.desktop-menu {
  flex: 1;
  min-width: 0;
  border: none;
  background-color: transparent;
  margin-left: 40px;
}

.menu-link {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  transition: all 0.3s ease;
  padding: 8px 12px;
  border-radius: 8px;
  position: relative;
}

.menu-link:hover {
  transform: translateY(-3px);
}

.menu-link:hover .menu-text {
  text-shadow: 0 2px 8px rgba(249, 115, 22, 0.3);
}

.menu-link:hover svg {
  transform: scale(1.2);
  filter: drop-shadow(0 2px 4px rgba(249, 115, 22, 0.4));
}

.menu-text {
  background: linear-gradient(90deg, #f59e0b, #f97316 60%, #ef4444);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  color: transparent;
}

.nav-item.active .nav-label {
  background: linear-gradient(90deg, #f59e0b, #f97316 60%, #ef4444);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  color: transparent;
}

.nav-item.active .nav-icon {
  color: #f97316;
}

:deep(.menu-link) svg {
  color: #f97316;
  transition: all 0.3s ease;
}

.search-space {
  margin-left: auto;
}

.search-input {
  width: 200px;
}

.language-selector {
  min-width: 120px;
}

.language-selector :deep(.ant-select-selector) {
  border-radius: 8px;
  border-color: #f0f0f0;
  transition: all 0.3s ease;
}

.language-selector :deep(.ant-select-selector:hover) {
  border-color: #f97316;
  box-shadow: 0 0 0 2px rgba(249, 115, 22, 0.1);
}

.language-selector :deep(.ant-select-arrow) {
  color: #f97316;
}

/* Mobile Header */
.mobile-header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  display: none !important;
  align-items: center;
  justify-content: space-between;
  padding: 0 16px;
  background-color: #ffffff;
  border-bottom: 1px solid #f0f0f0;
  height: 56px;
  gap: 12px;
}

.mobile-brand {
  font-size: 20px;
  font-weight: bold;
  background: linear-gradient(90deg, #f59e0b, #f97316 60%, #ef4444);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  color: transparent;
  text-decoration: none;
  flex-shrink: 0;
  transition: all 0.3s ease;
}

.mobile-brand:hover {
  transform: scale(1.05);
  filter: brightness(1.2);
}

.mobile-search {
  flex: 1;
  max-width: 250px;
}

.mobile-language {
  min-width: 65px;
  flex-shrink: 0;
}

.mobile-language :deep(.ant-select-selector) {
  border-radius: 6px;
  border-color: #f0f0f0;
  transition: all 0.3s ease;
}

.mobile-language :deep(.ant-select-selector:hover) {
  border-color: #f97316;
}

.mobile-language :deep(.ant-select-arrow) {
  color: #f97316;
}

/* Mobile Bottom Navigation */
.mobile-bottom-nav {
  position: fixed;
  bottom: 16px;
  left: 16px;
  right: 16px;
  border-radius: 30px;
  border: 0.1px solid rgba(255, 255, 255, 0.55);
  z-index: 1000;
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
  display: none !important;
  background: rgba(255, 255, 255, 0.35) !important;
  backdrop-filter: blur(12px) saturate(140%) !important;
  -webkit-backdrop-filter: blur(12px) saturate(140%) !important;
}

.pastki-oyna {
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 60px;
  padding: 0 8px;
}

.nav-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  flex: 1;
  color: #595959;
  font-weight: 400;
  text-decoration: none;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  border-radius: 20px;
  margin: 0 4px;
  position: relative;
}

.nav-item:hover {
  transform: translateY(-4px);
}

.nav-item:hover .nav-icon {
  transform: scale(1.2) rotate(5deg);
  filter: drop-shadow(0 4px 8px rgba(249, 115, 22, 0.4));
}

.nav-item:hover .nav-label {
  transform: scale(1.05);
}

.nav-item:active {
  transform: translateY(-2px);
}

.nav-item.active {
  font-weight: 600;
}

.nav-icon {
  font-size: 20px;
  margin-bottom: 4px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.nav-label {
  font-size: 11px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  text-align: center;
}

/* Mobile Styles */
@media (max-width: 768px) {
  .desktop-header {
    display: none !important;
  }
  .mobile-header {
    display: flex !important;
  }
  .mobile-bottom-nav {
    display: block !important;
  }
  .desktop-menu {
    display: none !important;
  }
}

/* Ant Design Menu customization */
:deep(.ant-menu-horizontal) {
  line-height: 64px;
}

:deep(.ant-menu-item) {
  padding: 0 20px !important;
}

:deep(.ant-menu-item a) {
  color: inherit;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
}

:deep(.ant-menu-item-selected)::after {
  border-bottom: 2px solid #f97316 !important;
  background: linear-gradient(90deg, #f59e0b, #f97316 60%, #ef4444) !important;
}

:deep(.ant-menu-item:hover)::after {
  border-bottom: 2px solid #f97316 !important;
  background: linear-gradient(90deg, #f59e0b, #f97316 60%, #ef4444) !important;
}
</style>