<template>
  <div class="skincare-contact">
  
    <section class="contact-hero">
      <div class="hero-nature-bg"></div>
      <div class="hero-content-wrapper">
        <div class="nature-decor-contact">
          <div class="contact-leaf leaf-left">🍃</div>
          <div class="contact-leaf leaf-right">🌿</div>
          <div class="nature-circle-contact"></div>
        </div>
        
        <div class="hero-text-contact">
          <h1 class="contact-title">
            <span class="title-line">Estamos aquí</span>
            <span class="title-line accent">para ayudarte</span>
          </h1>
          
          <p class="contact-subtitle">
            Tu piel es nuestra prioridad. Escríbenos para consultas, recomendaciones 
            personalizadas o cualquier duda sobre nuestros productos naturales.
          </p>
        </div>
      </div>
    </section>

    <!-- Sección de información de contacto -->
    <section class="contact-info-section">
      <div class="contact-info-container">
        <!-- Información principal -->
        <div class="contact-main-info">
          <div class="info-card">
            <div class="info-icon">📧</div>
            <h3 class="info-title">Correo Electrónico</h3>
            <p class="info-description">Respondemos en menos de 24 horas</p>
            <a href="mailto:contacto@celesteshop.com" class="info-value">
              contacto@celesteshop.com
            </a>
          </div>
          
          <div class="info-card">
            <div class="info-icon">🕒</div>
            <h3 class="info-title">Horario de Atención</h3>
            <p class="info-description">Estamos disponibles para ti</p>
            <div class="info-value">
              <div>Lunes a Viernes: 9am - 6pm</div>
              <div>Sábados: 10am - 2pm</div>
            </div>
          </div>
          
          <div class="info-card">
            <div class="info-icon">📍</div>
            <h3 class="info-title">Ubicación</h3>
            <p class="info-description">Tienda física y envíos nacionales</p>
            <div class="info-value">
              Ciudad Skincare, Distrito Natural
            </div>
          </div>
        </div>

        <!-- Formulario de contacto -->
        <div class="contact-form-section">
          <div class="form-header">
            <h2 class="form-title">Escríbenos directamente</h2>
            <p class="form-subtitle">Te responderemos lo antes posible</p>
          </div>
          
          <form @submit.prevent="submitContactForm" class="skincare-form">
            <div class="form-group">
              <label for="name" class="form-label">
                <span class="label-icon">👤</span>
                Nombre completo
              </label>
              <input 
                type="text" 
                id="name" 
                v-model="formData.name"
                required
                class="form-input"
                placeholder="Tu nombre"
              >
            </div>
            
            <div class="form-group">
              <label for="email" class="form-label">
                <span class="label-icon">✉️</span>
                Correo electrónico
              </label>
              <input 
                type="email" 
                id="email" 
                v-model="formData.email"
                required
                class="form-input"
                placeholder="tu@email.com"
              >
            </div>
            
            <div class="form-group">
              <label for="subject" class="form-label">
                <span class="label-icon">📋</span>
                Asunto
              </label>
              <select 
                id="subject" 
                v-model="formData.subject"
                required
                class="form-select"
              >
                <option value="" disabled selected>Selecciona un tema</option>
                <option value="productos">Consulta sobre productos</option>
                <option value="rutina">Rutina personalizada</option>
                <option value="pedido">Estado de pedido</option>
                <option value="devolucion">Devolución o cambio</option>
                <option value="otro">Otro tema</option>
              </select>
            </div>
            
            <div class="form-group">
              <label for="message" class="form-label">
                <span class="label-icon">💬</span>
                Tu mensaje
              </label>
              <textarea 
                id="message" 
                v-model="formData.message"
                required
                class="form-textarea"
                rows="5"
                placeholder="Cuéntanos cómo podemos ayudarte..."
              ></textarea>
            </div>
            
            <button 
              type="submit" 
              class="submit-btn"
              :disabled="isSubmitting"
            >
              <span class="btn-text">
                {{ isSubmitting ? 'Enviando...' : 'Enviar mensaje' }}
              </span>
              <span class="btn-icon">{{ isSubmitting ? '⏳' : '🌿' }}</span>
            </button>
          </form>
        </div>
      </div>
    </section>

    <!-- Sección de preguntas frecuentes -->
    <section class="faq-section">
      <div class="faq-container">
        <div class="faq-header">
          <h2 class="faq-title">Preguntas frecuentes</h2>
          <p class="faq-subtitle">Respuestas rápidas a tus dudas más comunes</p>
        </div>
        
        <div class="faq-list">
          <div class="faq-item">
            <div class="faq-question">
              <span class="faq-icon">❓</span>
              <h3>¿Los productos son 100% naturales?</h3>
              <button class="faq-toggle" @click="toggleFaq(0)">
                {{ activeFaq === 0 ? '−' : '+' }}
              </button>
            </div>
            <div v-if="activeFaq === 0" class="faq-answer">
              <p>Sí, todos nuestros productos están formulados con ingredientes de origen natural y son dermatológicamente testados. Evitamos parabenos, sulfatos y siliconas.</p>
            </div>
          </div>
          
          <div class="faq-item">
            <div class="faq-question">
              <span class="faq-icon">🚚</span>
              <h3>¿Cuánto tardan los envíos?</h3>
              <button class="faq-toggle" @click="toggleFaq(1)">
                {{ activeFaq === 1 ? '−' : '+' }}
              </button>
            </div>
            <div v-if="activeFaq === 1" class="faq-answer">
              <p>Los envíos dentro de la ciudad tardan 24-48 horas. Para el resto del país, de 3 a 5 días hábiles. Ofrecemos seguimiento en tiempo real de tu pedido.</p>
            </div>
          </div>
          
          <div class="faq-item">
            <div class="faq-question">
              <span class="faq-icon">↩️</span>
              <h3>¿Aceptan devoluciones?</h3>
              <button class="faq-toggle" @click="toggleFaq(2)">
                {{ activeFaq === 2 ? '−' : '+' }}
              </button>
            </div>
            <div v-if="activeFaq === 2" class="faq-answer">
              <p>Aceptamos devoluciones dentro de los 30 días posteriores a la compra, siempre que el producto esté en su estado original. El proceso es sencillo y rápido.</p>
            </div>
          </div>
          
          <div class="faq-item">
            <div class="faq-question">
              <span class="faq-icon">💆</span>
              <h3>¿Ofrecen asesoría personalizada?</h3>
              <button class="faq-toggle" @click="toggleFaq(3)">
                {{ activeFaq === 3 ? '−' : '+' }}
              </button>
            </div>
            <div v-if="activeFaq === 3" class="faq-answer">
              <p>Sí, nuestro equipo de especialistas en skincare puede recomendar la rutina perfecta según tu tipo de piel. Agenda una consulta gratuita por videollamada.</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA final -->
    <section class="contact-cta">
      <div class="cta-content">
        <div class="cta-nature">
          <div class="cta-leaf">🌸</div>
          <div class="cta-leaf">🌿</div>
          <div class="cta-leaf">🍃</div>
        </div>
        <h2 class="cta-title">¿Lista para una piel más saludable?</h2>
        <p class="cta-text">
          Únete a nuestra comunidad y recibe consejos exclusivos de cuidado de la piel
        </p>
        <div class="cta-buttons">
          <button class="cta-btn primary" @click="goToProducts">
            <span>Ver productos</span>
            <svg class="btn-arrow" viewBox="0 0 24 24">
              <path d="M9 18L15 12L9 6" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
            </svg>
          </button>
          <button class="cta-btn secondary" @click="subscribeNewsletter">
            <span>Suscribirme</span>
            <span class="newsletter-icon">📧</span>
          </button>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const formData = ref({
  name: '',
  email: '',
  subject: '',
  message: ''
})

const isSubmitting = ref(false)
const activeFaq = ref(null)

const submitContactForm = async () => {
  isSubmitting.value = true
  
  // Simulación de envío
  setTimeout(() => {
    alert(`¡Gracias ${formData.value.name}! Tu mensaje ha sido enviado. Te responderemos pronto a ${formData.value.email}.`)
    
    // Resetear formulario
    formData.value = {
      name: '',
      email: '',
      subject: '',
      message: ''
    }
    
    isSubmitting.value = false
  }, 1500)
}

const toggleFaq = (index) => {
  activeFaq.value = activeFaq.value === index ? null : index
}

const goToProducts = () => {
  router.push('/products')
}

const subscribeNewsletter = () => {
  const email = prompt('Ingresa tu correo para recibir consejos de skincare:')
  if (email) {
    alert(`¡Gracias! Te has suscrito con ${email}. Recibirás nuestro primer email pronto.`)
  }
}
</script>

<style scoped>
.skincare-contact {
  font-family: 'Inter', -apple-system, sans-serif;
  color: #2d3748;
  background: #f8fafc;
}

/* Hero Section */
.contact-hero {
  background: linear-gradient(135deg, #f0fff4 0%, #e6fffa 100%);
  padding: 80px 20px 60px;
  position: relative;
  text-align: center;
}

.hero-nature-bg {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"><path d="M20,20 Q50,5 80,20 T140,20" stroke="%23c6f6d5" fill="none" stroke-width="1" opacity="0.3"/></svg>');
  background-size: 200px;
  opacity: 0.6;
}

.hero-content-wrapper {
  position: relative;
  z-index: 2;
  max-width: 800px;
  margin: 0 auto;
}

.nature-decor-contact {
  position: relative;
  width: 100px;
  height: 100px;
  margin: 0 auto 30px;
}

.nature-circle-contact {
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #c6f6d5 0%, #9ae6b4 100%);
  border-radius: 50%;
  position: relative;
}

.contact-leaf {
  position: absolute;
  font-size: 1.8rem;
  z-index: 2;
  animation: leafFloatContact 6s ease-in-out infinite;
}

.leaf-left {
  top: -15px;
  left: 35px;
  transform: rotate(-45deg);
}

.leaf-right {
  bottom: -10px;
  right: 30px;
  transform: rotate(45deg);
  animation-delay: -2s;
}

@keyframes leafFloatContact {
  0%, 100% { transform: translateY(0) rotate(var(--rotation)); }
  50% { transform: translateY(-10px) rotate(calc(var(--rotation) + 10deg)); }
}

.contact-title {
  font-size: 3rem;
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
  left: 50%;
  transform: translateX(-50%);
  width: 120px;
  height: 3px;
  background: linear-gradient(90deg, #38a169, #68d391);
  border-radius: 2px;
}

.contact-subtitle {
  font-size: 1.2rem;
  color: #4a5568;
  line-height: 1.6;
  max-width: 600px;
  margin: 0 auto;
  font-weight: 300;
}

/* Información de contacto */
.contact-info-section {
  padding: 80px 20px;
  max-width: 1200px;
  margin: 0 auto;
}

.contact-info-container {
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 50px;
}

.contact-main-info {
  display: flex;
  flex-direction: column;
  gap: 25px;
}

.info-card {
  background: white;
  border-radius: 20px;
  padding: 25px;
  border: 1px solid #e2e8f0;
  transition: all 0.3s ease;
}

.info-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.08);
}

.info-icon {
  font-size: 2.5rem;
  margin-bottom: 15px;
}

.info-title {
  font-size: 1.3rem;
  font-weight: 600;
  color: #2d3748;
  margin-bottom: 8px;
}

.info-description {
  color: #718096;
  font-size: 0.9rem;
  margin-bottom: 15px;
}

.info-value {
  color: #38a169;
  font-weight: 500;
  font-size: 1.1rem;
  text-decoration: none;
}

.info-value a {
  color: inherit;
  text-decoration: none;
}

.info-value a:hover {
  text-decoration: underline;
}

/* Formulario */
.contact-form-section {
  background: white;
  border-radius: 20px;
  padding: 40px;
  border: 1px solid #e2e8f0;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
}

.form-header {
  margin-bottom: 40px;
  text-align: center;
}

.form-title {
  font-size: 2rem;
  font-weight: 300;
  color: #2d3748;
  margin-bottom: 10px;
}

.form-subtitle {
  color: #718096;
  font-size: 1.1rem;
}

.skincare-form {
  display: flex;
  flex-direction: column;
  gap: 25px;
}

.form-group {
  display: flex;
  flex-direction: column;
}

.form-label {
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 500;
  color: #2d3748;
  margin-bottom: 10px;
  font-size: 0.95rem;
}

.label-icon {
  font-size: 1.1rem;
}

.form-input,
.form-select,
.form-textarea {
  padding: 14px 18px;
  border: 2px solid #e2e8f0;
  border-radius: 12px;
  font-size: 1rem;
  font-family: inherit;
  transition: all 0.3s ease;
  background: white;
}

.form-input:focus,
.form-select:focus,
.form-textarea:focus {
  outline: none;
  border-color: #38a169;
  box-shadow: 0 0 0 3px rgba(56, 161, 105, 0.1);
}

.form-select {
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%23718096' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 18px center;
  background-size: 16px;
}

.form-textarea {
  resize: vertical;
  min-height: 120px;
}

.submit-btn {
  background: linear-gradient(135deg, #38a169 0%, #48bb78 100%);
  color: white;
  border: none;
  border-radius: 12px;
  padding: 18px 30px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  transition: all 0.3s ease;
  margin-top: 20px;
}

.submit-btn:hover:not(:disabled) {
  transform: translateY(-3px);
  box-shadow: 0 8px 25px rgba(56, 161, 105, 0.3);
}

.submit-btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
  transform: none;
}

.btn-text {
  font-size: 1.05rem;
}

.btn-icon {
  font-size: 1.2rem;
}

.faq-section {
  padding: 80px 20px;
  background: #f8fafc;
  border-top: 1px solid #e2e8f0;
}

.faq-container {
  max-width: 800px;
  margin: 0 auto;
}

.faq-header {
  text-align: center;
  margin-bottom: 50px;
}

.faq-title {
  font-size: 2.5rem;
  font-weight: 300;
  color: #2d3748;
  margin-bottom: 15px;
}

.faq-subtitle {
  color: #718096;
  font-size: 1.1rem;
}

.faq-list {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.faq-item {
  background: white;
  border-radius: 15px;
  border: 1px solid #e2e8f0;
  overflow: hidden;
}

.faq-question {
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 25px;
  cursor: pointer;
  transition: background 0.3s ease;
}

.faq-question:hover {
  background: #f7fafc;
}

.faq-icon {
  font-size: 1.3rem;
  flex-shrink: 0;
}

.faq-question h3 {
  font-size: 1.1rem;
  font-weight: 600;
  color: #2d3748;
  flex-grow: 1;
  margin: 0;
  text-align: left;
}

.faq-toggle {
  width: 36px;
  height: 36px;
  border-radius: 10px;
  border: 2px solid #e2e8f0;
  background: white;
  color: #38a169;
  font-size: 1.2rem;
  font-weight: 600;
  cursor: pointer;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
}

.faq-toggle:hover {
  border-color: #38a169;
  background: #f0fff4;
}

.faq-answer {
  padding: 0 25px 25px 70px;
  color: #4a5568;
  line-height: 1.6;
  font-size: 1rem;
}

.faq-answer p {
  margin: 0;
}

.contact-cta {
  background: linear-gradient(135deg, #f0fff4 0%, #e6fffa 100%);
  padding: 80px 20px;
  text-align: center;
}

.cta-content {
  max-width: 600px;
  margin: 0 auto;
  position: relative;
}

.cta-nature {
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-bottom: 30px;
}

.cta-leaf {
  font-size: 2rem;
  animation: ctaLeafFloat 4s ease-in-out infinite;
}

.cta-leaf:nth-child(2) { animation-delay: 0.5s; }
.cta-leaf:nth-child(3) { animation-delay: 1s; }

@keyframes ctaLeafFloat {
  0%, 100% { transform: translateY(0) rotate(0deg); }
  50% { transform: translateY(-10px) rotate(10deg); }
}

.cta-title {
  font-size: 2.2rem;
  font-weight: 300;
  color: #2d3748;
  margin-bottom: 20px;
}

.cta-text {
  font-size: 1.1rem;
  color: #4a5568;
  margin-bottom: 40px;
  line-height: 1.6;
}

.cta-buttons {
  display: flex;
  gap: 20px;
  justify-content: center;
  flex-wrap: wrap;
}

.cta-btn {
  padding: 16px 32px;
  border-radius: 12px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 12px;
  transition: all 0.3s ease;
  border: none;
}

.cta-btn.primary {
  background: linear-gradient(135deg, #38a169 0%, #48bb78 100%);
  color: white;
}

.cta-btn.primary:hover {
  transform: translateY(-3px);
  box-shadow: 0 10px 25px rgba(56, 161, 105, 0.3);
}

.cta-btn.secondary {
  background: white;
  color: #38a169;
  border: 2px solid #38a169;
}

.cta-btn.secondary:hover {
  background: rgba(56, 161, 105, 0.1);
  transform: translateY(-3px);
}

.btn-arrow {
  width: 20px;
  height: 20px;
}

.newsletter-icon {
  font-size: 1.2rem;
}

@media (max-width: 992px) {
  .contact-info-container {
    grid-template-columns: 1fr;
    gap: 40px;
  }
  
  .contact-title {
    font-size: 2.5rem;
  }
  
  .faq-title {
    font-size: 2rem;
  }
}

@media (max-width: 768px) {
  .contact-hero {
    padding: 60px 20px 40px;
  }
  
  .contact-title {
    font-size: 2rem;
  }
  
  .contact-form-section {
    padding: 30px 25px;
  }
  
  .cta-buttons {
    flex-direction: column;
    align-items: center;
  }
  
  .cta-btn {
    width: 100%;
    max-width: 300px;
    justify-content: center;
  }
  
  .faq-question {
    padding: 20px;
  }
  
  .faq-answer {
    padding: 0 20px 20px 60px;
  }
}

@media (max-width: 576px) {
  .contact-title {
    font-size: 1.8rem;
  }
  
  .form-title {
    font-size: 1.6rem;
  }
  
  .faq-question h3 {
    font-size: 1rem;
  }
  
  .cta-title {
    font-size: 1.8rem;
  }
  
  .info-card {
    padding: 20px;
  }
}
</style>