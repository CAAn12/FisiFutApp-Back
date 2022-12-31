const db = require('../config/config');
const bcrpyt = require('bcryptjs');
const Cliente = {};

Cliente.findById = (id, result) => {
    const sql = 
    `SELECT C.id, C.email, C.name, C.lastname, 
        C.image, C.phone, C.password, 
        JSON_ARRAYAGG(
            JSON_OBJECT(
                'id', CONVERT(R.id, char),
                'name', R.name,
                'description', R.description,
                'image', R.image
            ) 
        ) AS roles
    FROM clientes AS C 
    INNER JOIN clientes_roles AS CHR
    ON CHR.id_cliente = C.id
    INNER JOIN roles AS R
    ON CHR.id_rol = R.id
    WHERE C.id = ?
    GROUP BY C.id
    `;

    db.query(
        sql,
        [id],
        (err, cliente) => {
            if (err) {
                console.log('Error: ', err);
                result(err, null);
            }
            else {
                console.log('Usuario obtenido', cliente[0]);
                result(null, cliente[0]);
            }
        }
    )
}

Cliente.findByEmail = (email, result) => {
    const sql = 
    `SELECT C.id, C.email, C.name, C.lastname, 
        C.image, C.phone, C.password, 
        JSON_ARRAYAGG(
            JSON_OBJECT(
                'id', CONVERT(R.id, char),
                'name', R.name,
                'description', R.description,
                'image', R.image
            ) 
        ) AS roles
    FROM clientes AS C 
    INNER JOIN clientes_roles AS CHR
    ON CHR.id_cliente = C.id
    INNER JOIN roles AS R
    ON CHR.id_rol = R.id
    WHERE email = ?
    GROUP BY C.id
    `;

    db.query(
        sql,
        [email],
        (err, cliente) => {
            if (err) {
                console.log('Error: ', err);
                result(err, null);
            }
            else {
                console.log('Usuario obtenido', cliente[0]);
                result(null, cliente[0]);
            }
        }
    )
}

Cliente.create = async (cliente, result) => {
    const hash = await bcrpyt.hash(cliente.password, 10); 

    const sql = 
    `INSERT INTO clientes 
    (
        name, lastname, email, phone, image, 
        password, created_at, updated_at 
    )
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;

    db.query(
        sql,
        [
            cliente.name, cliente.lastname, cliente.email, 
            cliente.phone, cliente.image, hash, new Date(), new Date()
        ],
        (err, res) => {
            if (err) {
                console.log('Error: ', err);
                result(err, null);
            }
            else {
                console.log('ID del nuevo usuario: ', res.insertId);
                result(null, res.insertId);
            }
        }
    )
}

Cliente.update = (cliente, result) => {
    const sql = 
    `UPDATE clientes SET 
    name = ?, lastname = ?, phone = ?, image = ?, updated_at = ?
    WHERE id = ?
    `;

    db.query(
        sql,
        [
            cliente.name, cliente.lastname, cliente.phone,
            cliente.image, new Date(), cliente.id
        ],
        (err, res) => {
            if(err){
                console.log('Error: ', err);
                result(err, null);
            }
            else{
                console.log('Cliente actualizado: ', cliente.id);
                result(null, cliente.id);
            }
        }
    )
}

Cliente.updateWithoutImage = (cliente, result) => {
    const sql = 
    `UPDATE clientes SET 
    name = ?, lastname = ?, phone = ?, updated_at = ?
    WHERE id = ?
    `;

    db.query(
        sql,
        [
            cliente.name, cliente.lastname, cliente.phone,
            new Date(), cliente.id
        ],
        (err, res) => {
            if(err){
                console.log('Error: ', err);
                result(err, null);
            }
            else{
                console.log('Cliente actualizado: ', cliente.id);
                result(null, cliente.id);
            }
        }
    )
}

module.exports = Cliente; 