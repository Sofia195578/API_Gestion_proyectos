import express from 'express';
import categorias from '../controllers/categorias.js';
import validarJWT from '../middlewares/validarJWT.js';

const router = express.Router();

// Todas las rutas requieren autenticación
router.use(validarJWT);

// GET /api/roles - Listar roles (todos los usuarios autenticados)
router.get('/', categorias.listarCategoria);

router.post('/', categorias.crearCategoria);
router.put('/:id', categorias.actualizarCategoria);
router.delete('/:id', categorias.eliminarCategoria);

export default router;