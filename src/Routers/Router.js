import { createRouter, createWebHistory } from "vue-router";
// Layout
import MainLayout from "@/Layout/mainLayout.vue";
//Pages
import { About, Contacts, Home, Products } from "@/Pages";

const routes = [
    {
        path : "/",
        component : MainLayout, 
        children : [
            {
                path : "" , 
                component : Home
            }, 
            {
                path : "about", 
                component : About
            }, 
            {
                path: "products", 
                component : Products
            }, 
            {
                path : "contacts", 
                component: Contacts
            }
        ]
    }
]

export const router = createRouter({
    history : createWebHistory(), 
    routes
})

