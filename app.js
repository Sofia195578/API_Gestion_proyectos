import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

import authRoutes from "./routes/autenticacion.js";

dotenv.config();
const app = express();

// Middlewares
app.use(express.json());

// Rutas
app.use("/api/auth", authRoutes);

// Conexión MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB conectado");
    app.listen(process.env.PORT || 4000, () =>
      console.log(`Servidor corriendo en puerto ${process.env.PORT || 4000}`)
    );
  })
  .catch(err => console.error(err));
