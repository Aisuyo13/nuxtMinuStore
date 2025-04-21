import { defineStore } from 'pinia'
import { useFetch } from 'nuxt/app'

interface User {
    name: string
    surname: string
    credentials: {
        username: string
        passphrase: string
    }
    active: boolean
    created: string
    basket: []
}

export const useUserStore = defineStore('user', {
    state: () => ({
        myUser: null as User | null,
    }),
    actions: {
        async loadUser() {
            const sessionName = localStorage.getItem('session')
            const usersList = await $fetch<User[]>('/data/users.json')
            const userFound = usersList.find((user) => user.credentials.username === sessionName)
            console.log('userFound')
            this.myUser = userFound || null
        },
        clearUser() {this.myUser = null},
    },
})