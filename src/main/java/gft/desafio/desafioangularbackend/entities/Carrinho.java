package gft.desafio.desafioangularbackend.entities;

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

    @ManyToMany
    @JoinTable(
            name = "tb_carrinho_produtos",
            joinColumns = @JoinColumn(name = "carrinho_id"),
            inverseJoinColumns = @JoinColumn(name = "produto_id")
    )
    private List<Produto> produtos;

    @OneToMany
    @JoinTable(
            name = "tb_carrinho_resumo",
            joinColumns = @JoinColumn(name = "carrinho_id"),
            inverseJoinColumns = @JoinColumn(name = "resumo_produto_id")
    )
    private List<ResumoProdutoCarrinho> resumoProdutos;

    private Double valorTotal;


    public Carrinho() {
    }

    public Carrinho(Long id, Date data, List<Produto> produtos, Double valortotal) {
        this.id = id;
        this.data = data;
        this.produtos = produtos;
        this.valorTotal = valortotal;
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

    public List<ResumoProdutoCarrinho> getResumoProdutos() {
        return resumoProdutos;
    }

    public void setResumoProdutos(List<ResumoProdutoCarrinho> resumoProdutos) {
        this.resumoProdutos = resumoProdutos;
    }

    @Override
    public String toString() {
        return "Carrinho{" +
                "id=" + id +
                ", data=" + data +
                ", produtos=" + produtos +
                ", valorTotal=" + valorTotal +
                 '\'' +
                '}';
    }
}
