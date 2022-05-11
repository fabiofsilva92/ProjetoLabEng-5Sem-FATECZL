package gft.desafio.desafioangularbackend.entities.autenticacao;


import com.sun.istack.NotNull;
import gft.desafio.desafioangularbackend.entities.Endereco;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import javax.validation.constraints.NotEmpty;


@Entity
@Table(name = "tb_usuario", uniqueConstraints = @UniqueConstraint(columnNames = {"id", "cpf"}))
public class Usuario {

    @Id
    @GeneratedValue(generator = "system-uuid")
    @GenericGenerator(name = "system-uuid", strategy = "uuid")
    private String id;
    @NotEmpty
    private String nome;
    private String email;
    @NotNull
    private String cpf;
    @NotNull
    private String senha;

    @Embedded
    private Endereco endereco;

    @ManyToOne
    private Role role;

    private Boolean isActive;

    public Usuario() {
    }

    @Override
    public String toString() {
        return "Usuario{" +
                "id=" + id +
                ", nome='" + nome + '\'' +
                ", email='" + email + '\'' +
                ", cpf='" + cpf + '\'' +
                ", senha='" + senha + '\'' +
                ", endereco=" + endereco +
                ", role=" + role +
                ", isActive=" + isActive +
                '}';
    }

    public Usuario(String id, String nome, String email, String cpf, String senha, Endereco endereco, Role role, Boolean isActive) {
        this.id = id;
        this.nome = nome;
        this.email = email;
        this.cpf = cpf;
        this.senha = senha;

        this.endereco = endereco;
        this.role = role;
        this.isActive = isActive;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
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

    public Endereco getEndereco() {
        return endereco;
    }

    public void setEndereco(Endereco endereco) {
        this.endereco = endereco;
    }

    public Role getRole() {
        return role;
    }

    public void setRole(Role role) {
        this.role = role;
    }

    public Boolean getActive() {
        return isActive;
    }

    public void setActive(Boolean active) {
        isActive = active;
    }
}
