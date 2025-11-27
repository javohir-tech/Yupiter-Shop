import { createRouter, createWebHistory } from "vue-router";
// Layout
import MainLayout from "@/Layout/mainLayout.vue";
//Pages
import { About, Home } from "@/Pages";

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
            }
        ]
    }
]

export const router = createRouter({
    history : createWebHistory(), 
    routes
})

