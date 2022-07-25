CREATE TABLE usuario (
    id int AUTO_INCREMENT,
    email varchar (100) NOT NULL,
    pass varchar(100) NOT NULL,
    PRIMARY KEY(id)
);

CREATE TABLE archive(
    id int AUTO_INCREMENT,
    title varchar(50),
    descrip varchar(100),
    url varchar(500),
    PRIMARY KEY(id)
);

CREATE TABLE notice (
	id int AUTO_INCREMENT,
    title varchar(100),
    descrip varchar(1000),
    url varchar(500),
    fecha date,
    PRIMARY KEY(id)
);

CREATE TABLE events (
	id int AUTO_INCREMENT,
    feca date,
    ubicacion varchar(50),
    descrip varchar(500),
    juez varchar(100),
    category varchar(50),
    PRIMARY KEY(id)
);

CREATE TABLE album (
	id int AUTO_INCREMENT,
    title varchar(50),
    descrip varchar(100),
    PRIMARY KEY(id)
);

CREATE TABLE photo (
	id int AUTO_INCREMENT,
    filename varchar(100),
    ruta varchar(300),
    originalname varchar(100),
    mymetype varchar(100),
    size integer,
    created_at date,
    idAlbum int,
    PRIMARY KEY(id),
    FOREIGN KEY(idAlbum) REFERENCES album(id)
);

CREATE TABLE portada(
	id int auto_increment,
    imageURL varchar(100),
    public_id varchar(100),
    primary key(id)
);

CREATE TABLE slider(
	id int auto_increment,
    imageURL varchar(100),
    public_id varchar(100),
    primary key(id)
);

CREATE TABLE videos(
	id int auto_increment,
    title varchar(100),
    url varchar(500),
    primary key(id)
);




