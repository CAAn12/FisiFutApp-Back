const Cancha = require('../models/cancha');
const storage = require('../utils/cloud_storage')

module.exports = {
    async getAll(req, res) {
        Cancha.getAll(req.params.idCliente, (err, data) => {
          if (err) {
            return res.status(501).json({
              success: false,
              message: 'Error al listar las canchas',
              error: err
            });
          }
      
          return res.status(201).json(data);
        });
    },

    async create(req, res){
        const cancha = JSON.parse(req.body.cancha);

        const files = req.files;

        if(files.length > 0){
            const path = `image_${Date.now()}`;
            const url = await storage(files[0], path);

            if (url != undefined && url != null) {
                cancha.image = url;
            }
        }

        Cancha.create(cancha, (err, id) =>{
            if (err) {
                return res.status(501).json({
                    success: false,
                    message: 'Error en la creación de la cancha',
                    error: err
                });
            }

            return res.status(201).json({
                success: true,
                message: 'La cancha se creó correctamente',
                data: `${id}`
            }); 
        });
    },

    async updateWithImage_principal(req, res) {
        const cancha = JSON.parse(req.body.cancha);
        const files = req.files;

        if (files.length > 0){
            const path = `image_${Date.now()}`;
            const url = await storage(files[0], path);

            if (url != undefined && url != null){
                cancha.image = url;
            }
        }
        
        Cancha.update_principal(cancha, (err, id) => {
            if (err) {
                return res.status(501).json({
                    success: false,
                    message: 'Error en la actualización de la cancha',
                    error: err
                });
            }

            return res.status(201).json({
                success: true,
                message: 'La cancha se actualizó correctamente',
                data: `${id}`
            });
        });
    },

    async updateWithoutImage_principal(req, res) {
        const cancha = req.body;
        console.log('ESTOY RECIBIENDO DE CANCHA: ' + JSON.stringify(cancha));
        
        Cancha.update_principal(cancha, (err, id) => {
            if (err) {
                return res.status(501).json({
                    success: false,
                    message: 'Error en la actualización de la cancha',
                    error: err
                });
            }

            return res.status(201).json({
                success: true,
                message: 'La cancha se actualizó correctamente',
                data: `${id}`
            });
        });
    },

    async delete(req, res){
        const id = req.params.id;
        Cancha.delete(id, (err, data) => {
            if (err) {
                return res.status(501).json({
                    success: false,
                    message: 'Error en la eliminación de la cancha',
                    error: err
                });
            }

            return res.status(201).json({
                success: true,
                message: 'La cancha se eliminó correctamente',
                data: `${id}`
            }); 
        });
    }
}