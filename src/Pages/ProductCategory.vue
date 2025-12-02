<template>
  <div class="category-products-page">
    <div class="page-container">
      <!-- Breadcrumb -->
      <div class="breadcrumb">
        <router-link to="/products" class="breadcrumb-link">
          {{ langStore.lang === 'uz' ? 'Kategoriyalar' : 'Категории' }}
        </router-link>
        <span class="breadcrumb-separator">/</span>
        <span class="breadcrumb-current">{{ currentCategoryName }}</span>
      </div>

      <!-- Category Header -->
      <div class="category-header">
        <div class="header-content">
          <div class="category-icon-large">
            <span class="icon">{{ categoryIcon }}</span>
          </div>
          <div class="header-text">
            <h1 class="category-title">{{ currentCategoryName }}</h1>
            <p class="category-subtitle">
              {{ products.length }} {{ langStore.lang === 'uz' ? 'mahsulot topildi' : 'товаров найдено' }}
            </p>
          </div>
        </div>
      </div>

      <!-- Loading Skeleton -->
      <div v-if="loading" class="products-grid">
        <div v-for="n in 6" :key="n" class="product-card skeleton">
          <div class="skeleton-image"></div>
          <div class="skeleton-content">
            <div class="skeleton-line"></div>
            <div class="skeleton-line short"></div>
          </div>
        </div>
      </div>

      <!-- Products Grid -->
      <div v-else-if="products.length > 0" class="products-grid">
        <div v-for="product in products" :key="product.id" class="product-card" @click="handleCardClick(product)">
          <!-- Image & Discount Badge -->
          <div class="image-wrapper">
            <img :alt="langStore.lang === 'uz' ? product.name : product.name_ru" :src="product.main_image"
              class="product-image" />
            <div v-if="product.discount_price" class="discount-badge">
              -{{ calculateDiscount(product.price, product.discount_price) }}%
            </div>
          </div>

          <!-- Product Info -->
          <div class="product-info">
            <h3 class="product-name">
              {{ langStore.lang === 'uz' ? product.name : product.name_ru }}
            </h3>
            <p class="product-description">
              {{ langStore.lang === 'uz' ? product.description : product.description_ru }}
            </p>

            <!-- Price Section -->
            <div class="price-section">
              <div v-if="product.discount_price" class="price-group">
                <span class="discount-price">{{ formatPrice(product.discount_price) }} {{ langStore.lang === 'uz' ?
                  'so\'m' : 'сум' }}</span>
                <span class="original-price">{{ formatPrice(product.price) }} {{ langStore.lang === 'uz' ? 'so\'m' :
                  'сум' }}</span>
              </div>
              <div v-else class="price-group">
                <span class="current-price">{{ formatPrice(product.price) }} {{ langStore.lang === 'uz' ? 'so\'m' :
                  'сум' }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Empty State -->
      <div v-else class="empty-state">
        <div class="empty-icon">📦</div>
        <h3 class="empty-title">
          {{ langStore.lang === 'uz' ? 'Mahsulotlar topilmadi' : 'Товары не найдены' }}
        </h3>
        <p class="empty-description">
          {{ langStore.lang === 'uz'
            ? 'Bu kategoriyada hozircha mahsulotlar yo\'q'
            : 'В этой категории пока нет товаров'
          }}
        </p>
        <router-link to="/products" class="back-button">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          {{ langStore.lang === 'uz' ? 'Kategoriyalarga qaytish' : 'Вернуться к категориям' }}
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { createClient } from '@supabase/supabase-js';
import { lanStore } from '@/Stores/lanStore';

const langStore = lanStore();
const route = useRoute();
const router = useRouter()

// Supabase client
const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_KEY
);

const categories = [
  { uz: 'Texnika', ru: 'Техника', icon: '⚙️', slug: 'texnika' },
  { uz: 'Telefon', ru: 'Телефон', icon: '📱', slug: 'telefon' },
  { uz: 'Kompyuter', ru: 'Компьютер', icon: '💻', slug: 'kompyuter' },
  { uz: 'Planshet', ru: 'Планшет', icon: '📱', slug: 'planshet' },
  { uz: 'Aksessuarlar', ru: 'Аксессуары', icon: '🔌', slug: 'aksessuarlar' },
  { uz: 'Maishiy texnika', ru: 'Бытовая техника', icon: '🏠', slug: 'maishiy-texnika' },
  { uz: 'Audio texnika', ru: 'Аудио техника', icon: '🎧', slug: 'audio-texnika' },
  { uz: 'Kiyim', ru: 'Одежда', icon: '👕', slug: 'kiyim' },
  { uz: 'Oyoq kiyim', ru: 'Обувь', icon: '👟', slug: 'oyoq-kiyim' },
  { uz: 'Sport buyumlari', ru: 'Спорттовары', icon: '⚽', slug: 'sport-buyumlari' },
  { uz: 'Kitoblar', ru: 'Книги', icon: '📚', slug: 'kitoblar' },
  { uz: 'Boshqalar', ru: 'Прочее', icon: '📦', slug: 'boshqalar' }
];

const products = ref([]);
const loading = ref(true);

// Get current category from route
const currentCategory = computed(() => {
  return categories.find(cat => cat.slug === route.params.slug);
});

const currentCategoryName = computed(() => {
  if (!currentCategory.value) return '';
  return langStore.lang === 'uz' ? currentCategory.value.uz : currentCategory.value.ru;
});

const categoryIcon = computed(() => {
  return currentCategory.value?.icon || '📦';
});

// Fetch products for this category
const fetchProducts = async () => {
  loading.value = true;
  try {
    if (!currentCategory.value) {
      console.error('Category not found');
      return;
    }

    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('category_uz', currentCategory.value.uz)
      .order('created_at', { ascending: false });

    if (error) throw error;
    products.value = data || [];
  } catch (error) {
    console.error('Error fetching products:', error);
  } finally {
    loading.value = false;
  }
};

// Handle card click - YAXSHILANGAN VERSIYA
const handleCardClick = async (product) => {
  router.push(`/product/${product.id}`)
  window.scrollTo({top : 0 ,  behavior: "smooth"})
  // Seen countni yangilash (background'da)
  try {
    const currentSeen = product.seen || 0;
    const newSeenCount = currentSeen + 1;

    console.log('Yangi seen qiymati:', newSeenCount);

    // Supabase'ga update so'rovi
    const { data, error } = await supabase
      .from('products')
      .update({ seen: newSeenCount })
      .eq('id', product.id)
      .select();

    if (error) {
      console.error('Seen yangilashda xatolik:', error);
      throw error;
    }

    console.log('Seen muvaffaqiyatli yangilandi:', data);

    // Local holatni yangilash
    const index = products.value.findIndex(p => p.id === product.id);
    if (index !== -1) {
      products.value[index].seen = newSeenCount;
      console.log('Local holat yangilandi');
    }
  } catch (error) {
    console.error('Seen counterni yangilashda xatolik:', error.message);
  }
};

// Calculate discount percentage
const calculateDiscount = (price, discountPrice) => {
  return Math.round(((price - discountPrice) / price) * 100);
};

// Format price with spaces
const formatPrice = (price) => {
  return new Intl.NumberFormat('uz-UZ').format(price);
};

onMounted(() => {
  fetchProducts();
});
</script>

<style scoped>
.category-products-page {
  padding: 24px;
  min-height: calc(100vh - 200px);
  background: linear-gradient(135deg, #f9fafb 0%, #ffffff 100%);
}

.page-container {
  max-width: 1400px;
  margin: 0 auto;
  margin-top: 80px;
}

/* Breadcrumb */
.breadcrumb {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 32px;
  font-size: 15px;
}

.breadcrumb-link {
  color: #6b7280;
  text-decoration: none;
  transition: color 0.3s ease;
}

.breadcrumb-link:hover {
  color: #f97316;
}

.breadcrumb-separator {
  color: #9ca3af;
}

.breadcrumb-current {
  color: #1f2937;
  font-weight: 500;
}

/* Category Header */
.category-header {
  margin-bottom: 48px;
}

.header-content {
  display: flex;
  align-items: center;
  gap: 24px;
}

.category-icon-large {
  width: 96px;
  height: 96px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%);
  border-radius: 24px;
  box-shadow: 0 8px 24px rgba(245, 158, 11, 0.2);
}

.category-icon-large .icon {
  font-size: 48px;
}

.header-text {
  flex: 1;
}

.category-title {
  font-size: 42px;
  font-weight: 700;
  color: #1f2937;
  margin: 0 0 8px 0;
  background: linear-gradient(90deg, #f59e0b, #f97316 60%, #ef4444);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.category-subtitle {
  font-size: 18px;
  color: #6b7280;
  margin: 0;
}

/* Products Grid */
.products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 24px;
  margin-bottom: 40px;
}

.product-card {
  border-radius: 16px;
  overflow: hidden;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  border: none;
  cursor: pointer;
  background: #ffffff;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
}

.product-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
}

.image-wrapper {
  position: relative;
  width: 100%;
  height: 280px;
  overflow: hidden;
  background: linear-gradient(180deg, #f8f9fa 0%, #ffffff 100%);
}

.product-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.product-card:hover .product-image {
  transform: scale(1.05);
}

.discount-badge {
  position: absolute;
  top: 12px;
  right: 12px;
  background: linear-gradient(135deg, #10b981, #059669);
  color: white;
  padding: 6px 12px;
  border-radius: 8px;
  font-weight: 700;
  font-size: 13px;
  box-shadow: 0 2px 8px rgba(16, 185, 129, 0.3);
}

.product-info {
  padding: 16px;
  background: #ffffff;
}

.product-name {
  font-size: 15px;
  font-weight: 500;
  color: #1f2937;
  margin: 0 0 8px 0;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  line-height: 1.4;
}

.product-description {
  font-size: 14px;
  color: #8c8c8c;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  margin: 0 0 12px 0;
}

.price-section {
  margin-top: 12px;
  padding-top: 0;
  border-top: none;
}

.price-group {
  display: flex;
  align-items: baseline;
  gap: 8px;
  flex-wrap: wrap;
}

.original-price {
  font-size: 13px;
  color: #9ca3af;
  text-decoration: line-through;
  order: 2;
}

.discount-price {
  font-size: 22px;
  font-weight: 700;
  color: #dc2626;
  order: 1;
}

.current-price {
  font-size: 22px;
  font-weight: 700;
  color: #1f2937;
}

/* Skeleton Loading */
.product-card.skeleton {
  pointer-events: none;
}

.skeleton-image {
  width: 100%;
  height: 280px;
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: loading 1.5s infinite;
}

.skeleton-content {
  padding: 16px;
}

.skeleton-line {
  height: 16px;
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: loading 1.5s infinite;
  border-radius: 4px;
  margin-bottom: 8px;
}

.skeleton-line.short {
  width: 60%;
}

@keyframes loading {
  0% {
    background-position: 200% 0;
  }

  100% {
    background-position: -200% 0;
  }
}

/* Empty State */
.empty-state {
  text-align: center;
  padding: 80px 20px;
}

.empty-icon {
  font-size: 80px;
  margin-bottom: 24px;
}

.empty-title {
  font-size: 28px;
  font-weight: 600;
  color: #1f2937;
  margin: 0 0 12px 0;
}

.empty-description {
  font-size: 16px;
  color: #6b7280;
  margin: 0 0 32px 0;
}

.back-button {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 14px 28px;
  background: linear-gradient(135deg, #f59e0b, #f97316);
  color: white;
  text-decoration: none;
  border-radius: 12px;
  font-weight: 600;
  transition: all 0.3s ease;
}

.back-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 16px rgba(249, 115, 22, 0.3);
}

/* Mobile Styles */
@media (max-width: 768px) {
  .category-products-page {
    padding: 16px;
  }

  .page-container {
    margin-top: 72px;
    margin-bottom: 100px;
  }

  .breadcrumb {
    margin-bottom: 24px;
    font-size: 14px;
  }

  .category-header {
    margin-bottom: 32px;
  }

  .header-content {
    gap: 16px;
  }

  .category-icon-large {
    width: 72px;
    height: 72px;
    border-radius: 16px;
  }

  .category-icon-large .icon {
    font-size: 36px;
  }

  .category-title {
    font-size: 28px;
  }

  .category-subtitle {
    font-size: 15px;
  }

  .products-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 12px;
  }

  .image-wrapper {
    height: 180px;
  }

  .product-name {
    font-size: 14px;
  }

  .product-description {
    font-size: 12px;
  }

  .discount-price,
  .current-price {
    font-size: 16px;
  }

  .original-price {
    font-size: 12px;
  }
}

@media (max-width: 480px) {
  .category-title {
    font-size: 24px;
  }

  .products-grid {
    gap: 8px;
  }

  .product-card {
    border-radius: 12px;
  }

  .image-wrapper {
    height: 160px;
  }
}
</style>