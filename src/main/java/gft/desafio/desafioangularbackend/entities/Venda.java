package gft.desafio.desafioangularbackend.entities;

import gft.desafio.desafioangularbackend.entities.autenticacao.Usuario;
import gft.desafio.desafioangularbackend.enums.StatusPedido;
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

    @Enumerated(EnumType.STRING)
    private StatusPedido status;

    public Venda() {
    }

    public Venda(String strId, Compra compra, Usuario usuario, StatusPedido status) {
        this.strId = strId;
        this.compra = compra;
        this.usuario = usuario;
        this.status = status;
    }

    public String getStrId() {
        return strId;
    }

    public void setStrId(String strId) {
        this.strId = strId;
    }

    public Compra getCompra() {
        return compra;
    }

    public void setCompra(Compra compra) {
        this.compra = compra;
    }

    public Usuario getUsuario() {
        return usuario;
    }

    public void setUsuario(Usuario usuario) {
        this.usuario = usuario;
    }

    public StatusPedido getStatus() {
        return status;
    }

    public void setStatus(StatusPedido status) {
        this.status = status;
    }
}
