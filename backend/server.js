const express = require("express");
const cors = require("cors");
const path = require("path");
const app = express();
const PORT = 3001;

// Configuración
app.use(cors());
app.use(express.json());
app.use('/imagenes', express.static(path.join(__dirname, 'public/imagenes')));

// Base de datos CORRECTA
const productos = [
  {
    id: 1,
    name: "Kit Rescate Sensible",
    price: 15.50,
    image: "http://localhost:3001/imagenes/skin1.jpg",
    description: "Kit especial para piel sensible con ingredientes naturales",
    category: "kits",
    stock: 10
  },
  {
    id: 2,
    name: "Crema Hidratante Intensa",
    price: 22.99,
    image: "http://localhost:3001/imagenes/skin2.jpg",
    description: "Hidratación profunda por 24 horas",
    category: "cremas",
    stock: 15
  },
  {
    id: 3,
    name: "Serum Vitamina C",
    price: 29.99,
    image: "http://localhost:3001/imagenes/skin3.avif",
    description: "Antioxidante para un brillo juvenil",
    category: "serums",
    stock: 8
  },
  {
    id: 4,
    name: "Limpiador Facial Suave",
    price: 18.50,
    image: "http://localhost:3001/imagenes/skin4.avif",
    description: "Limpia sin resecar la piel",
    category: "limpieza",
    stock: 20
  }
];

// RUTAS
app.get("/api/productos", (req, res) => {
  res.json(productos);
});

app.get("/api/productos/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const producto = productos.find(p => p.id === id);
  
  if (producto) {
    res.json(producto);
  } else {
    res.status(404).json({ error: "Producto no encontrado" });
  }
});

// Servir imágenes estáticas
app.use('/imagenes', express.static('public/imagenes'));

// Ruta de prueba
app.get("/", (req, res) => {
  res.json({ 
    message: "API de DINOSIS funcionando",
    endpoints: [
      "/api/productos",
      "/api/productos/:id"
    ]
  });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log("====================================");
  console.log("🚀 API DINOSIS iniciada correctamente");
  console.log(`📡 URL: http://localhost:${PORT}`);
  console.log(`📦 Productos: http://localhost:${PORT}/api/productos`);
  console.log("====================================");
});