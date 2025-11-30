import { defineStore } from "pinia";

export const lanStore = defineStore('languageStore', {
    state: () => ({
        lang: localStorage.getItem('language') || 'uz' // localStorage dan o'qish
    }),
    getters: {
        currentLang: (state) => state.lang,
        isUzbek: (state) => state.lang === 'uz',
        isRussian: (state) => state.lang === 'ru'
    },
    actions: {
        handleChangeLang(value) {
            this.lang = value;
            // localStorage ga saqlash (agar kerak bo'lsa)
            localStorage.setItem('language', value);
        }
    }
});