-- BD PROYECTO FILMS

-- Crear la base de datos si no existe
CREATE DATABASE IF NOT EXISTS Proyecto_Films;

-- Usar la base de datos
USE Proyecto_Films;

-- TABLA DE PERSONAS
CREATE TABLE IF NOT EXISTS person(
    id_person INT(20) PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    email VARCHAR(150) NOT NULL,
    user_name VARCHAR(50) NOT NULL,
    password VARCHAR(200) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT 'Fecha y hora de creación del registro',
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP -- 'Fecha y hora de la última actualización del registro'
);

-- TABLA DE ADMINISTRADOR
CREATE TABLE IF NOT EXISTS admin(
    id_admin INT(20) PRIMARY KEY AUTO_INCREMENT,
    id_person INT(20) NOT NULL COMMENT 'ID de la persona asociada al administrador',
    CONSTRAINT FK_PERSON_ADMIN FOREIGN KEY (id_person) 
    REFERENCES person(id_person) ON DELETE CASCADE -- 'Clave foránea que referencia a la tabla person'
);

-- TABLA DE USUARIO
CREATE TABLE IF NOT EXISTS user(
    id_user INT(20) PRIMARY KEY AUTO_INCREMENT,
    id_person INT(20) NOT NULL COMMENT 'ID de la persona asociada al usuario',
    CONSTRAINT FK_PERSON_USER FOREIGN KEY (id_person) 
    REFERENCES person(id_person) ON DELETE CASCADE -- 'Clave foránea que referencia a la tabla person'
);

-- TABLA DE COMENTARIOS
CREATE TABLE IF NOT EXISTS comment(
    id_comment INT(20) PRIMARY KEY AUTO_INCREMENT,
    id_person INT(20) NOT NULL COMMENT 'ID de la persona que realiza el comentario',
    id_movie INT(10) NOT NULL COMMENT 'ID de la película relacionada con el comentario',
    comment VARCHAR(255) NOT NULL COMMENT 'Texto del comentario',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT 'Fecha y hora de creación del comentario',
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT 'Fecha y hora de la última actualización del comentario',
    CONSTRAINT FK_PERSON_COMMENT FOREIGN KEY (id_person) 
    REFERENCES person(id_person) ON DELETE CASCADE -- 'Clave foránea que referencia a la tabla person'
);

-- TABLA DE ME GUSTA
CREATE TABLE IF NOT EXISTS enjoy(
    id_enjoy INT(20) PRIMARY KEY AUTO_INCREMENT,
    id_person INT(20) NOT NULL COMMENT 'ID de la persona que indica que le gusta una película',
    id_movie INT(10) NOT NULL COMMENT 'ID de la película que recibe el "me gusta"',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT 'Fecha y hora de creación del registro',
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT 'Fecha y hora de la última actualización del registro',
    CONSTRAINT FK_PERSON_ENJOY FOREIGN KEY (id_person)
    REFERENCES person(id_person) ON DELETE CASCADE -- 'Clave foránea que referencia a la tabla person'
);

-- TABLA DE FAVORITOS
CREATE TABLE IF NOT EXISTS favorite(
    id_favorite INT(20) PRIMARY KEY AUTO_INCREMENT,
    id_person INT(20) NOT NULL COMMENT 'ID de la persona que añade una película a favoritos',
    id_movie INT(10) NOT NULL COMMENT 'ID de la película que se añade a favoritos',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT 'Fecha y hora de creación del registro',
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT 'Fecha y hora de la última actualización del registro',
    CONSTRAINT FK_PERSON_FAVORITE FOREIGN KEY (id_person)
    REFERENCES person(id_person) ON DELETE CASCADE -- 'Clave foránea que referencia a la tabla person'
);


-- TABLA API_KEY
CREATE TABLE IF NOT EXISTS api_key(
	id_api_key INT(20) PRIMARY KEY AUTO_INCREMENT,
    key_value VARCHAR(255) NOT NULL,
    descripcion VARCHAR(255),
    id_admin INT(20) NOT NULL,
    CONSTRAINT FK_ADMIN FOREIGN KEY (id_admin) 
    REFERENCES admin(id_admin) ON DELETE CASCADE
);