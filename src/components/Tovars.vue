<template>
  <div class="products-page">

    <!-- Loading Skeleton -->
    <div v-if="loading" class="products-container">
      <div v-for="n in 3" :key="n" class="category-section">
        <div class="category-title-skeleton"></div>
        <div class="products-grid">
          <div v-for="i in 4" :key="i" class="product-card skeleton">
            <div class="skeleton-image"></div>
            <div class="skeleton-content">
              <div class="skeleton-line"></div>
              <div class="skeleton-line short"></div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Products by Category -->
    <div v-else class="products-container">
      <div 
        v-for="category in categoriesWithProducts" 
        :key="category.name"
        class="category-section"
      >
        <h2 class="category-title">{{ category.name }}</h2>
        
        <div class="products-grid">
          <div
            v-for="product in category.products"
            :key="product.id"
            class="product-card"
            @click="handleCardClick(product)"
          >
            <!-- Image & Discount Badge -->
            <div class="image-wrapper">
              <img
                :alt="language === 'uz' ? product.name : product.name_ru"
                :src="product.image"
                class="product-image"
              />
              <div v-if="product.discount_price" class="discount-badge">
                -{{ calculateDiscount(product.price, product.discount_price) }}%
              </div>
            </div>

            <!-- Product Info -->
            <div class="product-info">
              <h3 class="product-name">
                {{ language === 'uz' ? product.name : product.name_ru }}
              </h3>
              <p class="product-description">
                {{ language === 'uz' ? product.description : product.description_ru }}
              </p>

              <!-- Price Section -->
              <div class="price-section">
                <div v-if="product.discount_price" class="price-group">
                  <span class="original-price">{{ formatPrice(product.price) }} {{ language === 'uz' ? 'so\'m' : 'сум' }}</span>
                  <span class="discount-price">{{ formatPrice(product.discount_price) }} {{ language === 'uz' ? 'so\'m' : 'сум' }}</span>
                </div>
                <div v-else class="price-group">
                  <span class="current-price">{{ formatPrice(product.price) }} {{ language === 'uz' ? 'so\'m' : 'сум' }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- No Products Message -->
      <div v-if="categoriesWithProducts.length === 0 && !loading" class="empty-state">
        <p>{{ language === 'uz' ? 'Hozircha mahsulotlar yo\'q' : 'Товаров пока нет' }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { createClient } from '@supabase/supabase-js';

const props = defineProps({
  language: {
    type: String,
    default: 'uz'
  }
});

// Supabase client
const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_KEY
);

const categories = [
  { uz: 'Texnika', ru: 'Техника' },
  { uz: 'Telefon', ru: 'Телефон' },
  { uz: 'Kompyuter', ru: 'Компьютер' },
  { uz: 'Planshet', ru: 'Планшет' },
  { uz: 'Aksessuarlar', ru: 'Аксессуары' },
  { uz: 'Maishiy texnika', ru: 'Бытовая техника' },
  { uz: 'Audio texnika', ru: 'Аудио техника' },
  { uz: 'Kiyim', ru: 'Одежда' },
  { uz: 'Oyoq kiyim', ru: 'Обувь' },
  { uz: 'Sport buyumlari', ru: 'Спорттовары' },
  { uz: 'Kitoblar', ru: 'Книги' },
  { uz: 'Boshqalar', ru: 'Прочее' }
];

const products = ref([]);
const loading = ref(true);

// Fetch products from Supabase
const fetchProducts = async () => {
  loading.value = true;
  try {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    products.value = data || [];
  } catch (error) {
    console.error('Error fetching products:', error);
  } finally {
    loading.value = false;
  }
};

// Group products by category
const categoriesWithProducts = computed(() => {
  return categories
    .map(category => {
      const categoryProducts = products.value.filter(
        product => product.category_uz === category.uz
      );
      
      if (categoryProducts.length === 0) return null;
      
      return {
        name: props.language === 'uz' ? category.uz : category.ru,
        products: categoryProducts
      };
    })
    .filter(Boolean);
});

// Handle card click
const handleCardClick = async (product) => {
  // Update seen count
  try {
    const newSeenCount = (product.seen || 0) + 1;
    
    const { error } = await supabase
      .from('products')
      .update({ seen: newSeenCount })
      .eq('id', product.id);

    if (error) throw error;

    // Update local data
    const index = products.value.findIndex(p => p.id === product.id);
    if (index !== -1) {
      products.value[index].seen = newSeenCount;
    }
  } catch (error) {
    console.error('Error updating seen count:', error);
  }

  // Redirect to product link
  if (product.link) {
    window.open(product.link, '_blank');
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
.products-page {
  padding: 24px;
  max-width: 1400px;
  margin: 0 auto;
  margin-top: 80px;
}

.page-title {
  font-size: 32px;
  font-weight: bold;
  color: #262626;
  margin-bottom: 32px;
  text-align: left;
}

.products-container {
  display: flex;
  flex-direction: column;
  gap: 48px;
}

.category-section {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.category-title {
  font-size: 24px;
  font-weight: 600;
  color: #262626;
  margin: 0;
  padding-bottom: 12px;
  border-bottom: 2px solid #f0f0f0;
}

.category-title-skeleton {
  height: 36px;
  width: 200px;
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: loading 1.5s infinite;
  border-radius: 4px;
}

.products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 24px;
}

.product-card {
  border-radius: 12px;
  overflow: hidden;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  border: 1px solid #f0f0f0;
  cursor: pointer;
  background-color: white;
}

.product-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.12);
  border-color: #f97316;
}

.image-wrapper {
  position: relative;
  width: 100%;
  height: 280px;
  overflow: hidden;
  background-color: #f5f5f5;
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
  font-weight: 600;
  font-size: 14px;
  box-shadow: 0 2px 8px rgba(16, 185, 129, 0.3);
}

.product-info {
  padding: 16px;
}

.product-name {
  font-size: 16px;
  font-weight: 600;
  color: #262626;
  margin: 0 0 8px 0;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
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
  margin-top: 16px;
  padding-top: 16px;
  border-top: 1px solid #f0f0f0;
}

.price-group {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.original-price {
  font-size: 14px;
  color: #8c8c8c;
  text-decoration: line-through;
}

.discount-price {
  font-size: 20px;
  font-weight: 700;
  background: linear-gradient(90deg, #f59e0b, #f97316 60%, #ef4444);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  color: transparent;
}

.current-price {
  font-size: 20px;
  font-weight: 700;
  color: #262626;
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

.empty-state {
  padding: 60px 0;
  text-align: center;
  font-size: 18px;
  color: #8c8c8c;
}

/* Mobile Styles */
@media (max-width: 768px) {
  .products-page {
    padding: 16px;
    margin-top: 72px;
    margin-bottom: 100px;
  }

  .page-title {
    font-size: 24px;
    margin-bottom: 24px;
  }

  .products-container {
    gap: 32px;
  }

  .category-title {
    font-size: 20px;
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
  .products-grid {
    gap: 8px;
  }

  .product-card {
    border-radius: 8px;
  }

  .image-wrapper {
    height: 160px;
  }
}
</style>