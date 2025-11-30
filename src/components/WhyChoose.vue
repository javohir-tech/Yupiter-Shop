<template>
  <div class="why-choose-us">
    <div class="container">
      <h2 class="section-title">
        {{ langStore.lang === 'uz' ? 'Nega bizni tanlashadi' : 'Почему выбирают нас' }}
      </h2>

      <div class="features-grid">
        <!-- Feature 1 -->
        <div class="feature-card">
          <div class="icon-wrapper">
            <span class="icon">🎉</span>
          </div>
          <h3 class="feature-title">
            {{ langStore.lang === 'uz' ? 'Rasmiy kafolat' : 'Официальная гарантия' }}
          </h3>
          <p class="feature-description">
            {{ langStore.lang === 'uz' 
              ? '18 oygacha xizmat va brak bo\'lsa almashtirish.' 
              : '18 месяцев сервиса и обмен при браке.' 
            }}
          </p>
        </div>

        <!-- Feature 2 -->
        <div class="feature-card">
          <div class="icon-wrapper">
            <span class="icon">💰</span>
          </div>
          <h3 class="feature-title">
            {{ langStore.lang === 'uz' ? 'Qabulda to\'lov' : 'Оплата при получении' }}
          </h3>
          <p class="feature-description">
            {{ langStore.lang === 'uz' 
              ? 'To\'lovdan oldin tekshirish mumkin.' 
              : 'Можно проверить до оплаты.' 
            }}
          </p>
        </div>

        <!-- Feature 3 -->
        <div class="feature-card">
          <div class="icon-wrapper">
            <span class="icon">🚚</span>
          </div>
          <h3 class="feature-title">
            {{ langStore.lang === 'uz' ? 'Tez yetkazib berish' : 'Быстрая доставка' }}
          </h3>
          <p class="feature-description">
            {{ langStore.lang === 'uz' 
              ? 'Buyurtma kuni jo\'natamiz (O\'zbekiston bo\'ylab).' 
              : 'Отправляем день в день (по Узбекистану).' 
            }}
          </p>
        </div>

        <!-- Feature 4 -->
        <div class="feature-card">
          <div class="icon-wrapper">
            <span class="icon">🔥</span>
          </div>
          <h3 class="feature-title">
            {{ langStore.lang === 'uz' ? 'Original mahsulotlar' : 'Оригинальные товары' }}
          </h3>
          <p class="feature-description">
            {{ langStore.lang === 'uz' 
              ? 'Ishonchli yetkazib beruvchilar va sertifikat.' 
              : 'Надежные поставщики и сертификаты.' 
            }}
          </p>
        </div>

        <!-- Feature 5 -->
        <div class="feature-card">
          <div class="icon-wrapper">
            <span class="icon">📱</span>
          </div>
          <h3 class="feature-title">
            {{ langStore.lang === 'uz' ? '24/7 qo\'llab-quvvatlash' : '24/7 поддержка' }}
          </h3>
          <p class="feature-description">
            {{ langStore.lang === 'uz' 
              ? 'Telegram maslahatchi tez javob beradi.' 
              : 'Консультант в Telegram быстро ответит.' 
            }}
          </p>
        </div>

        <!-- Feature 6 -->
        <div class="feature-card">
          <div class="icon-wrapper">
            <span class="icon">✅</span>
          </div>
          <h3 class="feature-title">
            {{ langStore.lang === 'uz' ? '10 kun ichida qaytarish' : 'Возврат в течение 10 дней' }}
          </h3>
          <p class="feature-description">
            {{ langStore.lang === 'uz' 
              ? 'Mos kelmasa — ortiqcha savolsiz qaytarish.' 
              : 'Не подошло — возврат без лишних вопросов.' 
            }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { lanStore } from '@/Stores/lanStore';

const langStore = lanStore();
</script>

<style scoped>
.why-choose-us {
  padding: 80px 0;
  background: linear-gradient(135deg, #f9fafb 0%, #ffffff 100%);
}

.container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 24px;
}

.section-title {
  font-size: 36px;
  font-weight: 700;
  color: #1f2937;
  text-align: center;
  margin-bottom: 60px;
  position: relative;
}

.section-title::after {
  content: '';
  position: absolute;
  bottom: -16px;
  left: 50%;
  transform: translateX(-50%);
  width: 80px;
  height: 4px;
  background: linear-gradient(90deg, #f59e0b, #f97316 60%, #ef4444);
  border-radius: 2px;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  max-width: 1100px;
  margin: 0 auto;
}

.feature-card {
  background: #ffffff;
  padding: 24px 20px;
  border-radius: 16px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.06);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  border: 2px solid transparent;
  position: relative;
  overflow: hidden;
}

.feature-card::before {
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

.feature-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 8px 24px rgba(249, 115, 22, 0.12);
  border-color: #fef3c7;
}

.feature-card:hover::before {
  transform: scaleX(1);
}

.icon-wrapper {
  width: 56px;
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 16px;
  background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%);
  border-radius: 12px;
  transition: all 0.3s ease;
}

.feature-card:hover .icon-wrapper {
  transform: scale(1.1) rotate(5deg);
  background: linear-gradient(135deg, #fde68a 0%, #fcd34d 100%);
}

.icon {
  font-size: 28px;
  display: block;
}

.feature-title {
  font-size: 18px;
  font-weight: 600;
  color: #1f2937;
  margin: 0 0 10px 0;
  line-height: 1.3;
}

.feature-description {
  font-size: 14px;
  color: #6b7280;
  line-height: 1.5;
  margin: 0;
}

/* Mobile Styles */
@media (max-width: 768px) {
  .why-choose-us {
    padding: 60px 0;
  }

  .container {
    padding: 0 16px;
  }

  .section-title {
    font-size: 28px;
    margin-bottom: 40px;
  }

  .features-grid {
    grid-template-columns: 1fr;
    gap: 20px;
  }

  .feature-card {
    padding: 24px 20px;
  }

  .icon-wrapper {
    width: 64px;
    height: 64px;
  }

  .icon {
    font-size: 32px;
  }

  .feature-title {
    font-size: 18px;
  }

  .feature-description {
    font-size: 14px;
  }
}

@media (max-width: 480px) {
  .why-choose-us {
    padding: 48px 0;
  }

  .section-title {
    font-size: 24px;
  }

  .features-grid {
    gap: 16px;
  }
}
</style>