<template>
  <!-- Desktop & Tablet Header -->
  <a-layout-header class="desktop-header">
    <!-- Brand Logo -->
    <router-link to="/" class="brand-logo">
      MyShop
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
          <span class="menu-text">Home</span>
        </router-link>
      </a-menu-item>
      <a-menu-item key="about">
        <router-link to="/about" class="menu-link">
          <InfoCircleOutlined />
          <span class="menu-text">About Us</span>
        </router-link>
      </a-menu-item>
      <a-menu-item key="products">
        <router-link to="/products" class="menu-link">
          <ShoppingOutlined />
          <span class="menu-text">Products</span>
        </router-link>
      </a-menu-item>
    </a-menu>

    <!-- Search -->
    <a-space :size="16" class="search-space">
      <a-input-search
        placeholder="Search products..."
        class="search-input"
        @search="onSearch"
      />
    </a-space>
  </a-layout-header>

  <!-- Mobile Top Header -->
  <a-layout-header class="mobile-header">
    <!-- Brand -->
    <router-link to="/" class="mobile-brand">
      MyShop
    </router-link>

    <!-- Search Input -->
    <a-input-search
      placeholder="Search..."
      class="mobile-search"
      size="small"
      @search="onSearch"
    />
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
        <span class="nav-label">Home</span>
      </router-link>

      <!-- About Us Button -->
      <router-link
        to="/about"
        class="nav-item"
        :class="{ active: selectedKeys[0] === 'about' }"
        @click="changePage('about')"
      >
        <InfoCircleOutlined class="nav-icon" />
        <span class="nav-label">About Us</span>
      </router-link>

      <!-- Products Button -->
      <router-link
        to="/products"
        class="nav-item"
        :class="{ active: selectedKeys[0] === 'products' }"
        @click="changePage('products')"
      >
        <ShoppingOutlined class="nav-icon" />
        <span class="nav-label">Products</span>
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
} from '@ant-design/icons-vue';

const emit = defineEmits(['search']);

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
  }
}, { immediate: true });

const changePage = (key) => {
  selectedKeys.value = [key];
};

const onSearch = (value) => {
  emit('search', value);
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
  /* gradient for menu text */
  background: linear-gradient(90deg, #f59e0b, #f97316 60%, #ef4444);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  color: transparent;
}

/* make active nav label use same gradient */
.nav-item.active .nav-label {
  background: linear-gradient(90deg, #f59e0b, #f97316 60%, #ef4444);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  color: transparent;
}

/* Ant icons are SVGs — use solid color for better visibility */
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
  max-width: 400px;
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
  background: linear-gradient(90deg, #f59e0b, #f97316 60%, #ef4444);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  color: transparent;
  font-weight: 600;
}

.nav-icon {
  font-size: 20px;
  margin-bottom: 4px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.nav-label {
  font-size: 12px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
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

/* Ant Design Menu customization - Active link underline gradient */
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