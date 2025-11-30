import { createRouter, createWebHistory } from "vue-router";
// Layout
import MainLayout from "@/Layout/mainLayout.vue";
//Pages
import { About, Contacts, Home, ProductCategory, Products, ProductDetail } from "@/Pages";

const routes = [
    {
        path: "/",
        component: MainLayout,
        children: [
            {
                path: "",
                component: Home
            },
            {
                path: "about",
                component: About
            },
            {
                path: "products",
                component: Products
            },
            {
                path: '/product/:id',
                name: 'product-detail',
                component: ProductDetail
            },
            {
                path: '/category/:slug',
                name: 'CategoryProducts',
                component: ProductCategory
            },
            {
                path: "contacts",
                component: Contacts
            }
        ]
    }
]

export const router = createRouter({
    history: createWebHistory(),
    routes
})

