package gft.desafio.desafioangularbackend.entities;

import javax.persistence.*;

@Entity
@Table(name = "tb_compra")
public class Compra {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    private Carrinho carrinho;

    private Integer quantidade;
    private Double valorTotal;

    public Compra() {
    }

    public Compra(Long id, Carrinho carrinho, Integer quantidade, Double valorTotal) {
        this.id = id;
        this.carrinho = carrinho;
        this.quantidade = quantidade;
        this.valorTotal = valorTotal;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Carrinho getCarrinho() {
        return this.carrinho;
    }

    public void setCarrinho(Carrinho carrinho) {
        this.carrinho = carrinho;
    }

    public Integer getQuantidade() {
        return quantidade;
    }

    public void setQuantidade(Integer quantidade) {
        this.quantidade = quantidade;
    }

    public Double getValorTotal() {
        return valorTotal;
    }

    public void setValorTotal(Double valorTotal) {
        this.valorTotal = valorTotal;
    }

    @Override
    public String toString() {
        return "Compra{" +
                "id=" + id +
                ", carrinho=" + carrinho +
                ", quantidade=" + quantidade +
                ", valorTotal=" + valorTotal +
                '}';
    }
}
