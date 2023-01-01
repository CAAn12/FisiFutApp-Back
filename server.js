const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const logger = require('morgan');
const cors = require('cors');
const passport = require('passport');
const port = process.env.PORT || 3000;
const multer = require('multer');

const clientesRoutes = require('./routes/clienteRoutes');
const canchasRoutes = require('./routes/canchaRoutes');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));
app.use(cors());
app.use(passport.initialize());
app.use(passport.session());
require('./config/passport')(passport);
app.disable('x-powered-by');
app.set('port', port);

const upload = multer({
    storage: multer.memoryStorage()
});

clientesRoutes(app, upload);
canchasRoutes(app, upload);

server.listen(3000, '192.168.1.8' || 'localhost', function() {
    console.log('Puerto: ' + port);
    console.log('PID: ' + process.pid);
});

app.get('/', (req, res) => {
    res.send('Ruta raíz del BackEnd');
});

app.get('/test', (req, res) => {
    res.send('Ruta test');
});

app.use((err, req, res, next) => {
    console.log(err);
    res.status(err.status || 500).send(err.stack);
})