import express from 'express';
import categoriasController from '../controllers/categorias.js';
import rolesController from '../controllers/roles.js';
import estadosController from '../controllers/estados.js';
import validarJWT from '../middlewares/validarJWT.js';

const router = express.Router();

// Aplicar middleware de validación JWT a todas las rutas
router.use(validarJWT);

// Rutas de Categorías
router.get('/categories', categoriasController.listarCategorias);
router.post('/categories', categoriasController.crearCategoria);
router.get('/categories/:id', categoriasController.obtenerCategoria);
router.put('/categories/:id', categoriasController.actualizarCategoria);
router.delete('/categories/:id', categoriasController.eliminarCategoria);

// Rutas de Roles
router.get('/roles', rolesController.listarRoles);
router.post('/roles', rolesController.crearRol);

// Rutas de Estados
router.get('/states', estadosController.listarEstados);
router.post('/states', estadosController.crearEstado);

export default router;