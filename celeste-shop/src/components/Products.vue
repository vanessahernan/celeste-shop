<template>
  <div class="skincare-products-container">
    <!-- Header con estilo natural -->
    <div class="skincare-header">
      <div class="skincare-overlay"></div>
      <div class="skincare-header-content">
        <div class="nature-logo-small">
          <div class="small-leaf leaf-a">🍃</div>
          <div class="small-leaf leaf-b">🌿</div>
          <div class="small-nature-circle"></div>
        </div>
        <h1 class="skincare-page-title">Productos disponibles</h1>
        <p class="skincare-page-subtitle">
          Descubre nuestra colección de skincare premium
        </p>
      </div>
    </div>

    <!-- Grid de productos -->
    <div class="skincare-products-list">
      <div v-if="products.length === 0" class="skincare-loading">
        <div class="loading-leaves">
          <div class="loading-leaf">🌱</div>
          <div class="loading-leaf">🍃</div>
          <div class="loading-leaf">🌿</div>
        </div>
        <p>Cargando skincare premium...</p>
      </div>

      <div class="skincare-products-grid">
        <div 
          v-for="product in products" 
          :key="product.id" 
          class="skincare-product-card"
        >
          <!-- Decoración natural en tarjeta -->
          <div class="card-nature">
            <div class="card-leaf-1">🍃</div>
            <div class="card-leaf-2">🌿</div>
          </div>

          <!-- Imagen del producto -->
          <div class="product-image-natural">
            <img 
              :src="product.image" 
              :alt="product.name" 
              loading="lazy" 
              class="skincare-product-img"
            />
            <div class="image-green-overlay"></div>
          </div>

          <!-- Información del producto -->
          <div class="skincare-product-info">
            <h3 class="skincare-product-name">{{ product.name }}</h3>
            <p class="skincare-product-price">${{ product.price }}</p>

            <!-- Controles de cantidad -->
            <div class="skincare-quantity-controls">
              <button 
                class="skincare-qty-btn minus-btn"
                @click="decrementQuantity(product)"
                :disabled="product.quantity <= 0"
              >
                −
              </button>
              
              <span class="skincare-qty-display">
                {{ product.quantity || 0 }}
              </span>
              
              <button 
                class="skincare-qty-btn plus-btn"
                @click="incrementQuantity(product)"
              >
                +
              </button>
            </div>

            <!-- Botón agregar -->
            <button 
              class="skincare-buy-button"
              @click="agregarAlCarrito(product)"
              :disabled="!product.quantity || product.quantity <= 0"
            >
              <span>
                {{ product.quantity > 0 ? `Agregar ${product.quantity}` : 'Seleccionar cantidad' }}
              </span>
              <span class="button-leaf">🌿</span>
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Footer minimalista -->
    <div class="skincare-products-footer">
      <p>Formulaciones naturales · Resultados visibles</p>
    </div>
  </div>
</template>

<script setup>
// ⚠️ IMPORT SOLO UNA VEZ - aquí está el problema
import { ref, onMounted } from 'vue'

const products = ref([])

const fetchProducts = async () => {
  try {
    const response = await fetch('http://localhost:3001/api/productos')
    const data = await response.json()
    
    // Inicializar cantidad en 0 para cada producto
    products.value = data.map(product => ({
      ...product,
      quantity: 0
    }))
  } catch (error) {
    console.error("Error al conectar con la API:", error)
  }
}

const incrementQuantity = (producto) => {
  producto.quantity = (producto.quantity || 0) + 1
}

const decrementQuantity = (producto) => {
  if (producto.quantity > 0) {
    producto.quantity -= 1
  }
}

const agregarAlCarrito = (producto) => {
  if (producto.quantity > 0) {
    // 1. Cargar carrito actual de localStorage
    let carritoActual = []
    try {
      carritoActual = JSON.parse(localStorage.getItem('skincare-cart')) || []
    } catch (error) {
      console.error("Error al cargar carrito:", error)
      carritoActual = []
    }
    
    // 2. Buscar si el producto ya existe en el carrito
    const productoExistente = carritoActual.find(item => item.id === producto.id)
    
    if (productoExistente) {
      // Si ya existe, sumar la cantidad
      productoExistente.quantity += producto.quantity
    } else {
      // Si no existe, agregarlo nuevo
      carritoActual.push({
        id: producto.id,
        name: producto.name,
        price: producto.price,
        image: producto.image,
        quantity: producto.quantity,
        addedAt: new Date().toISOString()
      })
    }
    
    // 3. Guardar en localStorage
    try {
      localStorage.setItem('skincare-cart', JSON.stringify(carritoActual))
    } catch (error) {
      console.error("Error al guardar carrito:", error)
      alert("Error al guardar en el carrito. Intenta nuevamente.")
      return
    }
    
    // 4. Feedback al usuario
    alert(`✅ ¡${producto.quantity} x ${producto.name} añadido al carrito!`)
    
    // 5. Disparar evento para que NavBar se actualice
    window.dispatchEvent(new Event('storage'))
    
    // 6. Log para debug (opcional)
    console.log('Carrito actualizado:', {
      producto: producto.name,
      cantidad: producto.quantity,
      carrito: carritoActual,
      totalItems: carritoActual.reduce((sum, item) => sum + item.quantity, 0)
    })
    
  } else {
    alert('⚠️ Por favor selecciona una cantidad primero')
  }
}

onMounted(() => {
  fetchProducts()
})
</script>

<style scoped>
/* Tu CSS existente... mantén todo igual */
.skincare-products-container {
  font-family: 'Inter', -apple-system, sans-serif;
  color: #2d3748;
  background: #f8fafc;
  min-height: 100vh;
}

/* Header */
.skincare-header {
  background: linear-gradient(135deg, #f0fff4 0%, #e6fffa 100%);
  padding: 50px 20px 40px;
  position: relative;
  overflow: hidden;
  text-align: center;
}

.skincare-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"><path d="M20,20 Q50,5 80,20 T140,20" stroke="%23c6f6d5" fill="none" stroke-width="1" opacity="0.3"/></svg>');
  background-size: 200px;
  opacity: 0.6;
}

.skincare-header-content {
  position: relative;
  z-index: 2;
  max-width: 800px;
  margin: 0 auto;
}

.nature-logo-small {
  position: relative;
  width: 80px;
  height: 80px;
  margin: 0 auto 25px;
}

.small-nature-circle {
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #c6f6d5 0%, #9ae6b4 100%);
  border-radius: 50%;
  position: relative;
}

.small-leaf {
  position: absolute;
  font-size: 1.5rem;
  z-index: 2;
  animation: leafFloat 6s ease-in-out infinite;
}

.leaf-a {
  top: -10px;
  left: 30px;
  transform: rotate(-30deg);
}

.leaf-b {
  bottom: -5px;
  right: 25px;
  transform: rotate(40deg);
  animation-delay: -2s;
}

@keyframes leafFloat {
  0%, 100% { transform: translateY(0) rotate(var(--rotation)); }
  50% { transform: translateY(-8px) rotate(calc(var(--rotation) + 8deg)); }
}

.skincare-page-title {
  font-size: 2.5rem;
  font-weight: 300;
  color: #2d3748;
  margin-bottom: 10px;
  position: relative;
}

.skincare-page-title::after {
  content: '';
  position: absolute;
  bottom: -8px;
  left: 50%;
  transform: translateX(-50%);
  width: 70px;
  height: 3px;
  background: linear-gradient(90deg, #38a169, #68d391);
  border-radius: 2px;
}

.skincare-page-subtitle {
  font-size: 1.1rem;
  color: #4a5568;
  margin-top: 20px;
  font-weight: 300;
}

/* Loading */
.skincare-loading {
  text-align: center;
  padding: 60px 20px;
}

.loading-leaves {
  display: flex;
  justify-content: center;
  gap: 15px;
  margin-bottom: 25px;
}

.loading-leaf {
  font-size: 2rem;
  animation: loadingPulse 2s ease-in-out infinite;
}

.loading-leaf:nth-child(2) { animation-delay: 0.2s; }
.loading-leaf:nth-child(3) { animation-delay: 0.4s; }

@keyframes loadingPulse {
  0%, 100% { transform: translateY(0); opacity: 0.5; }
  50% { transform: translateY(-8px); opacity: 1; }
}

.skincare-loading p {
  color: #718096;
  font-size: 1.1rem;
}

/* Grid de productos */
.skincare-products-grid {
  max-width: 1200px;
  margin: 0 auto;
  padding: 30px 20px;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 30px;
}

/* Tarjeta de producto */
.skincare-product-card {
  background: white;
  border-radius: 20px;
  overflow: hidden;
  position: relative;
  transition: all 0.3s ease;
  border: 1px solid #e2e8f0;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
}

.skincare-product-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
}

.card-nature {
  position: absolute;
  top: 15px;
  left: 15px;
  z-index: 2;
}

.card-leaf-1,
.card-leaf-2 {
  font-size: 1.2rem;
  opacity: 0.7;
  animation: cardLeafFloat 8s ease-in-out infinite;
}

.card-leaf-2 {
  margin-left: 5px;
  animation-delay: -1s;
}

@keyframes cardLeafFloat {
  0%, 100% { transform: translateY(0) rotate(0deg); }
  50% { transform: translateY(-5px) rotate(5deg); }
}

/* Imagen */
.product-image-natural {
  height: 220px;
  position: relative;
  overflow: hidden;
}

.skincare-product-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.skincare-product-card:hover .skincare-product-img {
  transform: scale(1.05);
}

.image-green-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(to bottom, transparent 60%, rgba(56, 161, 105, 0.1));
}

/* Información del producto */
.skincare-product-info {
  padding: 25px 20px;
}

.skincare-product-name {
  font-size: 1.3rem;
  font-weight: 600;
  color: #2d3748;
  margin-bottom: 10px;
  line-height: 1.3;
}

.skincare-product-price {
  font-size: 1.5rem;
  font-weight: 600;
  color: #38a169;
  margin-bottom: 20px;
}

/* Controles de cantidad */
.skincare-quantity-controls {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 15px;
  margin-bottom: 20px;
  background: #f7fafc;
  padding: 10px;
  border-radius: 12px;
}

.skincare-qty-btn {
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

.skincare-qty-btn:hover:not(:disabled) {
  background: #38a169;
  color: white;
}

.skincare-qty-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.skincare-qty-display {
  font-size: 1.3rem;
  font-weight: 600;
  color: #2d3748;
  min-width: 40px;
  text-align: center;
}

/* Botón agregar */
.skincare-buy-button {
  width: 100%;
  background: linear-gradient(135deg, #38a169 0%, #48bb78 100%);
  color: white;
  border: none;
  border-radius: 12px;
  padding: 14px 20px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  transition: all 0.3s ease;
}

.skincare-buy-button:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(56, 161, 105, 0.3);
}

.skincare-buy-button:disabled {
  background: #cbd5e0;
  cursor: not-allowed;
  transform: none;
}

.button-leaf {
  font-size: 1.1rem;
}

/* Footer */
.skincare-products-footer {
  text-align: center;
  padding: 30px 20px;
  color: #718096;
  font-size: 0.9rem;
  border-top: 1px solid #e2e8f0;
  margin-top: 40px;
}

/* Responsive */
@media (max-width: 768px) {
  .skincare-products-grid {
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 20px;
    padding: 20px;
  }
  
  .skincare-page-title {
    font-size: 2rem;
  }
  
  .product-image-natural {
    height: 200px;
  }
}

@media (max-width: 576px) {
  .skincare-products-grid {
    grid-template-columns: 1fr;
  }
  
  .skincare-header {
    padding: 40px 20px 30px;
  }
  
  .nature-logo-small {
    width: 70px;
    height: 70px;
  }
}
</style>