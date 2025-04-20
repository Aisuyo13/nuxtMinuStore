<template>
    <div>
      <header>
        <nav class="navbar">
            <ul>
                <li><NuxtLink  class="nav-item" to="/products">Товары</NuxtLink></li>
                <li><NuxtLink  class="nav-item" to="/account">Личный кабинет</NuxtLink></li>
                <li><NuxtLink  class="nav-item" to="/about">О нас</NuxtLink></li>
            </ul>
        </nav>
        <button @click="logout" class="logout-btn">Выход</button>

      </header>
  
      <main>
        <div class="container">
            <NuxtPage />
        </div>
      </main>
  
      <footer>
        <div class="container">
            <p>&copy; 2025 Мини CRM — Все права НЕ защищены</p>
        </div>
      </footer>
    </div>
</template>

<script setup lang="ts">
    import { useRouter } from 'vue-router'
    const router = useRouter()

    const logout = () => {
        localStorage.removeItem('session')
        router.push('/')
    }
</script>

<style scoped lang="scss">

    .container {
        max-width: 1200px;
        margin: 0 auto;
        padding: 20px;
    }

    header {
        background-color: #333;
        color: white;
        padding: 10px;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .navbar {
        color: white;
        padding: 10px;
        display: flex;
    }
    .navbar ul {
        list-style: none;
        display: flex;
        gap: 20px;
    }

    .nav-item {
        color: white;
        text-decoration: none;
    }

    .logout-btn {
        background-color: #efe6e5;
        color: rgb(9, 9, 9);
        border: none;
        padding: 10px 20px;
        cursor: pointer;
        border-radius: 10px;
    }
    
</style>