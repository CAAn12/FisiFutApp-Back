const db = require('../config/config');
const Cancha = {};

Cancha.getAll = (idCliente, result) => {
    const sql = `
      SELECT canchas.* FROM canchas
      JOIN clientes ON canchas.id_gestor = clientes.id
      JOIN clientes_roles ON clientes.id = clientes_roles.id_cliente
      JOIN roles ON clientes_roles.id_rol = roles.id
      WHERE roles.name = 'Gestor de canchas' AND clientes.id = ?
    `;
  
    db.query(sql, [idCliente], (err, data) => {
      if (err) {
        console.log('Error: ', err);
        result(err, null);
      } else {
        console.log('Canchas asociadas: ', data);
        result(null, data);
      }
    });
}

Cancha.create = (cancha, result) => {
    const sql1 = 
    `INSERT INTO canchas 
    (
        id_gestor, name, category, size, price_per_hour, id_direccion, 
        created_at, updated_at
    ) 
    VALUES (?, ?, ?, ?, ?, NULL, ?, ?);
    `;

    const sql2 = 
    `INSERT INTO suscripciones 
    (
        id_tipo_suscripcion, id_cancha, start, duration_months, end, status
    )
    VALUES (1, LAST_INSERT_ID(), NOW(), NULL, NULL, 1);   
    `;

    const sql3 = 
    `INSERT INTO canchas_imagenes 
    (
        id_cancha, image
    )
    VALUES (LAST_INSERT_ID(), ?);   
    `;

    db.query(
        sql1,
        [
            cancha.id_gestor, cancha.name, cancha.category, cancha.size, cancha.price_per_hour,   
            new Date(), new Date()
        ],
        (err, res) => {
            if (err) {
                console.log('Error: ', err);
                result(err, null);
            }
            else {
                console.log('ID de la cancha: ', res.insertId);
                db.query(
                    sql2,
                    (err, res) => {
                        if(err){
                            console.log('Error: ', err);
                            result(err, null);
                        }
                        else{
                            db.query(
                                sql3,
                                [cancha.image],
                                (err, res) => {
                                    if(err){
                                        console.log('Error: ', err);
                                        result(err, null);
                                    }
                                    else{
                                        result(null, res.insertId);
                                    }
                                }
                            )
                        }
                    }
                )
            }
        }
    )
}

module.exports = Cancha;