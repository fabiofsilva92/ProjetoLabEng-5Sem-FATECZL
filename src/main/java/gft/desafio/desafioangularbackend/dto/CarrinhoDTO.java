package gft.desafio.desafioangularbackend.dto;

import gft.desafio.desafioangularbackend.entities.Produto;

import java.util.Date;
import java.util.List;

public class CarrinhoDTO {

    private Long id;
    private Date data;
//    private List<Produto> produtos;
    private Double valorTotal;

    public CarrinhoDTO(Long id, Date data /*,List<Produto> produtos*/, Double valorTotal) {
        this.id = id;
        this.data = data;
//        this.produtos = produtos;
        this.valorTotal = valorTotal;
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

//    public List<Produto> getProdutos() {
//        return produtos;
//    }

//    public void setProdutos(List<Produto> produtos) {
//        this.produtos = produtos;
//    }

    public Double getValorTotal() {
        return valorTotal;
    }

    public void setValorTotal(Double valorTotal) {
        this.valorTotal = valorTotal;
    }
}
