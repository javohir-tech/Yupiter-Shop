<template>
  <!-- Desktop & Tablet Header -->
  <a-layout-header 
    class="desktop-header"
    :style="{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 1000,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 20px',
      backgroundColor: isDark ? '#001529' : '#ffffff',
      borderBottom: `1px solid ${isDark ? '#303030' : '#f0f0f0'}`,
      boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
    }"
  >
    <!-- Brand Logo -->
    <router-link to="/" :style="{ 
      fontSize: '24px', 
      fontWeight: 'bold',
      color: isDark ? '#fff' : '#1890ff',
      minWidth: '150px',
      textDecoration: 'none'
    }">
      MyShop
    </router-link>

    <!-- Desktop Navigation Links -->
    <a-menu
      mode="horizontal"
      v-model:selectedKeys="selectedKeys"
      :style="{ 
        flex: 1,
        minWidth: 0,
        border: 'none',
        backgroundColor: 'transparent',
        marginLeft: '40px'
      }"
      class="desktop-menu"
    >
      <a-menu-item key="home">
        <router-link to="/">
          <HomeOutlined />
          <span style="margin-left: 8px">Home</span>
        </router-link>
      </a-menu-item>
      <a-menu-item key="about">
        <router-link to="/about">
          <InfoCircleOutlined />
          <span style="margin-left: 8px">About Us</span>
        </router-link>
      </a-menu-item>
      <a-menu-item key="products">
        <router-link to="/products">
          <ShoppingOutlined />
          <span style="margin-left: 8px">Products</span>
        </router-link>
      </a-menu-item>
    </a-menu>

    <!-- Search and Theme Toggle -->
    <a-space :size="16" style="margin-left: auto">
      <a-input-search
        placeholder="Search products..."
        style="width: 200px"
        @search="onSearch"
      />
      <a-button
        type="text"
        @click="toggleTheme"
        :style="{ 
          fontSize: '18px',
          color: isDark ? '#fff' : '#000'
        }"
      >
        <template #icon>
          <!-- <SunOutlined v-if="isDark" />
          <MoonOutlined v-else /> -->
        </template>
      </a-button>
    </a-space>
  </a-layout-header>

  <!-- Mobile Top Header -->
  l<a-layout-header 
    class="mobile-header"
    :style="{ 
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 1000,
      display: 'none',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 16px',
      backgroundColor: isDark ? '#001529' : '#ffffff',
      borderBottom: `1px solid ${isDark ? '#303030' : '#f0f0f0'}`,
      height: '56px',
      gap: '12px'
    }"
  >
    <!-- Brand -->
    <router-link to="/" :style="{ 
      fontSize: '20px', 
      fontWeight: 'bold',
      color: isDark ? '#fff' : '#1890ff',
      textDecoration: 'none',
      flexShrink: 0
    }">
      MyShop
    </router-link>

    <!-- Search Input -->
    <a-input-search
      placeholder="Search..."
      :style="{ 
        flex: 1,
        maxWidth: '400px'
      }"
      size="small"
      @search="onSearch"
    />

    <!-- Theme Toggle -->
    <a-button
      type="text"
      @click="toggleTheme"
      :style="{ 
        color: isDark ? '#fff' : '#000',
        flexShrink: 0
      }"
    >
      <template #icon>
        <!-- <SunOutlined v-if="isDark" />
        <MoonOutlined v-else /> -->
      </template>
    </a-button>
  </a-layout-header>

  <!-- Mobile Bottom Navigation -->
  <div 
    class="mobile-bottom-nav"
    :style="{
      position: 'fixed',
      bottom: '16px',
      left: '16px',
      right: '16px',
      backgroundColor: isDark ? '#001529' : '#ffffff',
      borderRadius: '30px',
      border: `1px solid rgba(255, 255, 255, 0.55)`,
      display: 'none',
      zIndex: 1000,
      boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
    }"
  >
    <div class="pastki-oyna" :style="{ 
      display: 'flex',
      justifyContent: 'space-around',
      alignItems: 'center',
      height: '60px',
      padding: '0 8px'
    }">
      <!-- Home Button -->
      <router-link
        to="/"
        :style="{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%',
          flex: 1,
          color: selectedKeys[0] === 'home' ? '#1890ff' : (isDark ? '#8c8c8c' : '#595959'),
          fontWeight: selectedKeys[0] === 'home' ? '600' : '400',
          textDecoration: 'none'
        }"
        @click="changePage('home')"
      >
        <HomeOutlined :style="{ fontSize: '20px', marginBottom: '4px' }" />
        <span style="font-size: 12px">Home</span>
      </router-link>

      <!-- About Us Button -->
      <router-link
        to="/about"
        :style="{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%',
          flex: 1,
          color: selectedKeys[0] === 'about' ? '#1890ff' : (isDark ? '#8c8c8c' : '#595959'),
          fontWeight: selectedKeys[0] === 'about' ? '600' : '400',
          textDecoration: 'none'
        }"
        @click="changePage('about')"
      >
        <InfoCircleOutlined :style="{ fontSize: '20px', marginBottom: '4px' }" />
        <span style="font-size: 12px">About Us</span>
      </router-link>

      <!-- Products Button -->
      <router-link
        to="/products"
        :style="{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%',
          flex: 1,
          color: selectedKeys[0] === 'products' ? '#1890ff' : (isDark ? '#8c8c8c' : '#595959'),
          fontWeight: selectedKeys[0] === 'products' ? '600' : '400',
          textDecoration: 'none'
        }"
        @click="changePage('products')"
      >
        <ShoppingOutlined :style="{ fontSize: '20px', marginBottom: '4px' }" />
        <span style="font-size: 12px">Products</span>
      </router-link>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue';
import { useRoute } from 'vue-router';
import { 
  HomeOutlined, 
  InfoCircleOutlined, 
  ShoppingOutlined,
//   SunOutlined,
//   MoonOutlined 
} from '@ant-design/icons-vue';

const props = defineProps({
  isDark: {
    type: Boolean,
    default: false
  }
});

const emit = defineEmits(['update:isDark', 'search']);

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

const toggleTheme = () => {
  emit('update:isDark', !props.isDark);
};

const changePage = (key) => {
  selectedKeys.value = [key];
};

const onSearch = (value) => {
  emit('search', value);
};
</script>

<style scoped>
/* Desktop/Tablet Styles (default) */
.desktop-header {
  display: flex !important;
}
.mobile-header {
  display: none !important;
}
.mobile-bottom-nav {
  display: none !important;
  background: rgba(255, 255, 255, 0.35) !important;
  backdrop-filter: blur(12px) saturate(140%) !important;
  -webkit-backdrop-filter: blur(12px) saturate(140%) !important;
  border: 0.1px solid rgba(255, 255, 255, 0.55);
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
</style>