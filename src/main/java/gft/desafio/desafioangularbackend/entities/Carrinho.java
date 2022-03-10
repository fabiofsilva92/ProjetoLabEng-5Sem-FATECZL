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
            name = "tb_carrinho_produtos",
            joinColumns = @JoinColumn(name = "carrinho_id"),
            inverseJoinColumns = @JoinColumn(name = "produto_id")
    )
    private List<Produto> produtos;

    private Double valorTotal;
    private String cep;

    public Carrinho() {
    }

    public Carrinho(Long id, Date data, List<Produto> produtos, Double valortotal, String cep) {
        this.id = id;
        this.data = data;
        this.produtos = produtos;
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

    public List<Produto> getProdutos() {
        return produtos;
    }

    public void setProdutos(List<Produto> produtos) {
        this.produtos = produtos;
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
                ", produtos=" + produtos +
                ", valorTotal=" + valorTotal +
                ", cep='" + cep + '\'' +
                '}';
    }
}
