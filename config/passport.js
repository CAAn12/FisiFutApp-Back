const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const Keys = require('./keys');
const Cliente = require('../models/cliente');

module.exports = (passport) => {
    let opts = {};
    opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme('jwt');
    opts.secretOrKey = Keys.secretOrKey;
    
    passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
        Cliente.findById(jwt_payload.id, (err, cliente) => {
            if(err) {
                return done(err, false);
            }
            if(cliente) {
                return done(null, cliente);
            }
            else {
                return done(null, false);
            }
        });
    }));
}