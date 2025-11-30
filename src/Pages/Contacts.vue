<template>
  <div class="contacts-page">
    <div class="contacts-container">
      <!-- Page Header -->
      <div class="page-header">
        <h1 class="page-title">
          {{ langStore.lang === 'uz' ? 'Biz bilan bog\'laning' : 'Свяжитесь с нами' }}
        </h1>
        <p class="page-subtitle">
          {{ langStore.lang === 'uz' 
            ? 'Sizning savollaringizga javob berishdan mamnunmiz' 
            : 'Мы рады ответить на ваши вопросы' 
          }}
        </p>
      </div>

      <div class="contacts-content">
        <!-- Contact Info Cards -->
        <div class="contact-cards">
          <!-- Phone Card -->
          <div class="contact-card">
            <div class="card-icon phone-icon">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"/>
              </svg>
            </div>
            <h3 class="card-title">
              {{ langStore.lang === 'uz' ? 'Telefon' : 'Телефон' }}
            </h3>
            <a href="tel:+998771232904" class="card-link">+998 77 123 29 04</a>
            <p class="card-description">
              {{ langStore.lang === 'uz' ? 'Har kuni 9:00 - 21:00' : 'Ежедневно 9:00 - 21:00' }}
            </p>
          </div>

          <!-- Email Card -->
          <div class="contact-card">
            <div class="card-icon email-icon">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                <polyline points="22,6 12,13 2,6"/>
              </svg>
            </div>
            <h3 class="card-title">Email</h3>
            <a href="mailto:info@jupitershop.uz" class="card-link">info@jupitershop.uz</a>
            <p class="card-description">
              {{ langStore.lang === 'uz' ? '24 soat ichida javob beramiz' : 'Ответим в течение 24 часов' }}
            </p>
          </div>

          <!-- Location Card -->
          <div class="contact-card">
            <div class="card-icon location-icon">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="10" r="3"/>
                <path d="M12 21.7C17.3 17 20 13 20 10a8 8 0 1 0-16 0c0 3 2.7 6.9 8 11.7z"/>
              </svg>
            </div>
            <h3 class="card-title">
              {{ langStore.lang === 'uz' ? 'Manzil' : 'Адрес' }}
            </h3>
            <p class="card-link">
              {{ langStore.lang === 'uz' ? 'Toshkent shahar' : 'Город Ташкент' }}
            </p>
            <p class="card-description">
              {{ langStore.lang === 'uz' ? 'O\'zbekiston' : 'Узбекистан' }}
            </p>
          </div>
        </div>

        <!-- Telegram Bot Form -->
        <div class="telegram-form-section" style="margin-top: 10px;">
          <div class="form-header">
            <div class="telegram-icon-large">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z"/>
              </svg>
            </div>
            <h2 class="form-title">
              {{ langStore.lang === 'uz' ? 'Telegram orqali yozing' : 'Напишите в Telegram' }}
            </h2>
            <p class="form-subtitle">
              {{ langStore.lang === 'uz' 
                ? 'Tez javob olish uchun botimizga habar yuboring' 
                : 'Отправьте сообщение нашему боту для быстрого ответа' 
              }}
            </p>
          </div>

          <a-form
            :model="formData"
            layout="vertical"
            class="contact-form"
            @finish="handleSubmit"
          >
            <a-form-item
              :label="langStore.lang === 'uz' ? 'Ismingiz' : 'Ваше имя'"
              name="name"
              :rules="[{ required: true, message: langStore.lang === 'uz' ? 'Ismingizni kiriting' : 'Введите ваше имя' }]"
            >
              <a-input
                v-model:value="formData.name"
                size="large"
                :placeholder="langStore.lang === 'uz' ? 'Ismingizni kiriting' : 'Введите ваше имя'"
              />
            </a-form-item>

            <a-form-item
              :label="langStore.lang === 'uz' ? 'Telefon raqamingiz' : 'Ваш телефон'"
              name="phone"
              :rules="[{ required: true, message: langStore.lang === 'uz' ? 'Telefon raqamingizni kiriting' : 'Введите ваш телефон' }]"
            >
              <a-input
                v-model:value="formData.phone"
                size="large"
                :placeholder="langStore.lang === 'uz' ? '+998 __ ___ __ __' : '+998 __ ___ __ __'"
              />
            </a-form-item>

            <a-form-item
              :label="langStore.lang === 'uz' ? 'Xabaringiz' : 'Ваше сообщение'"
              name="message"
              :rules="[{ required: true, message: langStore.lang === 'uz' ? 'Xabaringizni kiriting' : 'Введите сообщение' }]"
            >
              <a-textarea
                v-model:value="formData.message"
                :rows="5"
                size="large"
                :placeholder="langStore.lang === 'uz' ? 'Sizning savolingiz yoki xabaringiz...' : 'Ваш вопрос или сообщение...'"
              />
            </a-form-item>

            <a-form-item>
              <a-button
                type="primary"
                html-type="submit"
                size="large"
                :loading="loading"
                class="submit-button"
                block
              >
                <template #icon>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
                  </svg>
                </template>
                {{ langStore.lang === 'uz' ? 'Yuborish' : 'Отправить' }}
              </a-button>
            </a-form-item>
          </a-form>

          <!-- Success/Error Messages -->
          <a-alert
            v-if="successMessage"
            :message="langStore.lang === 'uz' ? 'Muvaffaqiyatli!' : 'Успешно!'"
            :description="successMessage"
            type="success"
            show-icon
            closable
            @close="successMessage = ''"
            class="message-alert"
          />

          <a-alert
            v-if="errorMessage"
            :message="langStore.lang === 'uz' ? 'Xatolik!' : 'Ошибка!'"
            :description="errorMessage"
            type="error"
            show-icon
            closable
            @close="errorMessage = ''"
            class="message-alert"
          />
        </div>
      </div>

      <!-- Social Section -->
      <div class="social-section">
        <h3 class="social-title">
          {{ langStore.lang === 'uz' ? 'Ijtimoiy tarmoqlarda' : 'В социальных сетях' }}
        </h3>
        <div class="social-buttons">
          <a href="#" class="social-button telegram-btn">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z"/>
            </svg>
            <span>Telegram</span>
          </a>
          <a href="#" class="social-button instagram-btn">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
            </svg>
            <span>Instagram</span>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue';
import { lanStore } from '@/Stores/lanStore';

const langStore = lanStore();

const formData = reactive({
  name: '',
  phone: '',
  message: ''
});

const loading = ref(false);
const successMessage = ref('');
const errorMessage = ref('');

const TELEGRAM_BOT_TOKEN = 'YOUR_BOT_TOKEN'; // Bu yerga botingizni tokenini qo'ying
const TELEGRAM_CHAT_ID = 'YOUR_CHAT_ID'; // Bu yerga chat ID ni qo'ying

const handleSubmit = async () => {
  loading.value = true;
  successMessage.value = '';
  errorMessage.value = '';

  try {
    const message = `
🆕 Yangi xabar / Новое сообщение

👤 Ism / Имя: ${formData.name}
📱 Telefon: ${formData.phone}
💬 Xabar / Сообщение:
${formData.message}
    `;

    const response = await fetch(
      `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          chat_id: TELEGRAM_CHAT_ID,
          text: message,
          parse_mode: 'HTML',
        }),
      }
    );

    if (response.ok) {
      successMessage.value = langStore.lang === 'uz' 
        ? 'Xabaringiz muvaffaqiyatli yuborildi! Tez orada javob beramiz.' 
        : 'Ваше сообщение успешно отправлено! Скоро ответим.';
      
      // Reset form
      formData.name = '';
      formData.phone = '';
      formData.message = '';
    } else {
      throw new Error('Failed to send message');
    }
  } catch (error) {
    console.error('Error sending message:', error);
    errorMessage.value = langStore.lang === 'uz' 
      ? 'Xatolik yuz berdi. Iltimos, qaytadan urinib ko\'ring yoki telefon orqali bog\'laning.' 
      : 'Произошла ошибка. Пожалуйста, попробуйте снова или свяжитесь по телефону.';
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped>
.contacts-page {
  padding: 24px;
  max-width: 1200px;
  margin: 0 auto;
  margin-top: 80px;
  margin-bottom: 40px;
}

.contacts-container {
  display: flex;
  flex-direction: column;
  gap: 48px;
}

/* Page Header */
.page-header {
  text-align: center;
  margin-bottom: 20px;
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

/* Contact Cards */
.contact-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 24px;
}

.contact-card {
  background: #ffffff;
  padding: 32px 24px;
  border-radius: 16px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
  text-align: center;
  transition: all 0.3s ease;
  border: 2px solid transparent;
}

.contact-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 12px 32px rgba(249, 115, 22, 0.15);
  border-color: #fef3c7;
}

.card-icon {
  width: 72px;
  height: 72px;
  margin: 0 auto 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 16px;
  transition: all 0.3s ease;
}

.phone-icon {
  background: linear-gradient(135deg, #10b981, #059669);
  color: white;
}

.email-icon {
  background: linear-gradient(135deg, #3b82f6, #2563eb);
  color: white;
}

.location-icon {
  background: linear-gradient(135deg, #f59e0b, #f97316);
  color: white;
}

.contact-card:hover .card-icon {
  transform: scale(1.1) rotate(5deg);
}

.card-title {
  font-size: 20px;
  font-weight: 600;
  color: #1f2937;
  margin: 0 0 12px 0;
}

.card-link {
  font-size: 16px;
  color: #4b5563;
  text-decoration: none;
  display: block;
  margin-bottom: 8px;
  font-weight: 500;
  transition: color 0.3s ease;
}

a.card-link:hover {
  color: #f59e0b;
}

.card-description {
  font-size: 14px;
  color: #9ca3af;
  margin: 0;
}

/* Telegram Form Section */
.telegram-form-section {
  background: linear-gradient(135deg, #ffffff 0%, #f9fafb 100%);
  padding: 48px;
  border-radius: 24px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
  border: 2px solid #f0f0f0;
}

.form-header {
  text-align: center;
  margin-bottom: 40px;
}

.telegram-icon-large {
  width: 80px;
  height: 80px;
  margin: 0 auto 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 20px;
  background: linear-gradient(135deg, #2AABEE, #229ED9);
  color: white;
  box-shadow: 0 8px 24px rgba(42, 171, 238, 0.3);
}

.form-title {
  font-size: 32px;
  font-weight: 700;
  color: #1f2937;
  margin: 0 0 12px 0;
}

.form-subtitle {
  font-size: 16px;
  color: #6b7280;
  margin: 0;
}

.contact-form {
  max-width: 600px;
  margin: 0 auto;
}

.submit-button {
  height: 48px;
  font-size: 16px;
  font-weight: 600;
  background: linear-gradient(135deg, #2AABEE, #229ED9);
  border: none;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  transition: all 0.3s ease;
}

.submit-button:hover {
  background: linear-gradient(135deg, #229ED9, #1A8CC9);
  transform: translateY(-2px);
  box-shadow: 0 8px 16px rgba(42, 171, 238, 0.3);
}

.message-alert {
  margin-top: 20px;
  border-radius: 12px;
}

/* Social Section */
.social-section {
  text-align: center;
  padding: 40px;
  background: linear-gradient(135deg, #f9fafb 0%, #ffffff 100%);
  border-radius: 20px;
}

.social-title {
  font-size: 24px;
  font-weight: 600;
  color: #1f2937;
  margin: 0 0 24px 0;
}

.social-buttons {
  display: flex;
  justify-content: center;
  gap: 16px;
  flex-wrap: wrap;
}

.social-button {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px 32px;
  border-radius: 16px;
  text-decoration: none;
  color: white;
  font-size: 16px;
  font-weight: 600;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.telegram-btn {
  background: linear-gradient(135deg, #2AABEE, #229ED9);
}

.instagram-btn {
  background: linear-gradient(135deg, #833AB4, #E1306C, #F77737);
}

.social-button:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.25);
}

/* Ant Design Form Styling */
:deep(.ant-form-item-label > label) {
  font-weight: 500;
  color: #374151;
  font-size: 15px;
}

:deep(.ant-input),
:deep(.ant-input-textarea) {
  border-radius: 10px;
  border: 2px solid #e5e7eb;
  transition: all 0.3s ease;
}

:deep(.ant-input:focus),
:deep(.ant-input-textarea:focus) {
  border-color: #2AABEE;
  box-shadow: 0 0 0 3px rgba(42, 171, 238, 0.1);
}

:deep(.ant-input:hover),
:deep(.ant-input-textarea:hover) {
  border-color: #2AABEE;
}

/* Mobile Styles */
@media (max-width: 768px) {
  .contacts-page {
    padding: 16px;
    margin-top: 72px;
    margin-bottom: 100px;
  }

  .contacts-container {
    gap: 32px;
  }

  .page-title {
    font-size: 32px;
  }

  .page-subtitle {
    font-size: 16px;
  }

  .contact-cards {
    grid-template-columns: 1fr;
    gap: 16px;
  }

  .telegram-form-section {
    padding: 32px 24px;
  }

  .form-title {
    font-size: 26px;
  }

  .form-subtitle {
    font-size: 15px;
  }

  .social-section {
    padding: 32px 20px;
  }

  .social-buttons {
    flex-direction: column;
    align-items: stretch;
  }

  .social-button {
    justify-content: center;
  }
}

@media (max-width: 480px) {
  .page-title {
    font-size: 28px;
  }

  .telegram-form-section {
    padding: 24px 16px;
  }

  .form-title {
    font-size: 24px;
  }

  .telegram-icon-large {
    width: 64px;
    height: 64px;
  }

  .telegram-icon-large svg {
    width: 40px;
    height: 40px;
  }
}
</style>