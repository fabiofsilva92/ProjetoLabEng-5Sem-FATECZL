package gft.desafio.desafioangularbackend.entities;

import gft.desafio.desafioangularbackend.entities.autenticacao.Usuario;

import javax.persistence.*;
import java.util.Date;
import java.util.List;

@Entity
@Table(name = "tb_carrinho")
public class Carrinho {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Date data;



    @OneToMany
    @JoinTable(
            name = "tb_carrinho_compras",
            joinColumns = @JoinColumn(name = "carrinho_id"),
            inverseJoinColumns = @JoinColumn(name = "resumo_compra_id")
    )
    private List<Compra> compras;

    private Double valorTotal;
    private String cep;

    public Carrinho() {
    }

    public Carrinho(Long id, Date data, List<Compra> compras, Double valortotal, String cep) {
        this.id = id;
        this.data = data;
        this.compras = compras;
        this.valorTotal = valortotal;
        this.cep = cep;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Date getData() {
        return data;
    }

    public void setData(Date data) {
        this.data = data;
    }

    public List<Compra> getCompras() {
        return compras;
    }

    public void setCompras(List<Compra> compras) {
        this.compras = compras;
    }

    public Double getValorTotal() {
        return valorTotal;
    }

    public void setValorTotal(Double valorTotal) {
        this.valorTotal = valorTotal;
    }

    public String getCep() {
        return cep;
    }

    public void setCep(String cep) {
        this.cep = cep;
    }

    @Override
    public String toString() {
        return "Carrinho{" +
                "id=" + id +
                ", data=" + data +
                ", compras=" + compras +
                ", valorTotal=" + valorTotal +
                ", cep='" + cep + '\'' +
                '}';
    }
}
