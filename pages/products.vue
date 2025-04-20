<template>
    <div>
        <h1>Товары</h1>
        <div class="sort-product">

        </div>
        <div v-if="!products.length">Загрузка товаров...</div>
        <div v-else>
            <!-- <ul class="product-list">
                <li v-for="product in products" :key="product.id" class="product-item">
                    <h2>{{ product.name }}</h2>
                    <p>{{ product.description }}</p>
                    <strong>{{ product.price }} ₽</strong>
                </li>
            </ul> -->
            <table class="product-table">
                <thead>
                    <tr>
                        <th @click="sortByName">Name</th>
                        <th>Description</th>
                        <th @click="sortbyPrice">Price</th>
                        <th @click="sortByStatus">Status</th>
                        <th @click="sorByCreated">Went on sale</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="product in products" :key="product.id">
                        <td>{{ product.name }}</td>
                        <td>{{ product.description }}</td>
                        <td>{{ product.price }} ₽</td>
                        <td>{{ product.status }}</td>
                        <td>{{ product.created }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { onMounted } from 'vue'
    import { ref } from 'vue'

    interface Product {
        id: number
        name: string
        price: number
        description: string
        created: string
        status: string
    }

    const router = useRouter()
    const products = ref<Product[]>([])

    const sortAsc = ref(true)
    
    const sortByName = () => {
        products.value.sort((a, b) => {
            const result = a.name.localeCompare(b.name)
            return sortAsc.value ? result : -result
        })
        sortAsc.value = !sortAsc.value
    }

    const sortbyPrice = () => {
        products.value.sort((a, b) => {
            const result = a.price - b.price
            return sortAsc.value ? result : -result
        })
        sortAsc.value = !sortAsc.value
    }

    const sortByStatus = () => {
        products.value.sort((a, b) => {
            const result = a.status.localeCompare(b.status)
            return sortAsc.value ? result : -result
        })
        sortAsc.value = !sortAsc.value
    }

    const sorByCreated = () => {
        products.value.sort((a, b) => {
            const result = new Date(a.created).getTime() - new Date(b.created).getTime()
            return sortAsc.value ? result : -result
        })
        sortAsc.value = !sortAsc.value
    }

    onMounted( async () => {
        products.value = await $fetch<Product[]>('/data/products.json')
    })
</script>

<style scoped lang="scss">
    .product-list {
        list-style: none;
        padding: 0;
        display: flex;
        flex-wrap: wrap;
        gap: 80px;
    }

    .product-item {
        border: 1px solid #ccc;
        padding: 20px;
        border-radius: 5px;
        width: 300px;
        box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    }

    .product-table {
        width: 100%;
        border-collapse: collapse;
        margin-top: 20px;
    }

    .product-table th,
    .product-table td {
        border: 1px solid #ccc;
        padding: 10px;
        text-align: left;
    }

    .product-table th {
        background-color: #f5f5f5;
    }
</style>