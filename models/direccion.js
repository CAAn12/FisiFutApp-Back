const db = require('../config/config');
const Direccion = {};

Direccion.create = (direccion, result) => {
    const sql1 = 
    `INSERT INTO direcciones
    (
        id_cancha, address, district, lat, lng, created_at, updated_at
    ) 
    VALUES (?, ?, ?, ?, ?, ?, ?);
    `;

    db.query(
        sql1,
        [
            direccion.id_cancha, direccion.address, direccion.district, 
            direccion.lat, direccion.lng, new Date(), new Date()
        ],
        (err, res) => {
            if (err) {
                console.log('Error: ', err);
                result(err, null);
            }
            else {
                console.log('ID de la dirección: ', res.insertId);
                result(null, res.insertId);
            }
        }
    )
}

module.exports = Direccion;