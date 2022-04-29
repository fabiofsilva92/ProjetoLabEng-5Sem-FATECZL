package gft.desafio.desafioangularbackend.dto;

public class RegistroUsuarioDTO {
    private String id;
    private String nome;
    private String email;
    private String cpf;
    private String senha;
    private String cep;
    private String rua;
    private String numero;
    private String bairro;
    private String cidade;
    private Boolean is_Active;
    private Long roleID;

    public RegistroUsuarioDTO(String id, String nome, String email, String cpf, String senha, String cep, String rua, String numero, String bairro, String cidade, Boolean is_Active, Long roleID) {
        this.id = id;
        this.nome = nome;
        this.email = email;
        this.cpf = cpf;
        this.senha = senha;
        this.cep = cep;
        this.rua = rua;
        this.numero = numero;
        this.bairro = bairro;
        this.cidade = cidade;
        this.is_Active = is_Active;
        this.roleID = roleID;
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

    public String getCep() {
        return cep;
    }

    public void setCep(String cep) {
        this.cep = cep;
    }

    public String getRua() {
        return rua;
    }

    public void setRua(String rua) {
        this.rua = rua;
    }

    public String getNumero() {
        return numero;
    }

    public void setNumero(String numero) {
        this.numero = numero;
    }

    public String getBairro() {
        return bairro;
    }

    public void setBairro(String bairro) {
        this.bairro = bairro;
    }

    public String getCidade() {
        return cidade;
    }

    public void setCidade(String cidade) {
        this.cidade = cidade;
    }

    public Boolean getIs_Active() {
        return is_Active;
    }

    public void setIs_Active(Boolean is_Active) {
        this.is_Active = is_Active;
    }

    public Long getRoleID() {
        return roleID;
    }

    public void setRoleID(Long roleID) {
        this.roleID = roleID;
    }
}
