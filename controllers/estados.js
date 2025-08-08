import State from '../models/states.js';

// GET /api/states - Listar todos los estados
const listarEstados = async (req, res) => {
    try {
        const estados = await State.find({ isActive: true })
            .sort({ order: 1, name: 1 });

        res.json({
            ok: true,
            estados
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Error al listar estados',
            error: error.message
        });
    }
};

// POST /api/states - Crear estado (solo para admin)
const crearEstado = async (req, res) => {
    try {
        const { name, description, color, order, isFinal } = req.body;

        if (!name) {
            return res.status(400).json({
                ok: false,
                msg: 'El nombre es obligatorio'
            });
        }

        const nuevoEstado = new State({
            name,
            description,
            color,
            order: order || 0,
            isFinal: isFinal || false
        });

        await nuevoEstado.save();

        res.status(201).json({
            ok: true,
            msg: 'Estado creado exitosamente',
            estado: nuevoEstado
        });
    } catch (error) {
        if (error.code === 11000) {
            return res.status(400).json({
                ok: false,
                msg: 'Ya existe un estado con ese nombre'
            });
        }
        
        res.status(500).json({
            ok: false,
            msg: 'Error al crear estado',
            error: error.message
        });
    }
};

export default {
    listarEstados,
    crearEstado
};