CREATE TABLE tb_role(
id BIGINT AUTO_INCREMENT PRIMARY KEY ,
nome VARCHAR(255) NOT NULL
);

CREATE TABLE tb_usuario(
id VARCHAR (255) NOT NULL PRIMARY KEY,
nome VARCHAR(255) NOT NULL,
email VARCHAR(255) NOT NULL,
cpf VARCHAR(255) NOT NULL,
senha VARCHAR(255) NOT NULL,
bairro VARCHAR(255),
cep VARCHAR(255),
cidade VARCHAR(255),
numero INTEGER ,
rua VARCHAR(255),
is_Active BOOLEAN,
role_id BIGINT,
FOREIGN KEY (role_id) REFERENCES tb_role(id)
);

INSERT INTO tb_role
(nome)
values
('ADMIN'),
('USUARIO');

INSERT INTO tb_usuario
(id, nome, email, cpf, senha, bairro, cep, cidade, numero, rua,  role_id)
values
('777','ADMINISTRADOR DO SISTEMA','admin@gmail.com', '875.804.650-00', '$2a$12$QWqpbKZ4030NyWav.zhWFOSkjptsr5.RyIqiCCyDJOKIwudBZiitO', 'Parque Paulistano', '08080000', 'São Paulo', 841, 1, '1'),
('888','Usuario DO SISTEMA','usuario@gmail.com', '322.292.820-77', '$2a$12$QWqpbKZ4030NyWav.zhWFOSkjptsr5.RyIqiCCyDJOKIwudBZiitO', 'Parque Paulistano', '08080000', 'São Paulo', 841, 1,'2');