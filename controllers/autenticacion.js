import Usuario from '../models/users.js';
import generarJWT from '../helpers/generarJWT.js';
import jwt from 'jsonwebtoken';
import { isValidEmail } from '../helpers/validaremail.js';
import { hashPassword, comparePassword } from '../helpers/password.js';

// Registro
const registrar = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    if (!firstName || !lastName || !email || !password) {
      return res.status(400).json({ msg: "Todos los campos son obligatorios" });
    }

    if (!isValidEmail(email)) {
      return res.status(400).json({ msg: "Formato de correo inválido" });
    }

    const usuarioExistente = await Usuario.findOne({ email });
    if (usuarioExistente) {
      return res.status(400).json({ msg: "El correo ya está registrado" });
    }

    const hashedPassword = await hashPassword(password);

    const nuevoUsuario = new Usuario({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      isEmailVerified: false
    });

    await nuevoUsuario.save();

    res.status(201).json({ msg: "Usuario registrado correctamente" });
  } catch (error) {
    res.status(500).json({ msg: "Error al registrar usuario", error: error.message });
  }
};

// Login
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const usuario = await Usuario.findOne({ email });
    if (!usuario) {
      return res.status(400).json({ msg: 'Usuario no encontrado' });
    }

    const validPassword = await comparePassword(password, usuario.password);
    if (!validPassword) {
      return res.status(400).json({ msg: 'Contraseña incorrecta' });
    }

    usuario.lastLogin = new Date();
    await usuario.save();

    const token = await generarJWT(usuario._id);

    res.json({
      usuario: {
        id: usuario._id,
        email: usuario.email,
        firstName: usuario.firstName,
        lastName: usuario.lastName
      },
      token
    });
  } catch (err) {
    res.status(500).json({ msg: 'Error al iniciar sesión', error: err.message });
  }
};

// Refresh token
const refresh = async (req, res) => {
  const { token } = req.body;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const nuevoToken = await generarJWT(decoded.id);
    res.json({ token: nuevoToken });
  } catch (err) {
    res.status(401).json({ msg: "Token inválido o expirado" });
  }
};

// Logout
const logout = async (req, res) => {
  res.json({ msg: 'Sesión cerrada correctamente' });
};

// Recuperación de contraseña (placeholder)
const forgotPassword = async (req, res) => {
  const { email } = req.body;
  res.json({ msg: `Correo de recuperación enviado a ${email}` });
};

// Restablecer contraseña (placeholder)
const resetPassword = async (req, res) => {
  const { token, newPassword } = req.body;
  res.json({ msg: 'Contraseña restablecida correctamente' });
};

export default {
  registrar,
  login,
  refresh,
  logout,
  forgotPassword,
  resetPassword
};
