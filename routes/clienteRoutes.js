const clienteController = require('../controllers/clientesControllers');

module.exports = (app, upload) => {
    app.post('/api/clientes/create', clienteController.register);
    app.post('/api/clientes/createWithImage', upload.array('image', 1), clienteController.registerWithImage);
    app.post('/api/clientes/login', clienteController.login);

    app.put('/api/clientes/updateWithoutImage', clienteController.updateWithoutImage);
    app.put('/api/clientes/update', upload.array('image', 1), clienteController.update);
}