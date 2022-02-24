package gft.desafio.desafioangularbackend.entities;

import javax.persistence.*;

@Entity
@Table(name = "tb_produto")
public class Produto {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String descricao;
    private String unidade;
    private String foto;
    private Double precoUnitario;
    private Integer qtdEstoque;

    public Produto() {
    }

    public Produto(Long id, String descricao, String unidade, String foto, Double precoUnitario, Integer qtdEstoque) {
        this.id = id;
        this.descricao = descricao;
        this.unidade = unidade;
        this.foto = foto;
        this.precoUnitario = precoUnitario;
        this.qtdEstoque = qtdEstoque;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDescricao() {
        return descricao;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }

    public String getUnidade() {
        return unidade;
    }

    public void setUnidade(String unidade) {
        this.unidade = unidade;
    }

    public String getFoto() {
        return foto;
    }

    public void setFoto(String foto) {
        this.foto = foto;
    }

    public Double getPrecoUnitario() {
        return precoUnitario;
    }

    public void setPrecoUnitario(Double precoUnitario) {
        this.precoUnitario = precoUnitario;
    }

    public Integer getQtdEstoque() {
        return qtdEstoque;
    }

    public void setQtdEstoque(Integer qtdEstoque) {
        this.qtdEstoque = qtdEstoque;
    }

    @Override
    public String toString() {
        return "Produto{" +
                "id=" + id +
                ", descricao='" + descricao + '\'' +
                ", unidade='" + unidade + '\'' +
                ", foto='" + foto + '\'' +
                ", precoUnitario=" + precoUnitario +
                ", qtdEstoque=" + qtdEstoque +
                '}';
    }
}
