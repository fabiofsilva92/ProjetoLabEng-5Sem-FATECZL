package gft.desafio.desafioangularbackend.entities;

import gft.desafio.desafioangularbackend.entities.autenticacao.Usuario;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;

@Entity
@Table(name = "tb_venda")
public class Venda {

    @Id
    @GeneratedValue(generator = "system-uuid")
    @GenericGenerator(name = "system-uuid", strategy = "uuid")
    private String strId;

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

    public Venda(String strId, Compra compra, Usuario usuario) {
        this.strId = strId;
        this.compra = compra;
        this.usuario = usuario;
    }

    public Venda() {
    }

    public Venda(String strId, Compra compra) {
        this.strId = strId;
        this.compra = compra;
    }

    public String getStrId() {
        return strId;
    }

    public void setStrId(String id) {
        this.strId = id;
    }

    public Compra getCompra() {
        return compra;
    }

    public void setCompra(Compra compra) {
        this.compra = compra;
    }
}
