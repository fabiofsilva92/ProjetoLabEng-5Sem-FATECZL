package gft.desafio.desafioangularbackend.entities;

import gft.desafio.desafioangularbackend.entities.autenticacao.Usuario;

import javax.persistence.*;

@Entity
@Table(name = "tb_cartao_usuario")
public class Cartao {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    private Usuario usuario;

    private String numCartao;

    public Cartao() {
    }

    public Cartao(Long id, Usuario usuario, String numCartao) {
        this.id = id;
        this.usuario = usuario;
        this.numCartao = numCartao;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Usuario getUsuario() {
        return usuario;
    }

    public void setUsuario(Usuario usuario) {
        this.usuario = usuario;
    }

    public String getNumCartao() {
        return numCartao;
    }

    public void setNumCartao(String numCartao) {
        this.numCartao = numCartao;
    }
}
