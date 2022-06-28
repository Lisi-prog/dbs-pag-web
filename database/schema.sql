CREATE TABLE User (
    id int AUTO_INCREMENT,
    email varchar (100) NOT NULL,
    pass varchar(100) NOT NULL,
    PRIMARY KEY(id)
);

CREATE TABLE Archive(
    id int AUTO_INCREMENT,
    title varchar(50),
    descrip varchar(100),
    url varchar(500),
    PRIMARY KEY(id)
);

CREATE TABLE Notice (
	id int AUTO_INCREMENT,
    title varchar(100),
    descrip varchar(1000),
    url varchar(500),
    fecha date,
    PRIMARY KEY(id)
);

CREATE TABLE Events (
	id int AUTO_INCREMENT,
    feca date,
    ubicacion varchar(50),
    descrip varchar(500),
    juez varchar(100),
    category varchar(50),
    PRIMARY KEY(id)
);

CREATE TABLE Album (
	id int AUTO_INCREMENT,
    title varchar(50),
    descrip varchar(100),
    PRIMARY KEY(id)
);

CREATE TABLE Photo (
	id int AUTO_INCREMENT,
    imageURL varchar(100),
    public_id varchar(100),
    idAlbum int,
    PRIMARY KEY(id),
    FOREIGN KEY(idAlbum) REFERENCES album(id)
);

CREATE TABLE Portada(
	id int auto_increment,
    imageURL varchar(100),
    public_id varchar(100),
    primary key(id)
);

CREATE TABLE Slider(
	id int auto_increment,
    imageURL varchar(100),
    public_id varchar(100),
    primary key(id)
);

CREATE TABLE Videos(
	id int auto_increment,
    imageURL varchar(500),
    primary key(id)
);




