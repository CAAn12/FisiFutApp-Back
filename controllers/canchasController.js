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
    } 
}