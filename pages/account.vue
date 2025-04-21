<template>
    <div>
      <main>
        <div v-if="myUser">
          <h2>Здравствуйте, {{ myUser.name }} {{ myUser.surname }}</h2>
          <p>Статус: {{ myUser.active ? 'Активен' : 'Неактивен' }}</p>
          <p>Дата регистрации: {{ myUser.created }}</p>
          <h3>Корзина</h3>
          <ul v-if="myProducts" class="basket-list">
            <li v-for="product in myProducts" :key="product.id" class="basket-item">
              <h4>{{ product.name }}</h4>
              <p>Цена: {{ product.price }} ₽</p>
              <p>Описание: {{ product.description }}</p>
            </li>
          </ul>
          <p v-else>Корзина пуста</p>
        </div>
        <div v-else>
          <p>Загрузка данных пользователя...</p>
        </div>
      </main>
    </div>
</template>

<script setup lang="ts">

  import { useRouter } from 'vue-router'
  import { onMounted } from 'vue'
  import { ref } from 'vue'
  import { useUserStore } from '~/stores/user'

  interface Product {
      id: number
      name: string
      price: number
      description: string
    }

    const router = useRouter()
    const useUser = useUserStore()
    

    const myUser = useUser.myUser
    const myProducts = ref<Product[]>([])

    onMounted(async () =>{

      const sessionName = localStorage.getItem('session')

      if (!sessionName) {
        router.push('/')
        return
      }

      if (!myUser) {
        router.push('/')
        return
      }

      const productList = await $fetch<Product[]>('/data/products.json')
      myUser.basket.map((myProductId) => {
        const product = productList.find((product) => product.id === myProductId)
        if (product) {
          myProducts.value.push(product)
        }
      })

    })
    
</script>

<style scoped lang="scss">
  .basket-list {
    list-style: none;
    padding: 0;
    display: flex;
    flex-wrap: wrap;
    gap: 80px;
  }
  
  .basket-item {
    border: 1px solid #ccc;
    padding: 20px;
    border-radius: 5px;
    width: 300px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  }
</style>