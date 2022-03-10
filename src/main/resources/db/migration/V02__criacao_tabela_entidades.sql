CREATE TABLE tb_produto(
id BIGINT AUTO_INCREMENT PRIMARY KEY ,
descricao VARCHAR(255),
foto VARCHAR(500),
preco_unitario DOUBLE ,
qtd_estoque INTEGER ,
unidade VARCHAR(10)
);
--
--CREATE TABLE tb_carrinho(
--id BIGINT AUTO_INCREMENT PRIMARY KEY ,
--data DATE,
--valor_total DOUBLE ,
--cep VARCHAR(255),
--);
--
--CREATE TABLE tb_resumo_compra(
--id BIGINT AUTO_INCREMENT PRIMARY KEY ,
--produto_id BIGINT,
--quantidade INTEGER ,
--valor_total DOUBLE ,
--FOREIGN KEY (produto_id) REFERENCES tb_produto(id)
--);
--
--CREATE TABLE tb_venda(
--id BIGINT AUTO_INCREMENT PRIMARY KEY,
--carrinho_id BIGINT,
--usuario_id BIGINT ,
--FOREIGN KEY (usuario_id) REFERENCES tb_usuario(id),
--FOREIGN KEY (carrinho_id) REFERENCES tb_carrinho(id)
--);