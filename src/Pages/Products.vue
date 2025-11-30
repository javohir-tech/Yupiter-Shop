<template>
  <div class="products-page">
    <div class="page-container">
      <!-- Page Header -->
      <div class="page-header">
        <h1 class="page-title">
          {{ langStore.lang === 'uz' ? 'Mahsulotlar kategoriyalari' : 'Категории товаров' }}
        </h1>
        <p class="page-subtitle">
          {{ langStore.lang === 'uz' 
            ? 'Kerakli kategoriyani tanlang' 
            : 'Выберите нужную категорию' 
          }}
        </p>
      </div>

      <!-- Loading State -->
      <div v-if="loading" class="categories-grid">
        <div v-for="n in 6" :key="n" class="category-card skeleton">
          <div class="skeleton-icon"></div>
          <div class="skeleton-content">
            <div class="skeleton-line"></div>
            <div class="skeleton-line short"></div>
          </div>
        </div>
      </div>

      <!-- Categories Grid -->
      <div v-else class="categories-grid">
        <router-link
          v-for="category in availableCategories"
          :key="category.uz"
          :to="`/category/${category.slug}`"
          class="category-card"
        >
          <div class="category-icon">
            <span class="icon">{{ category.icon }}</span>
          </div>
          <div class="category-info">
            <h3 class="category-name">
              {{ langStore.lang === 'uz' ? category.uz : category.ru }}
            </h3>
            <p class="category-count">
              {{ category.count }} {{ langStore.lang === 'uz' ? 'mahsulot' : 'товаров' }}
            </p>
          </div>
          <div class="category-arrow">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M9 18l6-6-6-6"/>
            </svg>
          </div>
        </router-link>
      </div>

      <!-- Empty State -->
      <div v-if="!loading && availableCategories.length === 0" class="empty-state">
        <div class="empty-icon">📦</div>
        <h3 class="empty-title">
          {{ langStore.lang === 'uz' ? 'Kategoriyalar topilmadi' : 'Категории не найдены' }}
        </h3>
        <p class="empty-description">
          {{ langStore.lang === 'uz' 
            ? 'Hozircha mahsulotlar mavjud emas' 
            : 'Пока нет доступных товаров' 
          }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { createClient } from '@supabase/supabase-js';
import { lanStore } from '@/Stores/lanStore';

const langStore = lanStore();

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

const loading = ref(true);
const availableCategories = ref([]);

const fetchCategories = async () => {
  loading.value = true;
  try {
    const { data: products, error } = await supabase
      .from('products')
      .select('category_uz');

    if (error) throw error;

    // Count products by category
    const categoryCounts = {};
    products.forEach(product => {
      categoryCounts[product.category_uz] = (categoryCounts[product.category_uz] || 0) + 1;
    });

    // Filter categories that have products
    availableCategories.value = categories
      .filter(cat => categoryCounts[cat.uz] > 0)
      .map(cat => ({
        ...cat,
        count: categoryCounts[cat.uz]
      }));

  } catch (error) {
    console.error('Error fetching categories:', error);
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  fetchCategories();
});
</script>

<style scoped>
.products-page {
  padding: 24px;
  min-height: calc(100vh - 200px);
  background: linear-gradient(135deg, #f9fafb 0%, #ffffff 100%);
}

.page-container {
  max-width: 1400px;
  margin: 0 auto;
  margin-top: 80px;
}

/* Page Header */
.page-header {
  text-align: center;
  margin-bottom: 60px;
}

.page-title {
  font-size: 42px;
  font-weight: 700;
  color: #1f2937;
  margin: 0 0 16px 0;
  background: linear-gradient(90deg, #f59e0b, #f97316 60%, #ef4444);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.page-subtitle {
  font-size: 18px;
  color: #6b7280;
  margin: 0;
}

/* Categories Grid */
.categories-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 24px;
  margin-bottom: 40px;
}

.category-card {
  background: #ffffff;
  padding: 32px 28px;
  border-radius: 20px;
  display: flex;
  align-items: center;
  gap: 20px;
  text-decoration: none;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  border: 2px solid transparent;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.06);
  position: relative;
  overflow: hidden;
}

.category-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(90deg, #f59e0b, #f97316 60%, #ef4444);
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.4s ease;
}

.category-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 12px 32px rgba(249, 115, 22, 0.15);
  border-color: #fef3c7;
}

.category-card:hover::before {
  transform: scaleX(1);
}

.category-icon {
  width: 72px;
  height: 72px;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%);
  border-radius: 16px;
  transition: all 0.3s ease;
}

.category-card:hover .category-icon {
  transform: scale(1.1) rotate(5deg);
  background: linear-gradient(135deg, #fde68a 0%, #fcd34d 100%);
}

.icon {
  font-size: 36px;
  display: block;
}

.category-info {
  flex: 1;
}

.category-name {
  font-size: 22px;
  font-weight: 600;
  color: #1f2937;
  margin: 0 0 8px 0;
  line-height: 1.3;
}

.category-count {
  font-size: 15px;
  color: #6b7280;
  margin: 0;
}

.category-arrow {
  color: #9ca3af;
  transition: all 0.3s ease;
}

.category-card:hover .category-arrow {
  color: #f97316;
  transform: translateX(4px);
}

/* Skeleton Loading */
.category-card.skeleton {
  pointer-events: none;
  cursor: default;
}

.skeleton-icon {
  width: 72px;
  height: 72px;
  border-radius: 16px;
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: loading 1.5s infinite;
}

.skeleton-content {
  flex: 1;
}

.skeleton-line {
  height: 20px;
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: loading 1.5s infinite;
  border-radius: 4px;
  margin-bottom: 12px;
}

.skeleton-line.short {
  width: 60%;
  height: 16px;
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
  margin: 0;
}

/* Mobile Styles */
@media (max-width: 768px) {
  .products-page {
    padding: 16px;
  }

  .page-container {
    margin-top: 72px;
    margin-bottom: 100px;
  }

  .page-header {
    margin-bottom: 40px;
  }

  .page-title {
    font-size: 32px;
  }

  .page-subtitle {
    font-size: 16px;
  }

  .categories-grid {
    grid-template-columns: 1fr;
    gap: 16px;
  }

  .category-card {
    padding: 24px 20px;
  }

  .category-icon {
    width: 64px;
    height: 64px;
  }

  .icon {
    font-size: 32px;
  }

  .category-name {
    font-size: 18px;
  }

  .category-count {
    font-size: 14px;
  }
}

@media (max-width: 480px) {
  .page-title {
    font-size: 28px;
  }

  .category-card {
    padding: 20px 16px;
  }

  .category-icon {
    width: 56px;
    height: 56px;
  }

  .icon {
    font-size: 28px;
  }
}
</style>