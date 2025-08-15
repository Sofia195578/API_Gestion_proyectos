import express from "express";
import roleRoutes from "./routes/roles.js";
import mongoose from "mongoose";
import dotenv from "dotenv";
import authRoutes from "./routes/autenticacion.js";
import projectRoutes from "./routes/proyectos.js";
import sistemaRoutes from "./routes/sistema.js";
import usuarioRoutes from "./routes/usuarios.js";
import categoriasRoutes from "./routes/categorias.js";
import tareasRoutes from "./routes/tareas.js";
import comentariosRoutes from "./routes/comentarios.js";
import estadosRoutes from "./routes/estados.js";
import iaRoutes from "./routes/inteligenciaArtificial.js";
import { initializeStates } from "./utils/stateInitializer.js"; 

dotenv.config();
const app = express();

// Middlewares
app.use(express.json());

// Rutas
app.use("/api/auth", authRoutes);
app.use("/api/users", usuarioRoutes);
app.use("/api/roles", roleRoutes);
app.use("/api/categorias", categoriasRoutes);
app.use("/api/system", sistemaRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/tasks", tareasRoutes);
app.use("/api/comments", comentariosRoutes);
app.use("/api/states", estadosRoutes);
app.use("/api/ai", iaRoutes);

async function startServer() {
  try {
    // 1. Conectar a MongoDB
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB conectado");

    // 2. Inicializar estados (usando tu stateInitializer)
    await initializeStates(); 

    // 3. Iniciar servidor Express
    const PORT = process.env.PORT || 4000;
    app.listen(PORT, () => {
      console.log(`🚀 Servidor corriendo en puerto ${PORT}`);
    });

  } catch (err) {
    console.error("❌ Error al iniciar la aplicación:", err);
    process.exit(1);
  }
}


startServer();