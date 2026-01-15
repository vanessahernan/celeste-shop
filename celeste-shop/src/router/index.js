import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../components/Home.vue'
import ProductsView from '../components/Products.vue'
import ContactView from '../components/Contact.vue'
import CartView from '../components/Cart.vue'

const routes = [
  { path: '/', component: HomeView },
  { path: '/products', component: ProductsView },
  { path: '/contact', component: ContactView },
  { path: '/cart', component: CartView }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router