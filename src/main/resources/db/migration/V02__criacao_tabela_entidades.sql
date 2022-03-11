CREATE TABLE tb_produto(
    id BIGINT AUTO_INCREMENT PRIMARY KEY ,
    descricao VARCHAR(255),
    foto VARCHAR(500),
    preco_unitario DOUBLE ,
    qtd_estoque INTEGER ,
    unidade VARCHAR(10)
);
--
CREATE TABLE tb_carrinho(
    id BIGINT AUTO_INCREMENT PRIMARY KEY ,
    data DATE,
    valor_total DOUBLE
);

CREATE TABLE tb_carrinho_produtos(
    carrinho_id BIGINT,
    produto_id BIGINT,
    FOREIGN  KEY (carrinho_id) REFERENCES  tb_carrinho(id),
    FOREIGN  KEY (produto_id) REFERENCES  tb_produto(id)
);

CREATE TABLE tb_compra(
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    carrinho_id BIGINT,
    valor_total DOUBLE,
    FOREIGN KEY (carrinho_id) REFERENCES tb_carrinho(id)
);

CREATE TABLE tb_venda(
id BIGINT AUTO_INCREMENT PRIMARY KEY,
compra_id BIGINT,
usuario_id BIGINT ,
FOREIGN KEY (usuario_id) REFERENCES tb_usuario(id),
FOREIGN KEY (compra_id) REFERENCES tb_compra(id)
);


CREATE TABLE tb_resumo_produto_carrinho(
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    quantidade INT,
    produto_id BIGINT,
    FOREIGN KEY (produto_id) REFERENCES tb_produto(id)
);


