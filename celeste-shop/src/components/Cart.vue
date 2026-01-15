<template>
  <div class="skincare-cart">
    <!-- Hero del carrito -->
    <section class="cart-hero">
      <div class="hero-cart-bg"></div>
      <div class="hero-cart-content">
        <div class="cart-nature-decor">
          <div class="cart-leaf leaf-one">🛒</div>
          <div class="cart-leaf leaf-two">🌿</div>
          <div class="nature-circle-cart"></div>
        </div>
        
        <div class="cart-hero-text">
          <h1 class="cart-title">
            <span class="title-line">Tu Carrito</span>
            <span class="title-line accent">de Skincare</span>
          </h1>
          
          <p class="cart-subtitle">
            Revisa y modifica tu selección de productos naturales
          </p>
        </div>
      </div>
    </section>

    <!-- Toast Notification -->
    <div v-if="showToast" class="toast-notification" :class="toastType">
      <span class="toast-icon">{{ toastIcon }}</span>
      <span class="toast-message">{{ toastMessage }}</span>
      <button class="toast-close" @click="showToast = false">×</button>
    </div>

    <!-- Contenido principal -->
    <div class="cart-main-container">
      <!-- Carrito vacío -->
      <div v-if="cartItems.length === 0" class="empty-cart">
        <div class="empty-cart-icon">🛍️</div>
        <h3 class="empty-title">Tu carrito está vacío</h3>
        <p class="empty-message">
          Añade algunos productos naturales para comenzar tu rutina de skincare
        </p>
        <button class="browse-products-btn" @click="goToProducts">
          <span>Explorar productos</span>
          <svg class="btn-arrow" viewBox="0 0 24 24">
            <path d="M9 18L15 12L9 6" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
          </svg>
        </button>
      </div>

      <!-- Carrito con productos -->
      <div v-else class="cart-with-items">
        <!-- Lista de productos -->
        <div class="cart-items-section">
          <div class="cart-items-header">
            <h2 class="items-title">Productos seleccionados</h2>
            <button class="clear-cart-btn" @click="clearCart">
              <span>Vaciar carrito</span>
              <span class="trash-icon">🗑️</span>
            </button>
          </div>

          <div class="cart-items-list">
            <div 
              v-for="item in cartItems" 
              :key="item.id" 
              class="cart-item-card"
            >
              <!-- Imagen del producto -->
              <div class="cart-item-image">
                <img 
                  :src="item.image || 'https://images.unsplash.com/photo-1556228578-9c360e1d8d34?w=200&h=200&fit=crop'" 
                  :alt="item.name"
                  class="item-img"
                />
                <div class="item-nature-badge">🌿</div>
              </div>

              <!-- Información del producto -->
              <div class="cart-item-info">
                <div class="item-header">
                  <h3 class="item-name">{{ item.name }}</h3>
                  <div class="item-skin-type">
                    <span class="skin-badge">Piel {{ getSkinType(item) }}</span>
                  </div>
                </div>
                
                <p class="item-ingredients">
                  Ingredientes naturales · Sin parabenos
                </p>
                
                <div class="item-price-display">
                  <div class="unit-price">${{ item.price }} c/u</div>
                  <div class="total-price">Total: ${{ item.price * item.quantity }}</div>
                </div>
              </div>

              <!-- Controles de cantidad -->
              <div class="cart-item-controls">
                <div class="quantity-selector">
                  <button 
                    class="qty-btn qty-minus"
                    @click="updateQuantity(item, item.quantity - 1)"
                    :disabled="item.quantity <= 1"
                  >
                    −
                  </button>
                  
                  <div class="quantity-display">
                    <span class="qty-number">{{ item.quantity }}</span>
                    <span class="qty-label">unidad{{ item.quantity !== 1 ? 'es' : '' }}</span>
                  </div>
                  
                  <button 
                    class="qty-btn qty-plus"
                    @click="updateQuantity(item, item.quantity + 1)"
                  >
                    +
                  </button>
                </div>
                
                <button 
                  class="remove-item-btn"
                  @click="removeFromCart(item)"
                >
                  <span>Eliminar</span>
                  <span class="remove-icon">×</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Resumen del pedido -->
        <div class="cart-summary-section">
          <div class="summary-card">
            <div class="summary-header">
              <h3 class="summary-title">Resumen del pedido</h3>
              <div class="items-count">
                {{ totalItems }} producto{{ totalItems !== 1 ? 's' : '' }}
              </div>
            </div>
            
            <div class="summary-details">
              <div class="summary-row">
                <span class="row-label">Subtotal</span>
                <span class="row-value">${{ subtotal }}</span>
              </div>
              
              <div class="summary-row">
                <span class="row-label">Envío</span>
                <span class="row-value">
                  {{ shippingCost === 0 ? 'Gratis' : `$${shippingCost}` }}
                </span>
              </div>
              
              <div class="summary-row discount-row">
                <span class="row-label">
                  <span class="discount-icon">🎁</span>
                  Descuento
                </span>
                <span class="row-value discount">-${{ discount }}</span>
              </div>
              
              <div class="summary-divider"></div>
              
              <div class="summary-row total-row">
                <span class="row-label">Total</span>
                <span class="row-value total">${{ total }}</span>
              </div>
              
              <div class="shipping-note">
                <span class="note-icon">🚚</span>
                Envío gratis en compras mayores a $50
              </div>
            </div>
            
            <button class="checkout-btn" @click="proceedToCheckout">
              <span class="checkout-text">Continuar con el pago</span>
              <span class="checkout-icon">🔒</span>
            </button>
            
            <div class="payment-methods">
              <div class="methods-label">Métodos de pago aceptados:</div>
              <div class="methods-icons">
                <span class="payment-icon">💳</span>
                <span class="payment-icon">📱</span>
                <span class="payment-icon">🏦</span>
              </div>
            </div>
          </div>
          
          <!-- Código de descuento -->
          <div class="discount-section">
            <div class="discount-header">
              <span class="discount-title">¿Tienes un código de descuento?</span>
              <span class="discount-hint">✨</span>
            </div>
            
            <div class="discount-input-group">
              <input 
                type="text" 
                v-model="discountCode"
                placeholder="Ingresa tu código"
                class="discount-input"
                @keyup.enter="applyDiscount"
              />
              <button 
                class="apply-discount-btn"
                @click="applyDiscount"
                :disabled="!discountCode.trim()"
              >
                Aplicar
              </button>
            </div>
            
            <div v-if="discountApplied" class="discount-success">
              <span class="success-icon">✅</span>
              <span>¡Descuento aplicado exitosamente!</span>
            </div>
            
            <div v-if="discountError" class="discount-error">
              <span class="error-icon">⚠️</span>
              <span>{{ discountError }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Recomendaciones -->
    <div v-if="cartItems.length > 0" class="cart-recommendations">
      <div class="recommendations-header">
        <h3 class="rec-title">Productos que podrían gustarte</h3>
        <p class="rec-subtitle">Completa tu rutina de skincare</p>
      </div>
      
      <div class="recommendations-grid">
        <div 
          class="rec-product-card" 
          v-for="rec in recommendations" 
          :key="rec.id"
          :class="{ 'added': rec.recentlyAdded }"
        >
          <img :src="rec.image" :alt="rec.name" />
          <h4>{{ rec.name }}</h4>
          <p class="rec-price">${{ rec.price }}</p>
          <button 
            class="rec-add-btn" 
            @click="addRecommended(rec)"
            :disabled="rec.adding"
          >
            <span>{{ rec.adding ? '✓ Añadido' : 'Añadir' }}</span>
            <span class="add-icon">{{ rec.adding ? '✓' : '+' }}</span>
          </button>
        </div>
      </div>
    </div>

    <!-- Modal para vaciar carrito -->
    <div v-if="showClearModal" class="modal-overlay">
      <div class="modal-content">
        <div class="modal-header">
          <h3 class="modal-title">Vaciar carrito</h3>
          <button class="modal-close" @click="showClearModal = false">×</button>
        </div>
        <div class="modal-body">
          <p>¿Estás seguro de que quieres vaciar todo tu carrito?</p>
          <div class="modal-buttons">
            <button class="modal-btn cancel" @click="showClearModal = false">
              Cancelar
            </button>
            <button class="modal-btn confirm" @click="confirmClearCart">
              Sí, vaciar carrito
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// Estado del carrito
const cartItems = ref([])
const discountCode = ref('')
const discountApplied = ref(false)
const discountError = ref('')

// Estado para toast notifications
const showToast = ref(false)
const toastMessage = ref('')
const toastType = ref('success')
const toastIcon = ref('✅')
let toastTimeout = null

// Estado para modal
const showClearModal = ref(false)

// Cargar carrito desde localStorage al montar
const loadCartFromLocalStorage = () => {
  try {
    const savedCart = localStorage.getItem('skincare-cart')
    if (savedCart) {
      cartItems.value = JSON.parse(savedCart)
    }
  } catch (error) {
    console.error('Error al cargar carrito:', error)
  }
}

// Escuchar cambios en localStorage de otras pestañas
const handleStorageChange = (event) => {
  if (event.key === 'skincare-cart') {
    loadCartFromLocalStorage()
  }
}

onMounted(() => {
  loadCartFromLocalStorage()
  window.addEventListener('storage', handleStorageChange)
})

onUnmounted(() => {
  window.removeEventListener('storage', handleStorageChange)
  if (toastTimeout) clearTimeout(toastTimeout)
})

// Computed properties
const totalItems = computed(() => {
  return cartItems.value.reduce((sum, item) => sum + item.quantity, 0)
})

const subtotal = computed(() => {
  const total = cartItems.value.reduce((sum, item) => sum + (item.price * item.quantity), 0)
  return total.toFixed(2)
})

const shippingCost = computed(() => {
  return subtotal.value > 50 ? 0 : 5.99
})

const discount = computed(() => {
  return discountApplied.value ? (subtotal.value * 0.1).toFixed(2) : 0
})

const total = computed(() => {
  const totalValue = parseFloat(subtotal.value) + parseFloat(shippingCost.value) - parseFloat(discount.value)
  return totalValue.toFixed(2)
})

// Métodos
const showNotification = (message, type = 'success') => {
  showToast.value = true
  toastMessage.value = message
  toastType.value = type
  toastIcon.value = type === 'success' ? '✅' : type === 'error' ? '❌' : '⚠️'
  
  if (toastTimeout) clearTimeout(toastTimeout)
  toastTimeout = setTimeout(() => {
    showToast.value = false
  }, 3000)
}

const updateQuantity = (item, newQuantity) => {
  if (newQuantity < 1) {
    removeFromCart(item)
    return
  }
  
  item.quantity = newQuantity
  saveCartToLocalStorage()
  showNotification(`Cantidad actualizada: ${item.name}`, 'success')
}

const removeFromCart = (item) => {
  cartItems.value = cartItems.value.filter(i => i.id !== item.id)
  saveCartToLocalStorage()
  showNotification(`${item.name} eliminado del carrito`, 'success')
}

const clearCart = () => {
  showClearModal.value = true
}

const confirmClearCart = () => {
  cartItems.value = []
  localStorage.removeItem('skincare-cart')
  showClearModal.value = false
  showNotification('Carrito vaciado', 'success')
}

const applyDiscount = () => {
  discountError.value = ''
  
  if (discountCode.value.toUpperCase() === 'SKINCARE10') {
    discountApplied.value = true
    showNotification('¡Código de descuento aplicado! 10% de descuento.', 'success')
  } else {
    discountError.value = 'Código de descuento no válido. Prueba con "SKINCARE10"'
    showNotification('Código de descuento no válido', 'error')
  }
  discountCode.value = ''
}

const proceedToCheckout = () => {
  if (cartItems.value.length === 0) {
    showNotification('Tu carrito está vacío', 'error')
    return
  }
  
  // Aquí irías a la página de checkout
  showNotification('Redirigiendo al checkout...', 'success')
  setTimeout(() => {
    // router.push('/checkout')
    showNotification('Página de checkout en desarrollo', 'info')
  }, 1000)
}

const goToProducts = () => {
  router.push('/products')
}

const getSkinType = (item) => {
  const types = {
    'sensitive': 'Sensible',
    'dry': 'Seca',
    'oily': 'Grasa',
    'combination': 'Mixta'
  }
  return types[item.skinType] || 'Todos'
}

const saveCartToLocalStorage = () => {
  localStorage.setItem('skincare-cart', JSON.stringify(cartItems.value))
}

// Productos recomendados (simulados)
const recommendations = ref([
  {
    id: 101,
    name: 'Serum Vitamina C',
    price: 29.99,
    image: 'https://images.unsplash.com/photo-1556228578-9c360e1d8d34?w=200&h=200&fit=crop',
    adding: false,
    recentlyAdded: false
  },
  {
    id: 102,
    name: 'Limpiador Suave',
    price: 18.50,
    image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=200&h=200&fit=crop',
    adding: false,
    recentlyAdded: false
  },
  {
    id: 103,
    name: 'Protector Solar',
    price: 25.00,
    image: 'https://images.unsplash.com/photo-1556228578-9c360e1d8d34?w=200&h=200&fit=crop',
    adding: false,
    recentlyAdded: false
  }
])

const addRecommended = (product) => {
  const existingItem = cartItems.value.find(item => item.id === product.id)
  
  // Feedback visual en el botón
  product.adding = true
  product.recentlyAdded = true
  
  setTimeout(() => {
    product.adding = false
  }, 2000)
  
  setTimeout(() => {
    product.recentlyAdded = false
  }, 3000)
  
  if (existingItem) {
    existingItem.quantity += 1
  } else {
    cartItems.value.push({
      ...product,
      quantity: 1,
      skinType: 'all'
    })
  }
  
  saveCartToLocalStorage()
  showNotification(`${product.name} añadido al carrito`, 'success')
}
</script>

<style scoped>
/* ESTILO SKINCARE PARA EL CARRITO */
.skincare-cart {
  font-family: 'Inter', -apple-system, sans-serif;
  color: #2d3748;
  background: #f8fafc;
  min-height: 100vh;
}

/* Toast Notification */
.toast-notification {
  position: fixed;
  top: 20px;
  right: 20px;
  background: white;
  border-left: 4px solid #38a169;
  border-radius: 8px;
  padding: 12px 16px;
  display: flex;
  align-items: center;
  gap: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  z-index: 1000;
  animation: slideIn 0.3s ease;
  max-width: 350px;
}

.toast-notification.error {
  border-left-color: #e53e3e;
}

.toast-notification.info {
  border-left-color: #3182ce;
}

.toast-icon {
  font-size: 1.2rem;
}

.toast-message {
  flex: 1;
  font-size: 0.9rem;
  color: #2d3748;
}

.toast-close {
  background: none;
  border: none;
  color: #718096;
  font-size: 1.5rem;
  cursor: pointer;
  padding: 0;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
}

.toast-close:hover {
  background: #f7fafc;
}

@keyframes slideIn {
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

/* Hero del carrito */
.cart-hero {
  background: linear-gradient(135deg, #f0fff4 0%, #e6fffa 100%);
  padding: 60px 20px 40px;
  position: relative;
  text-align: center;
}

.hero-cart-bg {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"><path d="M20,20 Q50,5 80,20 T140,20" stroke="%23c6f6d5" fill="none" stroke-width="1" opacity="0.3"/></svg>');
  background-size: 200px;
  opacity: 0.6;
}

.hero-cart-content {
  position: relative;
  z-index: 2;
  max-width: 800px;
  margin: 0 auto;
}

.cart-nature-decor {
  position: relative;
  width: 100px;
  height: 100px;
  margin: 0 auto 25px;
}

.nature-circle-cart {
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #c6f6d5 0%, #9ae6b4 100%);
  border-radius: 50%;
  position: relative;
}

.cart-leaf {
  position: absolute;
  font-size: 1.8rem;
  z-index: 2;
  animation: cartLeafFloat 6s ease-in-out infinite;
}

.leaf-one {
  top: -10px;
  left: 35px;
  transform: rotate(-30deg);
}

.leaf-two {
  bottom: -5px;
  right: 25px;
  transform: rotate(40deg);
  animation-delay: -2s;
}

@keyframes cartLeafFloat {
  0%, 100% { transform: translateY(0) rotate(var(--rotation)); }
  50% { transform: translateY(-8px) rotate(calc(var(--rotation) + 8deg)); }
}

.cart-title {
  font-size: 2.8rem;
  font-weight: 300;
  color: #2d3748;
  margin-bottom: 15px;
  line-height: 1.2;
}

.title-line {
  display: block;
}

.accent {
  font-weight: 600;
  color: #38a169;
  position: relative;
}

.accent::after {
  content: '';
  position: absolute;
  bottom: -5px;
  left: 50%;
  transform: translateX(-50%);
  width: 100px;
  height: 3px;
  background: linear-gradient(90deg, #38a169, #68d391);
  border-radius: 2px;
}

.cart-subtitle {
  font-size: 1.1rem;
  color: #4a5568;
  margin-top: 20px;
  font-weight: 300;
}

/* Contenedor principal */
.cart-main-container {
  max-width: 1200px;
  margin: 40px auto;
  padding: 0 20px;
}

/* Carrito vacío */
.empty-cart {
  text-align: center;
  padding: 80px 20px;
  background: white;
  border-radius: 20px;
  border: 1px solid #e2e8f0;
}

.empty-cart-icon {
  font-size: 4rem;
  margin-bottom: 25px;
  opacity: 0.7;
}

.empty-title {
  font-size: 1.8rem;
  color: #2d3748;
  margin-bottom: 15px;
  font-weight: 500;
}

.empty-message {
  color: #718096;
  font-size: 1.1rem;
  max-width: 400px;
  margin: 0 auto 30px;
  line-height: 1.6;
}

.browse-products-btn {
  background: linear-gradient(135deg, #38a169 0%, #48bb78 100%);
  color: white;
  border: none;
  border-radius: 12px;
  padding: 16px 32px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 12px;
  margin: 0 auto;
  transition: all 0.3s ease;
}

.browse-products-btn:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 25px rgba(56, 161, 105, 0.3);
}

.btn-arrow {
  width: 20px;
  height: 20px;
}

/* Carrito con productos */
.cart-with-items {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 40px;
}

/* Lista de productos */
.cart-items-section {
  background: white;
  border-radius: 20px;
  padding: 30px;
  border: 1px solid #e2e8f0;
}

.cart-items-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
  padding-bottom: 20px;
  border-bottom: 2px solid #f0fff4;
}

.items-title {
  font-size: 1.8rem;
  font-weight: 300;
  color: #2d3748;
}

.clear-cart-btn {
  background: transparent;
  color: #e53e3e;
  border: 1px solid #e53e3e;
  border-radius: 8px;
  padding: 8px 16px;
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: all 0.3s ease;
}

.clear-cart-btn:hover {
  background: #fed7d7;
}

.trash-icon {
  font-size: 1rem;
}

.cart-items-list {
  display: flex;
  flex-direction: column;
  gap: 25px;
}

.cart-item-card {
  display: grid;
  grid-template-columns: 120px 1fr 200px;
  gap: 25px;
  padding: 25px;
  background: #f8fafc;
  border-radius: 15px;
  border: 1px solid #e2e8f0;
  transition: all 0.3s ease;
}

.cart-item-card:hover {
  border-color: #c6f6d5;
  background: #f0fff4;
}

.cart-item-image {
  position: relative;
}

.item-img {
  width: 100%;
  height: 120px;
  object-fit: cover;
  border-radius: 12px;
  border: 2px solid white;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
}

.item-nature-badge {
  position: absolute;
  top: -8px;
  right: -8px;
  background: #38a169;
  color: white;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.9rem;
  border: 2px solid white;
}

.cart-item-info {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.item-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 10px;
}

.item-name {
  font-size: 1.3rem;
  font-weight: 600;
  color: #2d3748;
  margin: 0;
}

.item-skin-type .skin-badge {
  background: #e6fffa;
  color: #0d9488;
  padding: 4px 10px;
  border-radius: 15px;
  font-size: 0.8rem;
  font-weight: 500;
}

.item-ingredients {
  color: #718096;
  font-size: 0.9rem;
  margin-bottom: 15px;
}

.item-price-display {
  display: flex;
  gap: 20px;
}

.unit-price {
  color: #4a5568;
  font-weight: 500;
}

.total-price {
  font-weight: 600;
  color: #38a169;
}

.cart-item-controls {
  display: flex;
  flex-direction: column;
  gap: 15px;
  justify-content: center;
}

.quantity-selector {
  display: flex;
  align-items: center;
  gap: 15px;
  background: white;
  padding: 10px;
  border-radius: 12px;
  border: 1px solid #e2e8f0;
}

.qty-btn {
  width: 36px;
  height: 36px;
  border-radius: 10px;
  border: none;
  background: white;
  color: #38a169;
  font-size: 1.2rem;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
}

.qty-btn:hover:not(:disabled) {
  background: #38a169;
  color: white;
}

.qty-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.quantity-display {
  text-align: center;
}

.qty-number {
  font-size: 1.4rem;
  font-weight: 600;
  color: #2d3748;
  display: block;
}

.qty-label {
  font-size: 0.7rem;
  color: #a0aec0;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.remove-item-btn {
  background: transparent;
  color: #e53e3e;
  border: 1px solid #e53e3e;
  border-radius: 8px;
  padding: 8px 12px;
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  transition: all 0.3s ease;
}

.remove-item-btn:hover {
  background: #fed7d7;
}

.remove-icon {
  font-size: 1.2rem;
  font-weight: bold;
}

/* Resumen del pedido */
.cart-summary-section {
  display: flex;
  flex-direction: column;
  gap: 25px;
}

.summary-card {
  background: white;
  border-radius: 20px;
  padding: 30px;
  border: 1px solid #e2e8f0;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.05);
}

.summary-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 25px;
  padding-bottom: 20px;
  border-bottom: 2px solid #f0fff4;
}

.summary-title {
  font-size: 1.5rem;
  font-weight: 300;
  color: #2d3748;
}

.items-count {
  background: #e6fffa;
  color: #0d9488;
  padding: 6px 12px;
  border-radius: 15px;
  font-weight: 500;
  font-size: 0.9rem;
}

.summary-details {
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-bottom: 30px;
}

.summary-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.row-label {
  color: #4a5568;
  font-size: 1rem;
}

.row-value {
  font-weight: 500;
  color: #2d3748;
}

.discount-row {
  color: #38a169;
}

.discount-icon {
  margin-right: 8px;
}

.discount {
  color: #38a169;
  font-weight: 600;
}

.summary-divider {
  height: 1px;
  background: #e2e8f0;
  margin: 15px 0;
}

.total-row {
  font-size: 1.2rem;
}

.total {
  font-size: 1.8rem;
  font-weight: 600;
  color: #38a169;
}

.shipping-note {
  margin-top: 15px;
  padding: 12px;
  background: #f0fff4;
  border-radius: 10px;
  color: #0d9488;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  gap: 8px;
}

.note-icon {
  font-size: 1.1rem;
}

.checkout-btn {
  width: 100%;
  background: linear-gradient(135deg, #2d3748 0%, #4a5568 100%);
  color: white;
  border: none;
  border-radius: 12px;
  padding: 20px;
  font-size: 1.2rem;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  transition: all 0.3s ease;
  margin-bottom: 25px;
}

.checkout-btn:hover {
  transform: translateY(-3px);
  box-shadow: 0 10px 25px rgba(45, 55, 72, 0.3);
}

.checkout-text {
  font-size: 1.1rem;
}

.checkout-icon {
  font-size: 1.2rem;
}

.payment-methods {
  text-align: center;
  padding-top: 20px;
  border-top: 1px solid #e2e8f0;
}

.methods-label {
  color: #718096;
  font-size: 0.9rem;
  margin-bottom: 10px;
}

.methods-icons {
  display: flex;
  justify-content: center;
  gap: 15px;
}

.payment-icon {
  font-size: 1.5rem;
  opacity: 0.7;
}

/* Sección de descuento */
.discount-section {
  background: white;
  border-radius: 20px;
  padding: 25px;
  border: 1px solid #e2e8f0;
}

.discount-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
}

.discount-title {
  font-weight: 500;
  color: #2d3748;
}

.discount-hint {
  color: #38a169;
  font-size: 1.2rem;
}

.discount-input-group {
  display: flex;
  gap: 10px;
}

.discount-input {
  flex: 1;
  padding: 12px 18px;
  border: 2px solid #e2e8f0;
  border-radius: 10px;
  font-size: 1rem;
  transition: all 0.3s ease;
}

.discount-input:focus {
  outline: none;
  border-color: #38a169;
}

.apply-discount-btn {
  background: #38a169;
  color: white;
  border: none;
  border-radius: 10px;
  padding: 12px 24px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.apply-discount-btn:hover:not(:disabled) {
  background: #2f855a;
}

.apply-discount-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.discount-success {
  margin-top: 15px;
  padding: 10px;
  background: #f0fff4;
  border-radius: 10px;
  color: #38a169;
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 500;
}

.success-icon {
  font-size: 1.1rem;
}

.discount-error {
  margin-top: 15px;
  padding: 10px;
  background: #fed7d7;
  border-radius: 10px;
  color: #c53030;
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 500;
  font-size: 0.9rem;
}

.error-icon {
  font-size: 1.1rem;
}

/* Recomendaciones */
.cart-recommendations {
  max-width: 1200px;
  margin: 60px auto 40px;
  padding: 0 20px;
}

.recommendations-header {
  text-align: center;
  margin-bottom: 40px;
}

.rec-title {
  font-size: 2rem;
  font-weight: 300;
  color: #2d3748;
  margin-bottom: 10px;
}

.rec-subtitle {
  color: #718096;
  font-size: 1.1rem;
}

.recommendations-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 25px;
}

.rec-product-card {
  background: white;
  border-radius: 15px;
  padding: 20px;
  text-align: center;
  border: 1px solid #e2e8f0;
  transition: all 0.3s ease;
}

.rec-product-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.08);
}

.rec-product-card.added {
  border-color: #38a169;
  box-shadow: 0 5px 15px rgba(56, 161, 105, 0.2);
}

.rec-product-card img {
  width: 100%;
  height: 120px;
  object-fit: cover;
  border-radius: 10px;
  margin-bottom: 15px;
}

.rec-product-card h4 {
  font-size: 1.1rem;
  color: #2d3748;
  margin-bottom: 10px;
  font-weight: 600;
}

.rec-price {
  color: #38a169;
  font-weight: 600;
  font-size: 1.2rem;
  margin-bottom: 15px;
}

.rec-add-btn {
  width: 100%;
  background: #f0fff4;
  color: #38a169;
  border: 2px solid #38a169;
  border-radius: 10px;
  padding: 10px;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  transition: all 0.3s ease;
}

.rec-add-btn:hover:not(:disabled) {
  background: #38a169;
  color: white;
}

.rec-add-btn:disabled {
  background: #c6f6d5;
  color: #38a169;
  cursor: not-allowed;
  border-color: #9ae6b4;
}

.add-icon {
  font-weight: bold;
  font-size: 1.1rem;
}

/* Modal para vaciar carrito */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
  padding: 20px;
}

.modal-content {
  background: white;
  border-radius: 20px;
  max-width: 400px;
  width: 100%;
  overflow: hidden;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
  animation: modalAppear 0.3s ease;
}

@keyframes modalAppear {
  from {
    opacity: 0;
    transform: scale(0.9);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 24px;
  border-bottom: 1px solid #e2e8f0;
}

.modal-title {
  font-size: 1.3rem;
  font-weight: 600;
  color: #2d3748;
  margin: 0;
}

.modal-close {
  background: none;
  border: none;
  font-size: 1.5rem;
  color: #718096;
  cursor: pointer;
  padding: 0;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
}

.modal-close:hover {
  background: #f7fafc;
}

.modal-body {
  padding: 24px;
}

.modal-body p {
  color: #4a5568;
  margin-bottom: 24px;
  line-height: 1.5;
}

.modal-buttons {
  display: flex;
  gap: 12px;
}

.modal-btn {
  flex: 1;
  padding: 12px 20px;
  border-radius: 10px;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  border: 2px solid transparent;
}

.modal-btn.cancel {
  background: #f7fafc;
  color: #4a5568;
  border-color: #e2e8f0;
}

.modal-btn.cancel:hover {
  background: #e2e8f0;
}

.modal-btn.confirm {
  background: #e53e3e;
  color: white;
  border-color: #e53e3e;
}

.modal-btn.confirm:hover {
  background: #c53030;
}

/* Responsive */
@media (max-width: 992px) {
  .cart-with-items {
    grid-template-columns: 1fr;
  }
  
  .cart-title {
    font-size: 2.2rem;
  }
  
  .toast-notification {
    left: 20px;
    right: 20px;
    max-width: none;
  }
}

@media (max-width: 768px) {
  .cart-item-card {
    grid-template-columns: 1fr;
    gap: 20px;
  }
  
  .cart-item-image {
    width: 100px;
    margin: 0 auto;
  }
  
  .cart-item-controls {
    flex-direction: row;
    justify-content: space-between;
  }
  
  .cart-title {
    font-size: 1.8rem;
  }
  
  .rec-title {
    font-size: 1.6rem;
  }
}

@media (max-width: 576px) {
  .cart-items-header {
    flex-direction: column;
    gap: 15px;
    align-items: flex-start;
  }
  
  .clear-cart-btn {
    align-self: flex-start;
  }
  
  .cart-item-controls {
    flex-direction: column;
  }
  
  .quantity-selector {
    justify-content: center;
  }
  
  .discount-input-group {
    flex-direction: column;
  }
  
  .modal-buttons {
    flex-direction: column;
  }
  
  .modal-content {
    margin: 20px;
  }
}
</style>