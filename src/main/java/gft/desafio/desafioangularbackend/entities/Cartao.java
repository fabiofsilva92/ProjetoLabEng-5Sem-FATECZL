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

    private String nomeTitular;

    private String cpfTitular;

    private String validade;

    private String codSeguranca;

    private String numCartao;

    public Cartao() {
    }

    public Cartao(Long id, Usuario usuario, String nomeTitular, String cpfTitular, String validade, String codSeguranca, String numCartao) {
        this.id = id;
        this.usuario = usuario;
        this.nomeTitular = nomeTitular;
        this.cpfTitular = cpfTitular;
        this.validade = validade;
        this.codSeguranca = codSeguranca;
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

    public String getNomeTitular() {
        return nomeTitular;
    }

    public void setNomeTitular(String nomeTitular) {
        this.nomeTitular = nomeTitular;
    }

    public String getCpfTitular() {
        return cpfTitular;
    }

    public void setCpfTitular(String cpfTitular) {
        this.cpfTitular = cpfTitular;
    }

    public String getValidade() {
        return validade;
    }

    public void setValidade(String validade) {
        this.validade = validade;
    }

    public String getCodSeguranca() {
        return codSeguranca;
    }

    public void setCodSeguranca(String codSeguranca) {
        this.codSeguranca = codSeguranca;
    }

    public String getNumCartao() {
        return numCartao;
    }

    public void setNumCartao(String numCartao) {
        this.numCartao = numCartao;
    }
}
