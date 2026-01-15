<template>
  <nav class="skincare-navbar">
    <div class="nav-container">
      <!-- Logo "Celeste Shop" -->
      <router-link to="/" class="skincare-logo">
        <span class="logo-text">Celeste</span>
        <span class="logo-highlight">Shop</span>
      </router-link>
      
      <!-- Enlaces de navegación -->
      <div class="nav-links">
        <router-link to="/" class="nav-link" active-class="active">
          Inicio
        </router-link>
        <router-link to="/products" class="nav-link" active-class="active">
          Productos
        </router-link>
        <router-link to="/contact" class="nav-link" active-class="active">
          Contacto
        </router-link>
        
        <!-- Carrito -->
        <router-link to="/cart" class="cart-link">
          <span class="cart-icon">🛒</span>
          <span v-if="cartCount > 0" class="cart-badge">
            {{ cartCount }}
          </span>
        </router-link>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { computed } from 'vue'

// Contador del carrito - se conectará con tu store/localStorage
const cartCount = computed(() => {
  try {
    const cart = JSON.parse(localStorage.getItem('skincare-cart') || '[]')
    return cart.reduce((sum, item) => sum + (item.quantity || 0), 0)
  } catch (error) {
    console.error('Error al cargar carrito:', error)
    return 0
  }
})
</script>

<style scoped>
.skincare-navbar {
  background-color: #0a191f;
  padding: 1rem 0;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.4);
  position: sticky;
  top: 0;
  z-index: 1000;
}

.nav-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

/* Logo */
.skincare-logo {
  font-size: 1.8rem;
  font-weight: 800;
  text-decoration: none;
  color: #e6d2a5;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 4px;
}

.logo-text {
  color: #e6d2a5;
  letter-spacing: 1px;
}

.logo-highlight {
  color: #ffd700;
  font-weight: 900;
}

.skincare-logo:hover {
  transform: translateY(-2px);
  filter: brightness(1.2);
}

/* Enlaces de navegación */
.nav-links {
  display: flex;
  align-items: center;
  gap: 2.5rem;
}

.nav-link {
  color: #e6d2a5;
  font-weight: 600;
  font-size: 1.1rem;
  text-transform: uppercase;
  letter-spacing: 1px;
  text-decoration: none;
  position: relative;
  padding: 0.5rem 0;
  transition: color 0.3s ease;
}

.nav-link:hover {
  color: #ffd700;
}

.nav-link::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 50%;
  width: 0;
  height: 2px;
  background-color: #ffd700;
  transition: all 0.3s ease;
  transform: translateX(-50%);
}

.nav-link:hover::after {
  width: 50%;
}

.nav-link.active {
  color: #ffd700;
}

.nav-link.active::after {
  width: 50%;
  background-color: #ffd700;
}

/* Carrito */
.cart-link {
  position: relative;
  display: flex;
  align-items: center;
  text-decoration: none;
  padding: 8px;
  border-radius: 8px;
  transition: all 0.3s ease;
}

.cart-link:hover {
  background: rgba(255, 215, 0, 0.1);
}

.cart-icon {
  font-size: 1.5rem;
  color: #e6d2a5;
}

.cart-badge {
  position: absolute;
  top: -5px;
  right: -5px;
  background: #ff4757;
  color: white;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  font-size: 0.75rem;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid #0a191f;
}

/* Responsive */
@media (max-width: 992px) {
  .nav-links {
    gap: 1.5rem;
  }
  
  .skincare-logo {
    font-size: 1.5rem;
  }
  
  .nav-link {
    font-size: 1rem;
  }
}

@media (max-width: 768px) {
  .nav-container {
    flex-direction: column;
    gap: 1rem;
    padding: 1rem;
  }
  
  .nav-links {
    gap: 1rem;
    flex-wrap: wrap;
    justify-content: center;
  }
  
  .skincare-logo {
    margin-bottom: 0.5rem;
  }
  
  .cart-link {
    order: 1;
  }
}

@media (max-width: 576px) {
  .nav-links {
    gap: 0.8rem;
  }
  
  .nav-link {
    font-size: 0.9rem;
    letter-spacing: 0.5px;
  }
  
  .skincare-logo {
    font-size: 1.3rem;
  }
}
</style>