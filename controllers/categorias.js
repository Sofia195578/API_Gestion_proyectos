import Categoria from '../models/categorias.js';

// Listar categorias
const listarCategoria = async (req, res) => {
    try {
        const categorias = await Categoria.find({ isActive: true });
        res.json({
            ok: true,
            categorias
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Error al listar categorias',
            error: error.message
        });
    }
};

// Crear categoria
const crearCategoria = async (req, res) => {
    try {
        const { name, description } = req.body;
    
        const categoriaExistente = await Categoria.findOne({ name });
        if (categoriaExistente) {
            return res.status(400).json({
                ok: false,
                msg: 'La categoria ya existe'
            });
        }

        const nuevaCategoria = new Categoria({
            name,
            description
        });

        await nuevaCategoria.save();

        res.status(201).json({
            ok: true,
            msg: 'Categoria creada correctamente',
            categoria: nuevaCategoria
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Error al crear categoria',
            error: error.message
        });
    }
};

// Actualizar categorias
const actualizarCategoria = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description } = req.body;

    const categoriaActualizada = await Categoria.findByIdAndUpdate(
      id,
      { name, description },
      { new: true }
    );

    if (!categoriaActualizada) {
      return res.status(404).json({
        ok: false,
        msg: 'Categoria no encontrada'
      });
    }

    res.json({
      ok: true,
      msg: 'Categoria actualizada correctamente',
      categoria: categoriaActualizada
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: 'Error al actualizar categoria',
      error: error.message
    });
  }
};

//Eliminar categoria
const eliminarCategoria = async (req, res) => {
  try {
    const { id } = req.params;

    const categoriaEliminada = await Categoria.findByIdAndUpdate(
      id,
      { isActive: false },
      { new: true }
    );

    if (!categoriaEliminada) {
      return res.status(404).json({
        ok: false,
        msg: 'Categoria no encontrada'
      });
    }

    res.json({
      ok: true,
      msg: 'Categoria eliminada correctamente'
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: 'Error al eliminar categoria',
      error: error.message
    });
  }
};


export default {
    crearCategoria,
    listarCategoria,
    actualizarCategoria,
    eliminarCategoria
};