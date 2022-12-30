USE db_fisifutapp;

CREATE TABLE clientes (
	id BIGINT PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR (255) NOT NULL UNIQUE,
    name VARCHAR (100) NOT NULL,
    lastname VARCHAR (100) NOT NULL,
    phone VARCHAR (9) NOT NULL UNIQUE,
    image VARCHAR (255) NULL,
    password VARCHAR (100) NOT NULL,
    created_at TIMESTAMP (0) NOT NULL,
    updated_at TIMESTAMP (0) NOT NULL
);