import express from 'express';
import proyectosController from '../controllers/proyectos.js';
import validarJWT from '../middlewares/validarJWT.js';

const router = express.Router();

// Aplicar middleware de validación JWT a todas las rutas
router.use(validarJWT);

// GET /api/projects - Listar proyectos del usuario
router.get('/', proyectosController.listarProyectos);

// POST /api/projects - Crear proyecto
router.post('/', proyectosController.crearProyecto);

// GET /api/projects/:id - Obtener proyecto específico
router.get('/:id', proyectosController.obtenerProyecto);

// PUT /api/projects/:id - Actualizar proyecto
router.put('/:id', proyectosController.actualizarProyecto);

// DELETE /api/projects/:id - Eliminar proyecto
router.delete('/:id', proyectosController.eliminarProyecto);

// POST /api/projects/:id/members - Agregar miembro al proyecto
router.post('/:id/members', proyectosController.agregarMiembro);

// DELETE /api/projects/:id/members/:userId - Remover miembro
router.delete('/:id/members/:userId', proyectosController.removerMiembro);

// PUT /api/projects/:id/status - Cambiar estado del proyecto
router.put('/:id/status', proyectosController.cambiarEstado);

export default router;