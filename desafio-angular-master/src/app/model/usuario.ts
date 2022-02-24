export class Usuario {

    public id!: string;
    public nome!: string;
    public email!: string;
    public cpf !: string;
    public senha!: string;
    public role!: string;

    constructor(id: string, nome: string, email: string, cpf: string, senha: string, role: string) {

        this.id = id;
        this.nome = nome;
        this.email = email;
        this.cpf = cpf;
        this.senha = senha;
        this.role = role;

    }

    

  

}
