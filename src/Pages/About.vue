<template>
  <div class="about-us-page">
    <!-- Hero Section -->
    <section class="hero-section">
      <div class="container">
        <h1 class="hero-title">
          {{ langStore.lang === 'uz' ? 'Biz haqimizda' : 'О нас' }}
        </h1>
        <p class="hero-subtitle">
          {{ langStore.lang === 'uz' 
            ? 'Yupiter Shop - sizning ishonchli onlayn do\'koningiz' 
            : 'Yupiter Shop - ваш надежный интернет-магазин' 
          }}
        </p>
      </div>
    </section>

    <!-- Stats Section -->
    <section class="stats-section">
      <div class="container">
        <div class="stats-grid">
          <div class="stat-card">
            <div class="stat-icon">📊</div>
            <h3 class="stat-number">15,000+</h3>
            <p class="stat-label">
              {{ langStore.lang === 'uz' ? 'Baxtli mijozlar' : 'Довольных клиентов' }}
            </p>
          </div>

          <div class="stat-card">
            <div class="stat-icon">📦</div>
            <h3 class="stat-number">25,000+</h3>
            <p class="stat-label">
              {{ langStore.lang === 'uz' ? 'Yetkazilgan buyurtmalar' : 'Доставленных заказов' }}
            </p>
          </div>

          <div class="stat-card">
            <div class="stat-icon">⭐</div>
            <h3 class="stat-number">4.9/5</h3>
            <p class="stat-label">
              {{ langStore.lang === 'uz' ? 'Mijozlar bahosi' : 'Оценка клиентов' }}
            </p>
          </div>

          <div class="stat-card">
            <div class="stat-icon">🎯</div>
            <h3 class="stat-number">5+</h3>
            <p class="stat-label">
              {{ langStore.lang === 'uz' ? 'Yillik tajriba' : 'Лет на рынке' }}
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Company Info Section -->
    <section class="info-section">
      <div class="container">
        <div class="content-wrapper">
          <div class="content-card">
            <div class="card-icon">🏢</div>
            <h2 class="card-title">
              {{ langStore.lang === 'uz' ? 'Kompaniya haqida' : 'О компании' }}
            </h2>
            <p class="card-text">
              {{ langStore.lang === 'uz' 
                ? 'Yupiter Shop 2019-yilda O\'zbekiston bozoriga kirdi va tez orada eng ishonchli onlayn do\'konlardan biriga aylandi. Biz mijozlarimizga yuqori sifatli, original mahsulotlarni hamyonbop narxlarda taklif etamiz.' 
                : 'Yupiter Shop вышел на рынок Узбекистана в 2019 году и быстро стал одним из самых надежных интернет-магазинов. Мы предлагаем нашим клиентам качественные оригинальные товары по доступным ценам.' 
              }}
            </p>
            <p class="card-text">
              {{ langStore.lang === 'uz' 
                ? 'Bizning asosiy ustunligimiz - bu mijoz ehtiyojlarini tushunish va har bir xaridni qulay hamda xavfsiz qilish. Barcha mahsulotlar rasmiy kafolat bilan ta\'minlanadi.' 
                : 'Наше главное преимущество - это понимание потребностей клиентов и создание удобного и безопасного процесса покупки. Все товары поставляются с официальной гарантией.' 
              }}
            </p>
          </div>

          <div class="content-card">
            <div class="card-icon">🎯</div>
            <h2 class="card-title">
              {{ langStore.lang === 'uz' ? 'Bizning maqsadimiz' : 'Наша миссия' }}
            </h2>
            <p class="card-text">
              {{ langStore.lang === 'uz' 
                ? 'Bizning maqsadimiz - har bir O\'zbekistonlikka sifatli mahsulotlarni qulay sharoitlarda yetkazib berishdir. Biz texnologiyalarni hayotni yengillashtirish uchun ishlatamiz.' 
                : 'Наша миссия - обеспечить каждого жителя Узбекистана качественными товарами в удобных условиях. Мы используем технологии для упрощения жизни.' 
              }}
            </p>
            <div class="mission-list">
              <div class="mission-item">
                <span class="mission-icon">✓</span>
                <span class="mission-text">
                  {{ langStore.lang === 'uz' 
                    ? 'Faqat original va sifatli mahsulotlar' 
                    : 'Только оригинальные и качественные товары' 
                  }}
                </span>
              </div>
              <div class="mission-item">
                <span class="mission-icon">✓</span>
                <span class="mission-text">
                  {{ langStore.lang === 'uz' 
                    ? 'Tez va ishonchli yetkazib berish' 
                    : 'Быстрая и надежная доставка' 
                  }}
                </span>
              </div>
              <div class="mission-item">
                <span class="mission-icon">✓</span>
                <span class="mission-text">
                  {{ langStore.lang === 'uz' 
                    ? 'Mijozlar uchun qulay xizmat' 
                    : 'Удобный сервис для клиентов' 
                  }}
                </span>
              </div>
              <div class="mission-item">
                <span class="mission-icon">✓</span>
                <span class="mission-text">
                  {{ langStore.lang === 'uz' 
                    ? 'Doimiy qo\'llab-quvvatlash' 
                    : 'Постоянная поддержка' 
                  }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Timeline Section -->
    <section class="timeline-section">
      <div class="container">
        <h2 class="section-title">
          {{ langStore.lang === 'uz' ? 'Bizning tariximiz' : 'Наша история' }}
        </h2>
        <div class="timeline">
          <div class="timeline-item">
            <div class="timeline-year">2019</div>
            <div class="timeline-content">
              <h3 class="timeline-title">
                {{ langStore.lang === 'uz' ? 'Kompaniya asos solinishi' : 'Основание компании' }}
              </h3>
              <p class="timeline-text">
                {{ langStore.lang === 'uz' 
                  ? 'Yupiter Shop Toshkentda o\'z faoliyatini boshladi' 
                  : 'Yupiter Shop начал свою деятельность в Ташкенте' 
                }}
              </p>
            </div>
          </div>

          <div class="timeline-item">
            <div class="timeline-year">2020</div>
            <div class="timeline-content">
              <h3 class="timeline-title">
                {{ langStore.lang === 'uz' ? 'Kengayish' : 'Расширение' }}
              </h3>
              <p class="timeline-text">
                {{ langStore.lang === 'uz' 
                  ? 'Butun O\'zbekiston bo\'ylab yetkazib berish xizmati ishga tushdi' 
                  : 'Запущена доставка по всему Узбекистану' 
                }}
              </p>
            </div>
          </div>

          <div class="timeline-item">
            <div class="timeline-year">2022</div>
            <div class="timeline-content">
              <h3 class="timeline-title">
                {{ langStore.lang === 'uz' ? '10,000+ mijozlar' : '10,000+ клиентов' }}
              </h3>
              <p class="timeline-text">
                {{ langStore.lang === 'uz' 
                  ? 'Biz 10,000 dan ortiq baxtli mijozlarga erishdik' 
                  : 'Мы достигли 10,000+ довольных клиентов' 
                }}
              </p>
            </div>
          </div>

          <div class="timeline-item">
            <div class="timeline-year">2024</div>
            <div class="timeline-content">
              <h3 class="timeline-title">
                {{ langStore.lang === 'uz' ? 'Yangi bosqich' : 'Новый этап' }}
              </h3>
              <p class="timeline-text">
                {{ langStore.lang === 'uz' 
                  ? 'Mahsulot toifalari kengaytirildi va yangi xizmatlar qo\'shildi' 
                  : 'Расширены категории товаров и добавлены новые услуги' 
                }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { lanStore } from '@/Stores/lanStore';

const langStore = lanStore();
</script>

<style scoped>
.about-us-page {
  background: #ffffff;
}

/* Hero Section */
.hero-section {
  background: linear-gradient(135deg, #f59e0b 0%, #f97316 60%, #ef4444 100%);
  padding: 80px 0;
  text-align: center;
  color: #ffffff;
}

.hero-title {
  font-size: 48px;
  font-weight: 700;
  margin: 0 0 16px 0;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
}

.hero-subtitle {
  font-size: 20px;
  margin: 0;
  opacity: 0.95;
}

/* Stats Section */
.stats-section {
  padding: 60px 0;
  background: #ffffff;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;
  max-width: 1100px;
  margin: 0 auto;
}

.stat-card {
  text-align: center;
  padding: 32px 20px;
  background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%);
  border-radius: 16px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.stat-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 8px 24px rgba(249, 115, 22, 0.2);
}

.stat-icon {
  font-size: 48px;
  margin-bottom: 12px;
}

.stat-number {
  font-size: 36px;
  font-weight: 700;
  color: #f97316;
  margin: 0 0 8px 0;
}

.stat-label {
  font-size: 16px;
  color: #78350f;
  margin: 0;
  font-weight: 500;
}

/* Info Section */
.info-section {
  padding: 80px 0;
  background: linear-gradient(135deg, #f9fafb 0%, #ffffff 100%);
}

.content-wrapper {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 32px;
  max-width: 1100px;
  margin: 0 auto;
}

.content-card {
  background: #ffffff;
  padding: 40px;
  border-radius: 20px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.06);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.content-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 8px 24px rgba(249, 115, 22, 0.12);
}

.card-icon {
  font-size: 48px;
  margin-bottom: 20px;
}

.card-title {
  font-size: 28px;
  font-weight: 700;
  color: #1f2937;
  margin: 0 0 20px 0;
}

.card-text {
  font-size: 16px;
  color: #6b7280;
  line-height: 1.7;
  margin: 0 0 16px 0;
}

.card-text:last-child {
  margin-bottom: 0;
}

.mission-list {
  margin-top: 24px;
}

.mission-item {
  display: flex;
  align-items: center;
  margin-bottom: 12px;
}

.mission-item:last-child {
  margin-bottom: 0;
}

.mission-icon {
  width: 28px;
  height: 28px;
  background: linear-gradient(135deg, #f59e0b, #f97316);
  color: #ffffff;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: 700;
  flex-shrink: 0;
  margin-right: 12px;
}

.mission-text {
  font-size: 15px;
  color: #374151;
  line-height: 1.5;
}

/* Timeline Section */
.timeline-section {
  padding: 80px 0;
  background: #ffffff;
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

.timeline {
  max-width: 800px;
  margin: 0 auto;
  position: relative;
  padding-left: 80px;
}

.timeline::before {
  content: '';
  position: absolute;
  left: 24px;
  top: 0;
  bottom: 0;
  width: 3px;
  background: linear-gradient(180deg, #f59e0b, #f97316, #ef4444);
}

.timeline-item {
  position: relative;
  margin-bottom: 48px;
}

.timeline-item:last-child {
  margin-bottom: 0;
}

.timeline-year {
  position: absolute;
  left: -80px;
  top: 0;
  width: 60px;
  height: 60px;
  background: linear-gradient(135deg, #f59e0b, #f97316);
  color: #ffffff;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  font-weight: 700;
  box-shadow: 0 4px 12px rgba(249, 115, 22, 0.3);
}

.timeline-content {
  background: #ffffff;
  padding: 24px 28px;
  border-radius: 12px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
  border-left: 4px solid #f97316;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.timeline-content:hover {
  transform: translateX(8px);
  box-shadow: 0 4px 20px rgba(249, 115, 22, 0.15);
}

.timeline-title {
  font-size: 20px;
  font-weight: 600;
  color: #1f2937;
  margin: 0 0 8px 0;
}

.timeline-text {
  font-size: 15px;
  color: #6b7280;
  line-height: 1.6;
  margin: 0;
}

.container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 24px;
}

/* Mobile Styles */
@media (max-width: 1024px) {
  .stats-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .content-wrapper {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 768px) {
  .hero-section {
    padding: 60px 0;
  }

  .hero-title {
    font-size: 36px;
  }

  .hero-subtitle {
    font-size: 18px;
  }

  .stats-section {
    padding: 40px 0;
  }

  .stats-grid {
    gap: 16px;
  }

  .stat-card {
    padding: 24px 16px;
  }

  .stat-icon {
    font-size: 36px;
  }

  .stat-number {
    font-size: 28px;
  }

  .info-section {
    padding: 60px 0;
  }

  .content-card {
    padding: 28px 24px;
  }

  .card-title {
    font-size: 24px;
  }

  .timeline-section {
    padding: 60px 0;
  }

  .section-title {
    font-size: 28px;
  }

  .timeline {
    padding-left: 60px;
  }

  .timeline-year {
    left: -60px;
    width: 50px;
    height: 50px;
    font-size: 14px;
  }

  .timeline-content {
    padding: 20px;
  }

  .timeline-title {
    font-size: 18px;
  }
}

@media (max-width: 480px) {
  .hero-title {
    font-size: 28px;
  }

  .hero-subtitle {
    font-size: 16px;
  }

  .stats-grid {
    grid-template-columns: 1fr;
  }

  .container {
    padding: 0 16px;
  }
}
</style>