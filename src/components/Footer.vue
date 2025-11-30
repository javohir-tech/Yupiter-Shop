<template>
  <footer class="footer">
    <div class="footer-container">
      <!-- Main Footer Content -->
      <div class="footer-content">
        <!-- Brand Section -->
        <div class="footer-section brand-section">
          <h3 class="brand-name">Jupiter Shop</h3>
          <p class="brand-description">
            {{ langStore.lang === 'uz' 
              ? 'Sifatli mahsulotlar, qulay narxlar va tez yetkazib berish xizmati.' 
              : 'Качественные товары, доступные цены и быстрая доставка.' 
            }}
          </p>
          
          <!-- Social Links -->
          <div class="social-links">
            <a href="#" class="social-link telegram" aria-label="Telegram">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z"/>
              </svg>
            </a>
            <a href="#" class="social-link instagram" aria-label="Instagram">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </a>
          </div>
        </div>

        <!-- Quick Links -->
        <div class="footer-section">
          <h4 class="section-title">
            {{ langStore.lang === 'uz' ? 'Tezkor havolalar' : 'Быстрые ссылки' }}
          </h4>
          <ul class="footer-links">
            <li>
              <router-link to="/" class="footer-link">
                {{ langStore.lang === 'uz' ? 'Bosh sahifa' : 'Главная' }}
              </router-link>
            </li>
            <li>
              <router-link to="/about" class="footer-link">
                {{ langStore.lang === 'uz' ? 'Biz haqimizda' : 'О нас' }}
              </router-link>
            </li>
            <li>
              <router-link to="/products" class="footer-link">
                {{ langStore.lang === 'uz' ? 'Mahsulotlar' : 'Продукты' }}
              </router-link>
            </li>
            <li>
              <router-link to="/contacts" class="footer-link">
                {{ langStore.lang === 'uz' ? 'Aloqa' : 'Контакты' }}
              </router-link>
            </li>
          </ul>
        </div>

        <!-- Contact Info -->
        <div class="footer-section">
          <h4 class="section-title">
            {{ langStore.lang === 'uz' ? 'Bog\'lanish' : 'Связаться' }}
          </h4>
          <ul class="contact-list">
            <li class="contact-item">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"/>
              </svg>
              <a href="tel:+998771232904" class="contact-link">+998 77 123 29 04</a>
            </li>
            <li class="contact-item">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                <polyline points="22,6 12,13 2,6"/>
              </svg>
              <span class="contact-link">info@jupitershop.uz</span>
            </li>
            <li class="contact-item">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="10" r="3"/>
                <path d="M12 21.7C17.3 17 20 13 20 10a8 8 0 1 0-16 0c0 3 2.7 6.9 8 11.7z"/>
              </svg>
              <span class="contact-link">
                {{ langStore.lang === 'uz' ? 'Toshkent, O\'zbekiston' : 'Ташкент, Узбекистан' }}
              </span>
            </li>
          </ul>
        </div>
      </div>

      <!-- Footer Bottom -->
      <div class="footer-bottom">
        <p class="copyright">
          © {{ currentYear }} Jupiter Shop. 
          {{ langStore.lang === 'uz' ? 'Barcha huquqlar himoyalangan.' : 'Все права защищены.' }}
        </p>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { computed } from 'vue';
import { lanStore } from '@/Stores/lanStore';

const langStore = lanStore();

const currentYear = computed(() => new Date().getFullYear());
</script>

<style scoped>
.footer {
  background: linear-gradient(135deg, #1f2937 0%, #111827 100%);
  color: #e5e7eb;
  padding: 60px 0 0;
  margin-top: 80px;
}

.footer-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 24px;
}

.footer-content {
  display: grid;
  grid-template-columns: 2fr 1fr 1.5fr;
  gap: 60px;
  padding-bottom: 48px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.footer-section {
  display: flex;
  flex-direction: column;
}

/* Brand Section */
.brand-section {
  max-width: 400px;
}

.brand-name {
  font-size: 28px;
  font-weight: 700;
  background: linear-gradient(90deg, #f59e0b, #f97316 60%, #ef4444);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin: 0 0 16px 0;
}

.brand-description {
  font-size: 15px;
  color: #9ca3af;
  line-height: 1.6;
  margin: 0 0 24px 0;
}

.social-links {
  display: flex;
  gap: 12px;
}

.social-link {
  width: 44px;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
  transition: all 0.3s ease;
  text-decoration: none;
}

.social-link.telegram {
  background: linear-gradient(135deg, #2AABEE, #229ED9);
  color: white;
}

.social-link.instagram {
  background: linear-gradient(135deg, #833AB4, #E1306C, #F77737);
  color: white;
}

.social-link:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 16px rgba(249, 115, 22, 0.3);
}

/* Section Titles */
.section-title {
  font-size: 18px;
  font-weight: 600;
  color: #f9fafb;
  margin: 0 0 20px 0;
}

/* Footer Links */
.footer-links {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.footer-link {
  color: #9ca3af;
  text-decoration: none;
  font-size: 15px;
  transition: all 0.3s ease;
  display: inline-block;
}

.footer-link:hover {
  color: #f59e0b;
  transform: translateX(4px);
}

/* Contact List */
.contact-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.contact-item {
  display: flex;
  align-items: center;
  gap: 12px;
  color: #9ca3af;
  font-size: 15px;
}

.contact-item svg {
  flex-shrink: 0;
  color: #f59e0b;
}

.contact-link {
  color: #9ca3af;
  text-decoration: none;
  transition: color 0.3s ease;
}

a.contact-link:hover {
  color: #f59e0b;
}

/* Footer Bottom */
.footer-bottom {
  padding: 24px 0;
  text-align: center;
}

.copyright {
  font-size: 14px;
  color: #6b7280;
  margin: 0;
}

/* Mobile Styles */
@media (max-width: 968px) {
  .footer-content {
    grid-template-columns: 1fr 1fr;
    gap: 40px;
  }

  .brand-section {
    grid-column: 1 / -1;
    max-width: 100%;
  }
}

@media (max-width: 640px) {
  .footer {
    padding: 48px 0 0;
    margin-top: 60px;
  }

  .footer-container {
    padding: 0 16px;
  }

  .footer-content {
    grid-template-columns: 1fr;
    gap: 32px;
  }

  .brand-name {
    font-size: 24px;
  }

  .brand-description {
    font-size: 14px;
  }

  .section-title {
    font-size: 16px;
  }

  .footer-link,
  .contact-item {
    font-size: 14px;
  }
}
</style>