<template>
    <div class="login">
      <h2>Вход</h2>
      <form @submit.prevent="handleLogin">
        <input v-model="username" placeholder="Email" />
        <input v-model="password" type="password" placeholder="Пароль" />
        <button type="submit">Войти</button>
      </form>
      <p v-if="error" class="error">{{ error }}</p>
    </div>
</template>
  
<script setup lang="ts">
  import { ref } from 'vue'
  import { useRouter } from 'vue-router'
  import CryptoJS from 'crypto-js'
  import { onMounted } from 'vue'
  const { data } = await useFetch<User[]>('/data/users.json', {server: false})
  
  interface User {
    name: string
    surname: string
    credentials: {
      username: string
      passphrase: string
    }
    active: boolean
    created: string
  }
  
  const username = ref('')
  const password = ref('')
  const error = ref('')
  const router = useRouter()
  
  const handleLogin = () => {
    const hashed = CryptoJS.MD5(password.value).toString()
    const userList = data.value || []

    const user = userList.find(u =>
      u.credentials.username === username.value &&
      u.credentials.passphrase === hashed
    )

    if (user && user.active) {
      localStorage.setItem('session', user.credentials.username)
      router.push('/account')
    } else {
      error.value = 'Неверный логин или пароль'
    }
  }

  onMounted(async () => {
    const sessionName = localStorage.getItem('session')
    if (!sessionName) {
      return
    }

    const userList = await $fetch<User[]>('/data/users.json')
    
    const found = userList.find((user) => user.credentials.username === sessionName)

    if (found) {
      router.push('/account')
      return
    }    
  })
</script>
  
<style scoped lang="scss">
  .login {
  max-width: 320px;
  margin: 100px auto;
  display: flex;
  flex-direction: column;
  gap: 10px;
  }
  .error {
  color: red;
  }
</style>