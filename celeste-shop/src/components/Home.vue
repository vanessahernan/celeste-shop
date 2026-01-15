<template>
  <div class="skincare-home">

    <section class="skincare-hero">
  
      <div class="hero-bg-overlay"></div>
      
      <div class="hero-container">
        <div class="hero-content">
         
          <div class="nature-logo">
            <div class="leaf leaf-1">🍃</div>
            <div class="leaf leaf-2">🌿</div>
            <div class="nature-circle"></div>
          </div>
          
      
          <div class="hero-text">
            <h1 class="hero-title">
              <span class="title-line">Cuidado Facial</span>
              <span class="title-line accent">Natural & Efectivo</span>
            </h1>
            
            <p class="hero-subtitle">
              Descubre nuestra colección de productos dermatológicamente testados, 
              formulados con ingredientes naturales para una piel radiante y saludable.
            </p>
            
           
            <div class="benefits">
              <div class="benefit-item">
                <span class="benefit-icon">🌱</span>
                <span>Ingredientes Naturales</span>
              </div>
              <div class="benefit-item">
                <span class="benefit-icon">⚕️</span>
                <span>Dermatológicamente Testado</span>
              </div>
              <div class="benefit-item">
                <span class="benefit-icon">✨</span>
                <span>Resultados Visibles</span>
              </div>
            </div>
          </div>
          
    
          <div class="hero-cta">
            <button class="primary-btn" @click="$router.push('/products')">
              <span>Ver Productos</span>
              <svg class="btn-icon" viewBox="0 0 24 24">
                <path d="M9 18L15 12L9 6" 
                      stroke="currentColor" 
                      stroke-width="2" 
                      stroke-linecap="round"/>
              </svg>
            </button>
            
            <button class="secondary-btn" @click="scrollToFeatures">
              <span>Conocer más</span>
              <svg class="arrow-down" viewBox="0 0 24 24">
                <path d="M12 5V19M12 19L5 12M12 19L19 12" 
                      stroke="currentColor" 
                      stroke-width="2" 
                      stroke-linecap="round"/>
              </svg>
            </button>
          </div>
        </div>
        
   
        <div class="hero-image">
          <div class="product-display">
            <div class="product-bottle"></div>
            <div class="product-dropper"></div>
            <div class="product-leaves">
              <div class="leaf-illustration l1">🌿</div>
              <div class="leaf-illustration l2">🍃</div>
              <div class="leaf-illustration l3">🍂</div>
            </div>
          </div>
        </div>
      </div>
    </section>

 
    <section class="skin-types" id="skin-features">
      <div class="section-header">
        <h2 class="section-title">Para todo tipo de piel</h2>
        <p class="section-subtitle">Productos especializados según tus necesidades</p>
      </div>
      
      <div class="skin-cards">
        <div class="skin-card" data-type="oily">
          <div class="skin-icon">💧</div>
          <h3>Piel Grasa</h3>
          <p>Control de brillos y poros limpios</p>
          <div class="skin-products">
            <span class="product-count">8 productos</span>
          </div>
        </div>
        
        <div class="skin-card" data-type="dry">
          <div class="skin-icon">🌵</div>
          <h3>Piel Seca</h3>
          <p>Hidratación profunda y nutrición</p>
          <div class="skin-products">
            <span class="product-count">6 productos</span>
          </div>
        </div>
        
        <div class="skin-card" data-type="sensitive">
          <div class="skin-icon">🌾</div>
          <h3>Piel Sensible</h3>
          <p>Suave y calmante, sin irritaciones</p>
          <div class="skin-products">
            <span class="product-count">5 productos</span>
          </div>
        </div>
        
        <div class="skin-card" data-type="combination">
          <div class="skin-icon">⚖️</div>
          <h3>Piel Mixta</h3>
          <p>Balance perfecto para zonas T</p>
          <div class="skin-products">
            <span class="product-count">7 productos</span>
          </div>
        </div>
      </div>
    </section>

  
    <section class="natural-ingredients">
      <div class="ingredients-container">
        <div class="ingredients-content">
          <h2 class="ingredients-title">Ingredientes que cuidan</h2>
          <p class="ingredients-text">
            Seleccionamos cuidadosamente ingredientes de origen natural, 
            respetando tanto tu piel como el medio ambiente.
          </p>
          
          <div class="ingredient-list">
            <div class="ingredient-item">
              <span class="ingredient-icon">🌻</span>
              <div class="ingredient-info">
                <h4>Ácido Hialurónico</h4>
                <p>Hidratación profunda y retención de humedad</p>
              </div>
            </div>
            
            <div class="ingredient-item">
              <span class="ingredient-icon">🌿</span>
              <div class="ingredient-info">
                <h4>Aloe Vera</h4>
                <p>Calmante y regenerador natural</p>
              </div>
            </div>
            
            <div class="ingredient-item">
              <span class="ingredient-icon">🍵</span>
              <div class="ingredient-info">
                <h4>Té Verde</h4>
                <p>Antioxidante y protector</p>
              </div>
            </div>
            
            <div class="ingredient-item">
              <span class="ingredient-icon">🌹</span>
              <div class="ingredient-info">
                <h4>Rosa Mosqueta</h4>
                <p>Regeneración y antiedad</p>
              </div>
            </div>
          </div>
        </div>
        
        <div class="ingredients-visual">
          <div class="floating-ingredients">
            <div class="floating-item fi1">🌸</div>
            <div class="floating-item fi2">🌼</div>
            <div class="floating-item fi3">🌺</div>
            <div class="floating-item fi4">🍃</div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
const scrollToFeatures = () => {
  const section = document.getElementById('skin-features')
  section?.scrollIntoView({ behavior: 'smooth' })
}
</script>

<style scoped>
.skincare-home {
  font-family: 'Inter', -apple-system, sans-serif;
  color: #2d3748;
  overflow-x: hidden;
}

/* Hero Section */
.skincare-hero {
  min-height: 100vh;
  background: linear-gradient(135deg, #f7fafc 0%, #edf2f7 100%);
  position: relative;
  display: flex;
  align-items: center;
  padding: 0 20px;
}

.hero-bg-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"><path d="M20,20 Q50,5 80,20 T140,20" stroke="%23c6f6d5" fill="none" stroke-width="1" opacity="0.3"/></svg>');
  background-size: 200px;
  opacity: 0.6;
}

.hero-container {
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 60px;
  align-items: center;
  position: relative;
  z-index: 2;
}

.hero-content {
  padding-right: 40px;
}

.nature-logo {
  position: relative;
  width: 120px;
  height: 120px;
  margin-bottom: 40px;
}

.nature-circle {
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #c6f6d5 0%, #9ae6b4 100%);
  border-radius: 50%;
  position: relative;
}

.leaf {
  position: absolute;
  font-size: 2rem;
  z-index: 2;
}

.leaf-1 {
  top: -15px;
  left: 40px;
  transform: rotate(-45deg);
  animation: floatLeaf 6s ease-in-out infinite;
}

.leaf-2 {
  bottom: -10px;
  right: 30px;
  transform: rotate(45deg);
  animation: floatLeaf 7s ease-in-out infinite reverse;
}

@keyframes floatLeaf {
  0%, 100% { transform: translateY(0) rotate(var(--rotation)); }
  50% { transform: translateY(-10px) rotate(calc(var(--rotation) + 10deg)); }
}

.hero-title {
  font-size: 3.5rem;
  font-weight: 300;
  color: #2d3748;
  margin-bottom: 20px;
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
  left: 0;
  width: 100%;
  height: 3px;
  background: linear-gradient(90deg, #38a169, #68d391);
  border-radius: 2px;
}

.hero-subtitle {
  font-size: 1.2rem;
  color: #4a5568;
  line-height: 1.6;
  margin-bottom: 40px;
  font-weight: 300;
}

.benefits {
  display: flex;
  gap: 30px;
  margin: 40px 0;
  flex-wrap: wrap;
}

.benefit-item {
  display: flex;
  align-items: center;
  gap: 10px;
  color: #38a169;
  font-weight: 500;
  font-size: 0.95rem;
}

.benefit-icon {
  font-size: 1.2rem;
}

.hero-cta {
  display: flex;
  gap: 20px;
  margin-top: 50px;
}

.primary-btn {
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
  transition: all 0.3s ease;
  box-shadow: 0 4px 20px rgba(56, 161, 105, 0.3);
}

.primary-btn:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 30px rgba(56, 161, 105, 0.4);
}

.secondary-btn {
  background: transparent;
  color: #38a169;
  border: 2px solid #38a169;
  border-radius: 12px;
  padding: 16px 32px;
  font-size: 1.1rem;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: all 0.3s ease;
}

.secondary-btn:hover {
  background: rgba(56, 161, 105, 0.1);
}

.btn-icon {
  width: 20px;
  height: 20px;
}

.arrow-down {
  width: 18px;
  height: 18px;
}

/* Imagen decorativa */
.hero-image {
  display: flex;
  justify-content: center;
  align-items: center;
}

.product-display {
  width: 300px;
  height: 400px;
  position: relative;
}

.product-bottle {
  width: 120px;
  height: 200px;
  background: linear-gradient(135deg, #e6fffa 0%, #b2f5ea 100%);
  border-radius: 60px 60px 20px 20px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
}

.product-dropper {
  width: 30px;
  height: 60px;
  background: #38a169;
  border-radius: 15px 15px 5px 5px;
  position: absolute;
  top: calc(50% - 100px);
  left: 50%;
  transform: translateX(-50%);
}

.product-leaves {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}

.leaf-illustration {
  position: absolute;
  font-size: 2rem;
  animation: floatLeaf 8s ease-in-out infinite;
}

.l1 { top: 20%; left: 10%; animation-delay: 0s; }
.l2 { top: 60%; right: 15%; animation-delay: -2s; }
.l3 { bottom: 30%; left: 25%; animation-delay: -4s; }

/* Sección Tipos de Piel */
.skin-types {
  padding: 100px 20px;
  background: #f8fafc;
}

.section-header {
  text-align: center;
  margin-bottom: 60px;
}

.section-title {
  font-size: 2.5rem;
  font-weight: 300;
  color: #2d3748;
  margin-bottom: 15px;
}

.section-subtitle {
  font-size: 1.1rem;
  color: #718096;
  max-width: 600px;
  margin: 0 auto;
}

.skin-cards {
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 30px;
  padding: 0 20px;
}

.skin-card {
  background: white;
  border-radius: 20px;
  padding: 30px;
  text-align: center;
  transition: all 0.3s ease;
  border: 1px solid #e2e8f0;
  position: relative;
  overflow: hidden;
}

.skin-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
}

.skin-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(90deg, #38a169, #68d391);
}

.skin-icon {
  font-size: 3rem;
  margin-bottom: 20px;
}

.skin-card h3 {
  font-size: 1.5rem;
  color: #2d3748;
  margin-bottom: 10px;
  font-weight: 600;
}

.skin-card p {
  color: #718096;
  font-size: 0.95rem;
  margin-bottom: 20px;
  line-height: 1.5;
}

.skin-products {
  margin-top: 20px;
  padding-top: 20px;
  border-top: 1px solid #e2e8f0;
}

.product-count {
  color: #38a169;
  font-weight: 600;
  font-size: 0.9rem;
}

/* Sección Ingredientes */
.natural-ingredients {
  padding: 100px 20px;
  background: white;
}

.ingredients-container {
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 60px;
  align-items: center;
}

.ingredients-title {
  font-size: 2.5rem;
  font-weight: 300;
  color: #2d3748;
  margin-bottom: 20px;
}

.ingredients-text {
  font-size: 1.1rem;
  color: #4a5568;
  line-height: 1.6;
  margin-bottom: 40px;
}

.ingredient-list {
  display: flex;
  flex-direction: column;
  gap: 25px;
}

.ingredient-item {
  display: flex;
  align-items: flex-start;
  gap: 20px;
}

.ingredient-icon {
  font-size: 2rem;
  flex-shrink: 0;
}

.ingredient-info h4 {
  font-size: 1.2rem;
  color: #2d3748;
  margin-bottom: 5px;
  font-weight: 600;
}

.ingredient-info p {
  color: #718096;
  font-size: 0.95rem;
  line-height: 1.5;
}

/* Visual de ingredientes flotantes */
.ingredients-visual {
  position: relative;
  height: 400px;
}

.floating-ingredients {
  position: relative;
  width: 100%;
  height: 100%;
}

.floating-item {
  position: absolute;
  font-size: 2.5rem;
  animation: floatItem 15s ease-in-out infinite;
}

.fi1 { top: 20%; left: 30%; animation-delay: 0s; }
.fi2 { top: 60%; right: 20%; animation-delay: -3s; }
.fi3 { bottom: 30%; left: 40%; animation-delay: -6s; }
.fi4 { top: 40%; right: 40%; animation-delay: -9s; }

@keyframes floatItem {
  0%, 100% { transform: translate(0, 0) rotate(0deg); }
  33% { transform: translate(20px, -20px) rotate(120deg); }
  66% { transform: translate(-10px, 10px) rotate(240deg); }
}

/* Responsive */
@media (max-width: 992px) {
  .hero-container {
    grid-template-columns: 1fr;
    text-align: center;
    gap: 40px;
  }
  
  .hero-content {
    padding-right: 0;
  }
  
  .benefits {
    justify-content: center;
  }
  
  .hero-cta {
    justify-content: center;
  }
  
  .ingredients-container {
    grid-template-columns: 1fr;
  }
  
  .hero-title {
    font-size: 2.8rem;
  }
  
  .section-title,
  .ingredients-title {
    font-size: 2rem;
  }
}

@media (max-width: 768px) {
  .skin-cards {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .hero-title {
    font-size: 2.2rem;
  }
  
  .hero-subtitle {
    font-size: 1.1rem;
  }
  
  .hero-cta {
    flex-direction: column;
    align-items: center;
  }
  
  .primary-btn,
  .secondary-btn {
    width: 100%;
    max-width: 300px;
    justify-content: center;
  }
}

@media (max-width: 576px) {
  .skin-cards {
    grid-template-columns: 1fr;
  }
  
  .hero-title {
    font-size: 1.8rem;
  }
  
  .benefits {
    flex-direction: column;
    gap: 15px;
    align-items: center;
  }
  
  .skin-types,
  .natural-ingredients {
    padding: 60px 20px;
  }
}
</style>