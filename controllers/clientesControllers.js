const Cliente = require('../models/cliente');
const Rol = require('../models/rol');
const bcrpyt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../config/keys');
const storage = require('../utils/cloud_storage');
const { updateWithoutImage } = require('../models/cliente');

module.exports = {
    login(req, res){
        const email = req.body.email;
        const password = req.body.password;

        Cliente.findByEmail(email, async (err, miCliente) =>{
            if (err) {
                return res.status(501).json({
                    success: false,
                    message: 'Error en el registro',
                    error: err
                });
            }

            if (!miCliente) {
                return res.status(401).json({
                    success: false,
                    message: 'El email no fue encontrado'
                });
            }

            const isPasswordValid = await bcrpyt.compare(password, miCliente.password);

            if (isPasswordValid){
                const token = jwt.sign({id: miCliente.id, email: miCliente.email}, keys.secretOrKey, {});
                
                const data = {
                    id: miCliente.id,
                    name: miCliente.name,
                    lastname: miCliente.lastname,
                    email: miCliente.email,
                    phone: miCliente.phone,
                    image: miCliente.image,
                    session_token: `JWT ${token}`,
                    roles: JSON.parse(miCliente.roles)
                }

                return res.status(201).json({
                    success: true,
                    message: 'El usuario fue autenticado',
                    data: data
                }); 
            }
            else{
                return res.status(401).json({
                    success: false,
                    message: 'El password es incorrecto'
                });
            }
        });
    },

    register(req, res){
        const cliente = req.body;
        Cliente.create(cliente, (err, data) =>{
            if (err) {
                return res.status(501).json({
                    success: false,
                    message: 'Error en el registro',
                    error: err
                });
            }
            return res.status(201).json({
                success: true,
                message: 'Registro exitoso',
                data: data
            }); 
        });
    },

    async registerWithImage(req, res){
        const cliente = JSON.parse(req.body.cliente);

        const files = req.files;

        if(files.length > 0){
            const path = `image_${Date.now()}`;
            const url = await storage(files[0], path);

            if (url != undefined && url != null) {
                cliente.image = url;
            }
        }

        Cliente.create(cliente, (err, data) =>{
            if (err) {
                return res.status(501).json({
                    success: false,
                    message: 'Error en el registro',
                    error: err
                });
            }

            cliente.id = `${data}`;
            const token = jwt.sign({id: cliente.id, email: cliente.email}, keys.secretOrKey, {});
            cliente.session_token = `JWT ${token}`;
            Rol.create(cliente.id, 2, (err, data) => {
                if (err) {
                    return res.status(501).json({
                        success: false,
                        message: 'Error en el registro del rol',
                        error: err
                    });
                }

                return res.status(201).json({
                    success: true,
                    message: 'Registro exitoso',
                    data: cliente
                }); 
            });
        });
    },

    async update(req, res){
        const cliente = JSON.parse(req.body.cliente);
        const files = req.files;

        if (files.length > 0) {
            const path = `image_${Date.now()}`;
            const url = await storage(files[0], path);

            if (url != undefined && url != null) {
                cliente.image = url;
            }
        }

        Cliente.update(cliente, (err, data) => {
            if(err){
                return res.status(501).json({
                    success: false,
                    message: 'Hubo un error en la actualización del cliente',
                    error: err
                });
            }

            return res.status(201).json({
                success: true,
                message: 'El cliente se actualizó correctamente',
                data: cliente
            });
        });
    },

    async updateWithoutImage(req, res){
        const cliente = req.body;
        console.log('Cliente: ', cliente);

        Cliente.updateWithoutImage(cliente, (err, data) => {
            if(err){
                return res.status(501).json({
                    success: false,
                    message: 'Hubo un error en la actualización del cliente',
                    error: err
                });
            }

            return res.status(201).json({
                success: true,
                message: 'El cliente se actualizó correctamente',
                data: cliente
            });
        });
    }
}