<template>
    <div class="product-detail-container" v-if="product">
        <a-row :gutter="[32, 32]" class="product-wrapper">
            <!-- Left Side - Images -->
            <a-col :xs="24" :lg="14">
                <div class="image-section">
                    <a-row :gutter="16">    
                        <!-- Thumbnails - Left Side (Desktop only) -->
                        <a-col :xs="0" :lg="4">
                            <div class="thumbnails-vertical-wrapper">
                                <!-- Scroll Up Indicator -->
                                <div 
                                    v-if="thumbnailScrollIndex > 0"
                                    class="scroll-indicator scroll-indicator-top"
                                    @click="scrollThumbnailsUp"
                                >
                                    <div class="scroll-dots">
                                        <span></span>
                                        <span></span>
                                        <span></span>
                                    </div>
                                </div>

                                <div class="thumbnails-vertical" ref="thumbnailContainer">
                                    <div 
                                        v-for="(img, index) in visibleThumbnails" 
                                        :key="thumbnailScrollIndex + index"
                                        @click="selectImage(thumbnailScrollIndex + index)"
                                        :class="['thumbnail', { 'thumbnail-active': currentImageIndex === thumbnailScrollIndex + index }]"
                                    >
                                        <img :src="img" alt="Thumbnail">
                                    </div>
                                </div>

                                <!-- Scroll Down Indicator -->
                                <div 
                                    v-if="thumbnailScrollIndex < allImages.length - maxVisibleThumbnails"
                                    class="scroll-indicator scroll-indicator-bottom"
                                    @click="scrollThumbnailsDown"
                                >
                                    <div class="scroll-dots">
                                        <span></span>
                                        <span></span>
                                        <span></span>
                                    </div>
                                </div>
                            </div>
                        </a-col>

                        <!-- Main Image -->
                        <a-col :xs="24" :lg="20">
                            <div class="main-image-container">
                                <a-image
                                    :src="allImages[currentImageIndex]"
                                    :preview="{ visible: isZoomed, onVisibleChange: (vis) => isZoomed = vis }"
                                    class="main-image"
                                />
                                
                                <!-- Discount Badge -->
                                <a-badge 
                                    v-if="discountPercentage > 0"
                                    :count="`-${discountPercentage}%`"
                                    :number-style="{ backgroundColor: '#ef4444', fontSize: '16px', fontWeight: 'bold' }"
                                    class="discount-badge"
                                />

                                <!-- Navigation Arrows -->
                                <template v-if="allImages.length > 1">
                                    <a-button 
                                        shape="circle" 
                                        @click="prevImage"
                                        class="nav-btn nav-btn-left"
                                    >
                                        <template #icon>
                                            <LeftOutlined />
                                        </template>
                                    </a-button>
                                    <a-button 
                                        shape="circle" 
                                        @click="nextImage"
                                        class="nav-btn nav-btn-right"
                                    >
                                        <template #icon>
                                            <RightOutlined />
                                        </template>
                                    </a-button>
                                </template>

                                <!-- Image Counter -->
                                <div class="image-counter">
                                    {{ currentImageIndex + 1 }} / {{ allImages.length }}
                                </div>
                            </div>

                            <!-- Thumbnails - Bottom (Mobile only) -->
                            <div class="thumbnails-horizontal">
                                <a-row :gutter="[8, 8]">
                                    <a-col :span="4" v-for="(img, index) in allImages" :key="index">
                                        <div 
                                            @click="selectImage(index)"
                                            :class="['thumbnail', { 'thumbnail-active': currentImageIndex === index }]"
                                        >
                                            <img :src="img" alt="Thumbnail">
                                        </div>
                                    </a-col>
                                </a-row>
                            </div>
                        </a-col>
                    </a-row>
                </div>
            </a-col>

            <!-- Right Side - Product Info -->
            <a-col :xs="24" :lg="10">
                <div class="product-info">
                    <!-- Category -->
                    <div class="category-wrapper">
                        <span class="category-label">{{ langStore.lang === 'uz' ? 'Kategoriya:' : 'Категория:' }}</span>
                        <a-tag color="orange" class="category-tag">
                            {{ langStore.lang === 'uz' ? product.category_uz : product.category_ru }}
                        </a-tag>
                    </div>

                    <!-- Product Name -->
                    <h1 class="product-name">
                        {{ langStore.lang === 'uz' ? product.name : product.name_ru }}
                    </h1>

                    <!-- Views -->
                    <div class="views">
                        <EyeOutlined /> {{ product.seen }} {{ langStore.lang === 'uz' ? 'ko\'rilgan' : 'просмотров' }}
                    </div>

                    <a-divider />

                    <!-- Price Section -->
                    <div class="price-section">
                        <template v-if="product.discount_price">
                            <div class="original-price">{{ product.price.toLocaleString() }} so'm</div>
                            <div class="discount-price">{{ product.discount_price.toLocaleString() }} so'm</div>
                            <div class="savings">
                                {{ langStore.lang === 'uz' ? 'Tejaysiz' : 'Экономия' }}: 
                                {{ (product.price - product.discount_price).toLocaleString() }} so'm
                            </div>
                        </template>
                        <template v-else>
                            <div class="current-price">{{ product.price.toLocaleString() }} so'm</div>
                        </template>
                    </div>

                    <a-divider />

                    <!-- Stock -->
                    <div class="stock-info">
                        <span class="stock-label">
                            {{ langStore.lang === 'uz' ? 'Qolgan mahsulot' : 'Остаток товара' }}:
                        </span>
                        <a-tag 
                            :color="getStockColor(product.stock)"
                            style="font-size: 16px; padding: 4px 12px; font-weight: 600;"
                        >
                            {{ product.stock }} {{ langStore.lang === 'uz' ? 'dona' : 'шт' }}
                        </a-tag>
                    </div>

                    <a-divider />

                    <!-- Action Buttons -->
                    <a-space direction="vertical" style="width: 100%" size="large">
                        <a-button 
                            type="primary" 
                            size="large" 
                            block
                            class="gradient-btn"
                            @click="orderProduct"
                            :disabled="!product.link"
                        >
                            <ShoppingCartOutlined />
                            {{ langStore.lang === 'uz' ? 'Buyurtma berish' : 'Оформить заказ' }}
                        </a-button>
                    </a-space>
                </div>
            </a-col>
        </a-row>

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
import { computed, onMounted, ref, watch } from "vue"
import { useRoute } from "vue-router"
import { lanStore } from "@/Stores/lanStore"
import { 
    LeftOutlined, 
    RightOutlined, 
    EyeOutlined, 
    ShoppingCartOutlined
} from '@ant-design/icons-vue'

const langStore = lanStore()
const route = useRoute()
const product = ref(null)
const additionalImages = ref([])
const currentImageIndex = ref(0)
const isZoomed = ref(false)
const thumbnailScrollIndex = ref(0)
const maxVisibleThumbnails = 5

const allImages = computed(() => {
    const images = []
    if (product.value?.main_image) {
        images.push(product.value.main_image)
    }
    if (additionalImages.value.length > 0) {
        images.push(...additionalImages.value.map(img => img.image_url))
    }
    return images
})

const visibleThumbnails = computed(() => {
    return allImages.value.slice(thumbnailScrollIndex.value, thumbnailScrollIndex.value + maxVisibleThumbnails)
})

const discountPercentage = computed(() => {
    if (product.value?.discount_price && product.value?.price) {
        return Math.round(((product.value.price - product.value.discount_price) / product.value.price) * 100)
    }
    return 0
})

/
watch(currentImageIndex, (newIndex) => {
   
    if (allImages.value.length <= maxVisibleThumbnails) {
        
        thumbnailScrollIndex.value = 0
    } else {
        
        const middlePosition = Math.floor(maxVisibleThumbnails / 2)
        let newScrollIndex = newIndex - middlePosition
        
        // Chegaralarni tekshirish
        if (newScrollIndex < 0) {
            newScrollIndex = 0
        } else if (newScrollIndex > allImages.value.length - maxVisibleThumbnails) {
            newScrollIndex = allImages.value.length - maxVisibleThumbnails
        }
        
        thumbnailScrollIndex.value = newScrollIndex
    }
})

const fetchData = async () => {
    try {
        const { data, error } = await supabase
            .from('products')
            .select("*")
            .eq('id', route.params.id)
            .single()

        if (error) throw error
        product.value = data
    } catch (error) {
        message.error(langStore.lang === 'uz' ? 'Mahsulot topilmadi' : 'Продукт не найден')
    }
}

const fetchImages = async () => {
    try {
        const { data, error } = await supabase
            .from('product_images')
            .select('*')
            .eq('product_id', route.params.id)

        if (error) throw error
        additionalImages.value = data || []
    } catch (error) {
        message.error("FetchImages error")
        additionalImages.value = []
    }
}

const selectImage = (index) => {
    currentImageIndex.value = index
}

const nextImage = () => {
    currentImageIndex.value = (currentImageIndex.value + 1) % allImages.value.length
}

const prevImage = () => {
    currentImageIndex.value = (currentImageIndex.value - 1 + allImages.value.length) % allImages.value.length
}

const orderProduct = () => {
    if (product.value?.link) {
        window.open(product.value.link, '_blank')
    } else {
        message.warning(langStore.lang === 'uz' ? 'Link topilmadi' : 'Ссылка не найдена')
    }
}

const getStockColor = (stock) => {
    if (stock >= 20) return 'success'
    if (stock >= 10) return 'warning'
    return 'error'
}

const scrollThumbnailsUp = () => {
    if (thumbnailScrollIndex.value > 0) {
        thumbnailScrollIndex.value--
    }
}

const scrollThumbnailsDown = () => {
    if (thumbnailScrollIndex.value < allImages.value.length - maxVisibleThumbnails) {
        thumbnailScrollIndex.value++
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
    background: white;
    border-radius: 16px;
    padding: 32px 0px;
    box-shadow: 0 4px 24px rgba(0, 0, 0, 0.08);
}

/* Image Section */
.image-section {
    position: sticky;
    top: 120px;
}

.main-image-container {
    position: relative;
    width: 100%;
    border-radius: 12px;
    overflow: hidden;
    background: #f5f5f5;
    margin-bottom: 16px;
    aspect-ratio: 1;
}

.main-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.discount-badge {
    position: absolute;
    top: 16px;
    left: 16px;
    z-index: 10;
}

.image-counter {
    position: absolute;
    bottom: 16px;
    right: 16px;
    background: rgba(0, 0, 0, 0.6);
    color: white;
    padding: 6px 12px;
    border-radius: 20px;
    font-size: 14px;
    font-weight: 600;
    z-index: 10;
}

.nav-btn {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    z-index: 10;
    background: rgba(255, 255, 255, 0.9);
}

.nav-btn-left {
    left: 16px;
}

.nav-btn-right {
    right: 16px;
}

.nav-btn:hover {
    background: white;
}

/* Thumbnails Vertical Wrapper */
.thumbnails-vertical-wrapper {
    display: flex;
    flex-direction: column;
    gap: 12px;
    height: 100%;
}

.thumbnails-vertical {
    display: flex;
    flex-direction: column;
    gap: 12px;
    flex: 1;
}

/* Scroll Indicators */
.scroll-indicator {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 30px;
    cursor: pointer;
    background: linear-gradient(90deg, #f59e0b, #f97316 60%, #ef4444);
    border-radius: 8px;
    transition: all 0.3s;
}

.scroll-indicator:hover {
    transform: scale(1.05);
    box-shadow: 0 4px 12px rgba(245, 158, 11, 0.4);
}

.scroll-indicator-top {
    animation: bounce-up 1.5s infinite;
}

.scroll-indicator-bottom {
    animation: bounce-down 1.5s infinite;
}

@keyframes bounce-up {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-4px); }
}

@keyframes bounce-down {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(4px); }
}

.scroll-dots {
    display: flex;
    gap: 3px;
}

.scroll-dots span {
    width: 4px;
    height: 4px;
    background: white;
    border-radius: 50%;
    animation: pulse 1s infinite;
}

.scroll-dots span:nth-child(2) {
    animation-delay: 0.2s;
}

.scroll-dots span:nth-child(3) {
    animation-delay: 0.4s;
}

@keyframes pulse {
    0%, 100% { opacity: 0.4; }
    50% { opacity: 1; }
}

/* Thumbnails - Horizontal (Mobile only) */
.thumbnails-horizontal {
    margin-top: 12px;
}

.thumbnail {
    border-radius: 8px;
    overflow: hidden;
    border: 2px solid #e5e7eb;
    cursor: pointer;
    transition: all 0.3s;
    aspect-ratio: 1;
    opacity: 0.5;
}

.thumbnail img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.thumbnail:hover {
    border-color: #f97316;
    opacity: 0.8;
}

.thumbnail-active {
    border-color: #f59e0b;
    box-shadow: 0 0 0 2px rgba(245, 158, 11, 0.2);
    transform: scale(1.05);
    opacity: 1;
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
    font-size: 32px;
    font-weight: 700;
    margin: 16px 0;
    color: #1f2937;
}

.views {
    color: #6b7280;
    font-size: 14px;
    display: flex;
    align-items: center;
    gap: 8px;
}

/* Price Section */
.price-section {
    margin: 20px 0;
}

.original-price {
    color: #9ca3af;
    text-decoration: line-through;
    font-size: 18px;
    margin-bottom: 8px;
}

.discount-price {
    background: linear-gradient(90deg, #f59e0b, #f97316 60%, #ef4444);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    font-size: 40px;
    font-weight: 800;
    margin-bottom: 8px;
}

.current-price {
    font-size: 36px;
    font-weight: 700;
    color: #1f2937;
}

.savings {
    color: #10b981;
    font-weight: 600;
    font-size: 16px;
}

/* Stock */
.stock-info {
    font-size: 16px;
}

.stock-label {
    font-weight: 600;
    color: #374151;
}

/* Description Section - Full Width */
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

/* Gradient Button */
.gradient-btn {
    background: linear-gradient(90deg, #f59e0b, #f97316 60%, #ef4444);
    border: none;
    height: 48px;
    font-size: 16px;
    font-weight: 600;
}

.gradient-btn:hover {
    opacity: 0.9;
    background: linear-gradient(90deg, #f59e0b, #f97316 60%, #ef4444);
}

/* Responsive */
@media (max-width: 992px) {
    .image-section {
        position: relative;
        top: 0;
    }

    .product-name {
        font-size: 24px;
    }

    .discount-price {
        font-size: 32px;
    }
    
    .product-detail-container {
        margin-top: 20px;
    }
}

@media (min-width: 992px) {
    .thumbnails-horizontal {
        display: none;
    }
}
</style>