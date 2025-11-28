<template>
  <div class="hero-section">
    <div 
      class="hero-container"
      @mousedown="handleDragStart"
      @mousemove="handleDragMove"
      @mouseup="handleDragEnd"
      @mouseleave="handleDragEnd"
      @touchstart="handleDragStart"
      @touchmove="handleDragMove"
      @touchend="handleDragEnd"
    >
      <!-- Slides -->
      <transition-group name="slide-fade" tag="div" class="slides-wrapper">
        <div
          v-for="(slide, index) in slides"
          :key="slide.id"
          v-show="currentSlide === index"
          class="hero-slide"
          :style="{ backgroundImage: `url(${slide.bgImage})` }"
        >
          <div class="hero-overlay"></div>
          <div class="hero-content">
            <div class="hero-badge" v-if="slide.badge">
              {{ slide.badge }}
            </div>
            <h1 class="hero-title">{{ slide.title }}</h1>
            <p class="hero-description">{{ slide.description }}</p>
            <div class="hero-offer" v-if="slide.discount">
              <span class="discount-text">{{ slide.discount }}</span>
              <span class="offer-text">{{ slide.offerText }}</span>
            </div>
            <button class="hero-button" @click="handleShopNow(slide)">
              {{ slide.buttonText }}
              <ArrowRightOutlined class="button-icon" />
            </button>
          </div>
        </div>
      </transition-group>

      <!-- Indicators (Dots) -->
      <div class="hero-indicators">
        <button
          v-for="(slide, index) in slides"
          :key="`indicator-${slide.id}`"
          class="indicator-dot"
          :class="{ active: currentSlide === index }"
          @click="goToSlide(index)"
          :aria-label="`Go to slide ${index + 1}`"
        ></button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { ArrowRightOutlined } from '@ant-design/icons-vue';

const currentSlide = ref(0);
let autoPlayInterval = null;

// Drag functionality
const isDragging = ref(false);
const startX = ref(0);
const currentX = ref(0);
const dragThreshold = 50; // minimum pixels to trigger slide change

const slides = [
  {
    id: 1,
    badge: '🔥 HOT DEAL',
    title: 'Summer Fashion Sale',
    description: 'Discover the latest trends with amazing discounts',
    discount: '70% OFF',
    offerText: 'Limited Time Offer',
    buttonText: 'Shop Now',
    bgImage: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1920&q=80',
  },
  {
    id: 2,
    badge: '⚡ FLASH SALE',
    title: 'Electronics Mega Sale',
    description: 'Upgrade your tech with incredible prices',
    discount: '50% OFF',
    offerText: 'Today Only',
    buttonText: 'Grab Deals',
    bgImage: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=1920&q=80',
  },
  {
    id: 3,
    badge: '🎁 SPECIAL OFFER',
    title: 'Home & Living Collection',
    description: 'Transform your space with our exclusive collection',
    discount: 'UP TO 60% OFF',
    offerText: 'Free Shipping',
    buttonText: 'Explore Now',
    bgImage: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1920&q=80',
  },
  {
    id: 4,
    badge: '💎 PREMIUM',
    title: 'Luxury Watches & Accessories',
    description: 'Timeless elegance meets modern style',
    discount: '40% OFF',
    offerText: 'Premium Brands',
    buttonText: 'View Collection',
    bgImage: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=1920&q=80',
  },
];

const handleDragStart = (e) => {
  isDragging.value = true;
  startX.value = e.type.includes('mouse') ? e.clientX : e.touches[0].clientX;
  currentX.value = startX.value;
};

const handleDragMove = (e) => {
  if (!isDragging.value) return;
  currentX.value = e.type.includes('mouse') ? e.clientX : e.touches[0].clientX;
};

const handleDragEnd = () => {
  if (!isDragging.value) return;
  
  const diff = currentX.value - startX.value;
  
  if (Math.abs(diff) > dragThreshold) {
    if (diff > 0) {
      // Swiped right - previous slide
      currentSlide.value = currentSlide.value === 0 
        ? slides.length - 1 
        : currentSlide.value - 1;
    } else {
      // Swiped left - next slide
      currentSlide.value = (currentSlide.value + 1) % slides.length;
    }
    stopAutoPlay();
    startAutoPlay();
  }
  
  isDragging.value = false;
  startX.value = 0;
  currentX.value = 0;
};

const startAutoPlay = () => {
  autoPlayInterval = setInterval(() => {
    currentSlide.value = (currentSlide.value + 1) % slides.length;
  }, 5000);
};

const stopAutoPlay = () => {
  if (autoPlayInterval) {
    clearInterval(autoPlayInterval);
  }
};

const goToSlide = (index) => {
  currentSlide.value = index;
  stopAutoPlay();
  startAutoPlay();
};

const handleShopNow = (slide) => {
  console.log('Shop now clicked for:', slide.title);
  // Navigate to products or specific category
};

onMounted(() => {
  startAutoPlay();
});

onUnmounted(() => {
  stopAutoPlay();
});
</script>

<style scoped>
.hero-section {
  width: 100%;
  height: 600px;
  position: relative;
  overflow: hidden;
  margin-top: 64px;
}

.hero-container {
  width: 100%;
  height: 100%;
  position: relative;
}

.slides-wrapper {
  width: 100%;
  height: 100%;
  position: relative;
}

.hero-slide {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  display: flex;
  align-items: center;
  justify-content: center;
}

.hero-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    135deg,
    rgba(0, 0, 0, 0.7) 0%,
    rgba(0, 0, 0, 0.4) 50%,
    rgba(249, 115, 22, 0.3) 100%
  );
}

.hero-content {
  position: relative;
  z-index: 2;
  text-align: center;
  color: white;
  max-width: 800px;
  padding: 40px;
  animation: fadeInUp 0.8s ease-out;
}

.hero-badge {
  display: inline-block;
  background: linear-gradient(90deg, #f59e0b, #f97316 60%, #ef4444);
  color: white;
  padding: 8px 24px;
  border-radius: 50px;
  font-size: 14px;
  font-weight: 600;
  letter-spacing: 1px;
  margin-bottom: 24px;
  box-shadow: 0 4px 20px rgba(249, 115, 22, 0.4);
  animation: pulse 2s ease-in-out infinite;
}

.hero-title {
  font-size: 64px;
  font-weight: 800;
  margin-bottom: 20px;
  line-height: 1.2;
  text-shadow: 0 4px 20px rgba(0, 0, 0, 0.5);
  background: linear-gradient(to right, #ffffff, #fef3c7);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.hero-description {
  font-size: 20px;
  margin-bottom: 32px;
  opacity: 0.95;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.5);
  font-weight: 300;
  letter-spacing: 0.5px;
}

.hero-offer {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
  margin-bottom: 32px;
  flex-wrap: wrap;
}

.discount-text {
  font-size: 48px;
  font-weight: 900;
  background: linear-gradient(90deg, #f59e0b, #f97316 60%, #ef4444);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-shadow: 0 4px 20px rgba(249, 115, 22, 0.6);
  filter: drop-shadow(0 4px 20px rgba(249, 115, 22, 0.6));
}

.offer-text {
  font-size: 16px;
  padding: 8px 20px;
  border: 2px solid rgba(255, 255, 255, 0.8);
  border-radius: 50px;
  font-weight: 600;
  letter-spacing: 1px;
  backdrop-filter: blur(10px);
  background: rgba(255, 255, 255, 0.1);
}

.hero-button {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  background: linear-gradient(90deg, #f59e0b, #f97316 60%, #ef4444);
  color: white;
  border: none;
  padding: 18px 48px;
  border-radius: 50px;
  font-size: 18px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 8px 30px rgba(249, 115, 22, 0.4);
  letter-spacing: 0.5px;
  text-transform: uppercase;
}

.hero-button:hover {
  transform: translateY(-4px) scale(1.05);
  box-shadow: 0 12px 40px rgba(249, 115, 22, 0.6);
}

.hero-button:active {
  transform: translateY(-2px) scale(1.02);
}

.button-icon {
  font-size: 20px;
  transition: transform 0.3s ease;
}

.hero-button:hover .button-icon {
  transform: translateX(6px);
}

/* Indicators (Dots) */
.hero-indicators {
  position: absolute;
  bottom: 32px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 12px;
  z-index: 10;
}

.indicator-dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  border: 2px solid rgba(255, 255, 255, 0.6);
  background: rgba(255, 255, 255, 0.3);
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  padding: 0;
  backdrop-filter: blur(5px);
}

.indicator-dot:hover {
  background: rgba(255, 255, 255, 0.6);
  transform: scale(1.2);
}

.indicator-dot.active {
  width: 40px;
  border-radius: 10px;
  background: linear-gradient(90deg, #f59e0b, #f97316 60%, #ef4444);
  border-color: white;
  box-shadow: 0 4px 20px rgba(249, 115, 22, 0.6);
}

/* Slide Transitions */
.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
}

.slide-fade-enter-from {
  opacity: 0;
  transform: scale(1.1);
}

.slide-fade-leave-to {
  opacity: 0;
  transform: scale(0.95);
}

/* Animations */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes pulse {
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
}

/* Mobile Responsive */
@media (max-width: 768px) {
  .hero-section {
    height: 500px;
    margin-top: 56px;
  }

  .hero-content {
    padding: 20px;
  }

  .hero-title {
    font-size: 36px;
  }

  .hero-description {
    font-size: 16px;
    margin-bottom: 24px;
  }

  .discount-text {
    font-size: 32px;
  }

  .offer-text {
    font-size: 14px;
    padding: 6px 16px;
  }

  .hero-button {
    padding: 14px 32px;
    font-size: 16px;
  }

  .hero-indicators {
    bottom: 20px;
  }

  .indicator-dot {
    width: 10px;
    height: 10px;
  }

  .indicator-dot.active {
    width: 30px;
  }
}

@media (max-width: 480px) {
  .hero-section {
    height: 450px;
  }

  .hero-title {
    font-size: 28px;
  }

  .hero-description {
    font-size: 14px;
  }

  .discount-text {
    font-size: 28px;
  }

  .hero-badge {
    font-size: 12px;
    padding: 6px 16px;
  }
}
</style>