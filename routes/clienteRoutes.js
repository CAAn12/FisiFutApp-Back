const clienteController = require('../controllers/clientesControllers');
const passport = require('passport');

module.exports = (app, upload) => {
    app.post('/api/clientes/create', clienteController.register);
    app.post('/api/clientes/createWithImage', upload.array('image', 1), clienteController.registerWithImage);
    app.post('/api/clientes/login', clienteController.login);

    app.put('/api/clientes/updateWithoutImage', passport.authenticate('jwt', {session: false}),
        clienteController.updateWithoutImage);
    app.put('/api/clientes/update', passport.authenticate('jwt', {session: false}), 
        upload.array('image', 1), clienteController.update);
}