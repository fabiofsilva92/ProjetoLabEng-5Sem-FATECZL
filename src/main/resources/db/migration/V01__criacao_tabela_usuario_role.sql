CREATE TABLE tb_role(
id BIGINT AUTO_INCREMENT PRIMARY KEY ,
nome VARCHAR(255) NOT NULL
);

CREATE TABLE tb_usuario(
id BIGINT AUTO_INCREMENT PRIMARY KEY ,
nome VARCHAR(255) NOT NULL,
email VARCHAR(255) NOT NULL,
cpf VARCHAR(255) NOT NULL,
senha VARCHAR(255) NOT NULL,
role_id BIGINT,
FOREIGN KEY (role_id) REFERENCES tb_role(id)
);

INSERT INTO tb_role
(nome)
values
('ADMIN'),
('USUARIO');

INSERT INTO tb_usuario
(nome, email, cpf, senha, role_id)
values
('ADMINISTRADOR DO SISTEMA','admin@gmail.com', '875.804.650-00', '$2a$12$QWqpbKZ4030NyWav.zhWFOSkjptsr5.RyIqiCCyDJOKIwudBZiitO', '1'),
('Usuario DO SISTEMA','usuario@gmail.com', '322.292.820-77','$2a$12$QWqpbKZ4030NyWav.zhWFOSkjptsr5.RyIqiCCyDJOKIwudBZiitO', '2');