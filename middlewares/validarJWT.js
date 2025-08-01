import jwt from "jsonwebtoken";
import Usuario from "../models/Users.js";

const validarJWT = async (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    return res.status(401).json({ msg: "No hay token en la petición" });
  }

  try {
    const { id } = jwt.verify(token, process.env.JWT_SECRET);
    const usuario = await Usuario.findById(id);

    if (!usuario) {
      return res.status(401).json({ msg: "Token inválido - usuario no existe" });
    }

    req.usuario = usuario;
    next();
  } catch (error) {
    return res.status(401).json({ msg: "Token no válido", error: error.message });
  }
};

export default validarJWT;