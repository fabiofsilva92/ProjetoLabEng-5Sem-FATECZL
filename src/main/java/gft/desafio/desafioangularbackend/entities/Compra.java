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

    private Double valorTotal;

    public Compra() {
    }

    public Compra(Long id, Carrinho carrinho,  Double valorTotal) {
        this.id = id;
        this.carrinho = carrinho;

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
                ", valorTotal=" + valorTotal +
                '}';
    }
}
