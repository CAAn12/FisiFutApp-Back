const canchasController = require('../controllers/canchasController');
const passport = require('passport');

module.exports = (app, upload) => {
    app.post('/api/canchas/create', passport.authenticate('jwt', {session: false}), 
        upload.array('image', 1), canchasController.create);
    app.get('/api/canchas/getAll/:idCliente', passport.authenticate('jwt', {session: false}), 
        canchasController.getAll);
    app.delete('/api/canchas/delete/:id', passport.authenticate('jwt', {session: false}), 
        canchasController.delete);

    app.put('/api/canchas/updateWithImage_principal', passport.authenticate('jwt', {session: false}), 
        upload.array('image', 1), canchasController.updateWithImage_principal);
    app.put('/api/canchas/updateWithoutImage_principal', passport.authenticate('jwt', {session: false}),
        canchasController.updateWithoutImage_principal);
}