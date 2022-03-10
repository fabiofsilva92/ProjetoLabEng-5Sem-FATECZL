package gft.desafio.desafioangularbackend.entities;

import gft.desafio.desafioangularbackend.entities.autenticacao.Usuario;

import javax.persistence.*;

@Entity
@Table(name = "tb_venda")
public class Venda {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    private Compra compra;

    @ManyToOne
    private Usuario usuario;

    public Usuario getUsuario() {
        return usuario;
    }

    public void setUsuario(Usuario usuario) {
        this.usuario = usuario;
    }

    public Venda(Long id, Compra compra, Usuario usuario) {
        this.id = id;
        this.compra = compra;
        this.usuario = usuario;
    }

    public Venda() {
    }

    public Venda(Long id, Compra compra) {
        this.id = id;
        this.compra = compra;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Compra getCompra() {
        return compra;
    }

    public void setCompra(Compra compra) {
        this.compra = compra;
    }
}
