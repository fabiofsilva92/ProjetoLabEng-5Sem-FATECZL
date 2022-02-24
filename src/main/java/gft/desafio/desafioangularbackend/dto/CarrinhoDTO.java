package gft.desafio.desafioangularbackend.dto;

import gft.desafio.desafioangularbackend.entities.Compra;

import java.util.Date;
import java.util.List;

public class CarrinhoDTO {

    private Long id;
    private Date data;
    private List<Compra> compras;
    private Double valorTotal;

    public CarrinhoDTO(Long id, Date data, List<Compra> compras, Double valorTotal) {
        this.id = id;
        this.data = data;
        this.compras = compras;
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
}
