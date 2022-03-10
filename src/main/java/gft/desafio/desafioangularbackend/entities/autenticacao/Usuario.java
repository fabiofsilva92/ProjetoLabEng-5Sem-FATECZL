package gft.desafio.desafioangularbackend.entities.autenticacao;


import com.sun.istack.NotNull;
import gft.desafio.desafioangularbackend.entities.Endereco;

import javax.persistence.*;
import javax.validation.constraints.NotEmpty;


@Entity
@Table(name = "tb_usuario", uniqueConstraints = @UniqueConstraint(columnNames = {"id", "cpf"}))
public class Usuario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @NotEmpty
    private String nome;
    private String email;
    @NotNull
    private String cpf;
    @NotNull
    private String senha;

    @Embedded
    private Endereco enderecos;

    @ManyToOne
    private Role role;

    public Usuario() {
    }

    public Usuario(Long id, String nome, String email, String cpf, String senha, Endereco enderecos, Role role) {
        this.id = id;
        this.nome = nome;
        this.email = email;
        this.cpf = cpf;
        this.senha = senha;
        this.enderecos = enderecos;
        this.role = role;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getCpf() {
        return cpf;
    }

    public void setCpf(String cpf) {
        this.cpf = cpf;
    }

    public String getSenha() {
        return senha;
    }

    public void setSenha(String senha) {
        this.senha = senha;
    }

    public Endereco getEnderecos() {
        return enderecos;
    }

    public void setEnderecos(Endereco enderecos) {
        this.enderecos = enderecos;
    }

    public Role getRole() {
        return role;
    }

    public void setRole(Role role) {
        this.role = role;
    }
}
