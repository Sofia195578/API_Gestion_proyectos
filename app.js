import express from "express";
import roleRoutes from "./routes/roles.js";
import mongoose from "mongoose";
import dotenv from "dotenv";
import authRoutes from "./routes/autenticacion.js";
import projectRoutes from "./routes/proyectos.js";
import sistemaRoutes from "./routes/sistema.js";

import usuarioRoutes from "./routes/usuarios.js";
import categoriasRoutes from "./routes/categorias.js";


dotenv.config();
const app = express();

// Middlewares
app.use(express.json());

// Rutas
app.use("/api/auth", authRoutes);
app.use("/api/users", usuarioRoutes);
app.use("/api/roles", roleRoutes);
app.use("/api/categorias", categoriasRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/system", sistemaRoutes);
// Ruta de prueba
app.get('/api/test', (req, res) => {
  res.json({ 
    ok: true,
    mensaje: '¡API funcionando correctamente!',
    timestamp: new Date()
  });
});

// Conexión MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB conectado");
    app.listen(process.env.PORT || 4000, () => {
      console.log(`🚀 Servidor corriendo en puerto ${process.env.PORT || 4000}`);
      console.log(`📍 API disponible en: http://localhost:${process.env.PORT || 4000}/api/test`);
    });
  })
  .catch(err => console.error("❌ Error conectando MongoDB:", err));