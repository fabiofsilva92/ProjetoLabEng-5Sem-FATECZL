package gft.desafio.desafioangularbackend.entities;

import java.util.List;

public class ResumoProdutoCarrinho {

    private Produto produto;
    private Integer quantidade;

    public ResumoProdutoCarrinho(Produto produto, Integer quantidade) {
        this.produto = produto;
        this.quantidade = quantidade;
    }

    public Produto getProduto() {
        return produto;
    }

    public void setProduto(Produto produto) {
        this.produto = produto;
    }

    public Integer getQuantidade() {
        return quantidade;
    }

    public void setQuantidade(Integer quantidade) {
        this.quantidade = quantidade;
    }

    @Override
    public String toString() {
        return "ResumoProdutoCarrinho{" +
                "produto=" + produto +
                ", quantidade=" + quantidade +
                '}';
    }
}
