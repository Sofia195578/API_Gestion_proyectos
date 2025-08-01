// controllers/usuarios.js
import Usuario from '../models/Users.js';
import Role from '../models/role.js';
import { hashPassword } from '../helpers/password.js';

// GET /api/users - Listar usuarios (Solo Admin)
const listarUsuarios = async (req, res) => {
  try {
    const usuarios = await Usuario.find({ isActive: true })
      .populate('globalRole', 'name description')
      .select('-password');
    
    res.json({
      ok: true,
      usuarios
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: 'Error al obtener usuarios',
      error: error.message
    });
  }
};

// GET /api/users/profile - Perfil del usuario actual
const obtenerPerfil = async (req, res) => {
  try {
    const usuario = await Usuario.findById(req.usuario._id)
      .populate('globalRole', 'name description')
      .select('-password');

    res.json({
      ok: true,
      usuario
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: 'Error al obtener perfil',
      error: error.message
    });
  }
};

// PUT /api/users/profile - Actualizar perfil
const actualizarPerfil = async (req, res) => {
  try {
    const { firstName, lastName, phone, avatar } = req.body;
    const usuarioId = req.usuario._id;

    // Crear objeto con los campos a actualizar
    const datosActualizar = {};
    if (firstName) datosActualizar.firstName = firstName;
    if (lastName) datosActualizar.lastName = lastName;
    if (phone) datosActualizar.phone = phone;
    if (avatar) datosActualizar.avatar = avatar;

    const usuarioActualizado = await Usuario.findByIdAndUpdate(
      usuarioId,
      datosActualizar,
      { new: true }
    ).populate('globalRole', 'name description');

    res.json({
      ok: true,
      msg: 'Perfil actualizado correctamente',
      usuario: usuarioActualizado
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: 'Error al actualizar perfil',
      error: error.message
    });
  }
};

// DELETE /api/users/:id - Eliminar usuario (Solo Admin)
const eliminarUsuario = async (req, res) => {
  try {
    const { id } = req.params;

    // No permitir que el admin se elimine a sí mismo
    if (id === req.usuario._id.toString()) {
      return res.status(400).json({
        ok: false,
        msg: 'No puedes eliminarte a ti mismo'
      });
    }

    // Soft delete - marcar como inactivo
    await Usuario.findByIdAndUpdate(id, { isActive: false });

    res.json({
      ok: true,
      msg: 'Usuario eliminado correctamente'
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: 'Error al eliminar usuario',
      error: error.message
    });
  }
};

// PUT /api/users/:id/role - Cambiar rol (Solo Admin)
const cambiarRol = async (req, res) => {
  try {
    const { id } = req.params;
    const { roleId } = req.body;

    // Verificar que el rol existe
    const rol = await Role.findById(roleId);
    if (!rol) {
      return res.status(400).json({
        ok: false,
        msg: 'El rol especificado no existe'
      });
    }

    // No permitir que el admin cambie su propio rol
    if (id === req.usuario._id.toString()) {
      return res.status(400).json({
        ok: false,
        msg: 'No puedes cambiar tu propio rol'
      });
    }

    const usuarioActualizado = await Usuario.findByIdAndUpdate(
      id,
      { globalRole: roleId },
      { new: true }
    ).populate('globalRole', 'name description');

    res.json({
      ok: true,
      msg: 'Rol actualizado correctamente',
      usuario: usuarioActualizado
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: 'Error al cambiar rol',
      error: error.message
    });
  }
};

export default {
  listarUsuarios,
  obtenerPerfil,
  actualizarPerfil,
  eliminarUsuario,
  cambiarRol
};
