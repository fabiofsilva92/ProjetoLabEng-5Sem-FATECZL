package gft.desafio.desafioangularbackend.entities;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "tb_resumo_produto_carrinho")
public class ResumoProdutoCarrinho {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne
    private Produto produto;
    private Integer quantidade;



    public ResumoProdutoCarrinho(Long id, Produto produto, Integer quantidade) {
        this.id = id;
        this.produto = produto;
        this.quantidade = quantidade;
    }

    public ResumoProdutoCarrinho() {

    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
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
