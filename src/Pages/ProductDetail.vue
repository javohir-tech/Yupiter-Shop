<template>
    <!-- Loading Skeleton -->
    <div v-if="loading" class="product-detail-container">
        <a-row :gutter="[32, 32]" class="product-wrapper">
            <a-col :xs="24" :lg="14">
                <a-skeleton-image :style="{ width: '100%', height: '500px' }" active />
                <div style="margin-top: 16px;">
                    <a-skeleton active :paragraph="{ rows: 1 }" />
                </div>
            </a-col>
            <a-col :xs="24" :lg="10">
                <a-skeleton active :paragraph="{ rows: 8 }" />
            </a-col>
        </a-row>
    </div>

    <div v-else class="product-detail-container" v-if="product">
        <a-row :gutter="{
            xs: 0,
            sm: 16,
            md: 24,
            lg: 32,
            xl: 32
        }" class="product-wrapper">
            <!-- Left Side - Images -->
            <a-col :xs="24" :lg="14">
                <div class="image-section">
                    <!-- Main Image -->
                    <div class="main-image-container">
                        <a-image :src="product.main_image"
                            :preview="{ visible: isZoomed, onVisibleChange: (vis) => isZoomed = vis }"
                            class="main-image" />

                        <!-- Discount Badge -->
                        <a-badge v-if="discountPercentage > 0" :count="`-${discountPercentage}%`"
                            :number-style="{ backgroundColor: '#ef4444', fontSize: '16px', fontWeight: 'bold' }"
                            class="discount-badge" />
                    </div>
                </div>
            </a-col>

            <!-- Right Side - Product Info -->
            <a-col :xs="24" :lg="10">
                <div class="product-info">
                    <!-- Product Name -->
                    <h1 class="product-name">
                        {{ langStore.lang === 'uz' ? product.name : product.name_ru }}
                    </h1>

                    <!-- Views and Purchases -->
                    <div class="stats-row">
                        <div class="views">
                            <EyeOutlined /> {{ product.seen }} {{ langStore.lang === 'uz' ? 'ko\'rilgan' : 'просмотров'
                            }}
                        </div>
                    </div>

                    <a-divider />

                    <!-- Stock Badge -->
                    <div class="stock-badge">
                        {{ langStore.lang === 'uz' ? 'Mavjud:' : 'В наличии:' }}
                        <strong>{{ product.stock }} {{ langStore.lang === 'uz' ? 'dona' : 'шт' }}</strong>
                    </div>

                    <!-- Price Section -->
                    <div class="price-section">
                        <div class="price-box">
                            <template v-if="product.discount_price">
                                <div class="price-row">
                                    <div class="discount-price">{{ product.discount_price.toLocaleString() }} {{
                                        langStore.lang === 'uz' ? 'сум' : 'сум' }}</div>
                                    <div class="discount-percentage">-{{ discountPercentage }}%</div>
                                </div>
                                <div class="original-price">{{ product.price.toLocaleString() }} {{ langStore.lang ===
                                    'uz' ? 'сум' : 'сум' }}</div>
                            </template>
                            <template v-else>
                                <div class="current-price">{{ product.price.toLocaleString() }} {{ langStore.lang ===
                                    'uz' ? 'сум' : 'сум' }}</div>
                            </template>
                        </div>

                        <!-- Discount Period -->
                    </div>

                    <!-- Action Button -->
                    <a-button type="primary" size="large" block class="gradient-btn" @click="orderProduct"
                        :disabled="!product.link">
                        <ShoppingCartOutlined />
                        {{ langStore.lang === 'uz' ? 'Buyurtma berish' : 'Оформить заказ' }}
                    </a-button>
                </div>
            </a-col>
        </a-row>

        <div>
            <!-- Additional Images - Vertical -->
            <div v-if="additionalImages.length > 0" class="additional-images-section">
                <div class="additional-images-grid">
                    <div v-for="(img, index) in additionalImages" :key="index" class="additional-image-item"
                        @click="openImagePreview(img.image_url)">
                        <img :src="img.image_url" :alt="`Image ${index + 1}`">
                    </div>
                </div>
            </div>
        </div>

        <!-- Description Section - Full Width -->
        <div class="description-section">
            <h3>{{ langStore.lang === 'uz' ? 'Tavsif' : 'Описание' }}</h3>
            <p>{{ langStore.lang === 'uz' ? product.description : product.description_ru }}</p>
        </div>
    </div>
</template>

<script setup>
import { supabase } from "@/supabase/supabase"
import { message } from "ant-design-vue"
import { computed, onMounted, ref } from "vue"
import { useRoute } from "vue-router"
import { lanStore } from "@/Stores/lanStore"
import {
    EyeOutlined,
    ShoppingCartOutlined,
    ShoppingOutlined
} from '@ant-design/icons-vue'

const langStore = lanStore()
const route = useRoute()
const product = ref(null)
const additionalImages = ref([])
const isZoomed = ref(false)
const loading = ref(true)

const discountPercentage = computed(() => {
    if (product.value?.discount_price && product.value?.price) {
        return Math.round(((product.value.price - product.value.discount_price) / product.value.price) * 100)
    }
    return 0
})

const fetchData = async () => {
    try {
        loading.value = true
        const { data, error } = await supabase
            .from('products')
            .select("*")
            .eq('id', route.params.id)
            .single()

        if (error) throw error
        product.value = data
    } catch (error) {
        message.error(langStore.lang === 'uz' ? 'Mahsulot topilmadi' : 'Продукт не найден')
    } finally {
        loading.value = false
    }
}

const fetchImages = async () => {
    try {
        const { data, error } = await supabase
            .from('product_images')
            .select('*')
            .eq('product_id', route.params.id)
            .limit(5)

        if (error) throw error
        additionalImages.value = data || []
    } catch (error) {
        console.error("FetchImages error:", error)
        additionalImages.value = []
    }
}

const openImagePreview = (imageUrl) => {
    // Create a temporary image element for preview
    const img = document.createElement('img')
    img.src = imageUrl
    img.click()
}

const orderProduct = () => {
    if (product.value?.link) {
        window.open(product.value.link, '_blank')
    } else {
        message.warning(langStore.lang === 'uz' ? 'Link topilmadi' : 'Ссылка не найдена')
    }
}

onMounted(() => {
    fetchData()
    fetchImages()
})
</script>

<style scoped>
.product-detail-container {
    margin-top: 59px;
    padding: 20px;
    max-width: 1400px;
    margin-left: auto;
    margin-right: auto;
}

.product-wrapper {
    padding: 32px 24px;
}

/* Image Section */
.image-section {
    position: sticky;
    top: 80px;
}

.main-image-container {
    position: relative;
    width: 100%;
    overflow: hidden;
    background: #f5f5f5;
    margin-bottom: 24px;
    aspect-ratio: 1;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
}

.main-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.discount-badge {
    position: absolute;
    top: 16px;
    right: 16px;
    z-index: 10;
}

/* Additional Images Section */
.additional-images-section {
    margin-top: 24px;
}

.additional-title {
    font-size: 18px;
    font-weight: 600;
    margin-bottom: 16px;
    color: #1f2937;
}

.additional-images-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
    gap: 12px;
}

.additional-image-item {
    position: relative;
    aspect-ratio: 1;
    overflow: hidden;
    cursor: pointer;
    transition: all 0.3s;
}

.additional-image-item img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.additional-image-item:hover {
    transform: translateY(-4px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.view-icon {
    font-size: 24px;
    color: white;
}

/* Product Info */
.product-info {
    padding: 0 16px;
}

/* Category */
.category-wrapper {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 16px;
}

.category-label {
    font-size: 14px;
    color: #6b7280;
    font-weight: 500;
}

.category-tag {
    font-size: 14px;
    padding: 4px 12px;
}

.product-name {
    font-size: 28px;
    font-weight: 700;
    margin: 0 0 16px 0;
    color: #1f2937;
    line-height: 1.3;
}

/* Stats Row */
.stats-row {
    display: flex;
    align-items: center;
    gap: 24px;
    margin-bottom: 16px;
}

.views,
.purchases {
    color: #6b7280;
    font-size: 14px;
    display: flex;
    align-items: center;
    gap: 6px;
}

.purchases {
    color: #d946ef;
    font-weight: 500;
}

/* Stock Badge */
.stock-badge {
    display: inline-block;
    background: #dcfce7;
    color: #15803d;
    padding: 8px 16px;
    border-radius: 20px;
    font-size: 14px;
    margin-bottom: 20px;
}

/* Price Section */
.price-section {
    background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%);
    border-radius: 12px;
    padding: 20px;
    margin-bottom: 20px;
}

.price-box {
    margin-bottom: 12px;
}

.price-row {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 8px;
}

.discount-price {
    font-size: 32px;
    font-weight: 800;
    color: #dc2626;
}

.discount-percentage {
    background: #dc2626;
    color: white;
    padding: 4px 12px;
    border-radius: 20px;
    font-size: 18px;
    font-weight: 700;
}

.original-price {
    color: #6b7280;
    text-decoration: line-through;
    font-size: 18px;
}

.current-price {
    font-size: 32px;
    font-weight: 800;
    color: #1f2937;
}

.discount-period {
    background: rgba(255, 255, 255, 0.7);
    padding: 8px 12px;
    border-radius: 8px;
    font-size: 13px;
    color: #374151;
}

/* Gradient Button */
.gradient-btn {
    background: linear-gradient(90deg, #f59e0b, #f97316 60%, #ef4444);
    border: none;
    height: 52px;
    font-size: 18px;
    font-weight: 600;
    margin-top: 24px;
}

.gradient-btn:hover {
    opacity: 0.9;
    background: linear-gradient(90deg, #f59e0b, #f97316 60%, #ef4444);
}

/* Description Section */
.description-section {
    background: white;
    border-radius: 16px;
    padding: 32px;
    margin-top: 24px;
    box-shadow: 0 4px 24px rgba(0, 0, 0, 0.08);
}

.description-section h3 {
    font-size: 24px;
    font-weight: 700;
    margin-bottom: 16px;
    color: #1f2937;
}

.description-section p {
    color: #6b7280;
    line-height: 1.8;
    font-size: 16px;
}

/* Responsive */
@media (max-width: 992px) {
    .image-section {
        position: relative;
        top: 0;
    }

    .product-name {
        font-size: 22px;
    }

    .discount-price,
    .current-price {
        font-size: 26px;
    }

    .product-detail-container {
        margin-top: 20px;
        padding: 12px;
    }

    .product-wrapper {
        padding: 20px 16px;
    }

    .additional-images-grid {
        grid-template-columns: 1fr;
        gap: 8px;
    }

    .additional-image-item {
        max-width: 100%;
    }

    .product-detail-container {
        padding: 0;
    }

    .product-wrapper {
        padding: 0;
    }

    .additional-images-grid {
        gap: 0px;
    }

    .description-section {
        margin: 24px 12px 0px;
    }
}

@media (min-width: 992px) {
    .additional-images-grid {
        grid-template-columns: repeat(2, 1fr);
    }
}
</style>