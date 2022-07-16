create table usuarios (
nome_usuario varchar(30) not null primary key, 
senha varchar(20) not null);

insert into usuarios (nome_usuario, senha) values ('jorge' , '1234'), ('joao', '1234');