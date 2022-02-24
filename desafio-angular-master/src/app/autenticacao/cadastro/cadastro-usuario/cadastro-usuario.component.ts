import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as bcrypt from "bcryptjs";
import { CadastroUsuarioService } from 'src/app/services/cadastro-usuario.service';
import { CarrinhoService } from 'src/app/services/carrinho.service';

@Component({
  selector: 'app-cadastro-usuario',
  templateUrl: './cadastro-usuario.component.html',
  styleUrls: ['./cadastro-usuario.component.css']
})
export class CadastroUsuarioComponent implements OnInit {

  // Declaração de variaveis
  cadastroUsuarioForm !: FormGroup;
  cadastrado: any;
  erroEmail: boolean = false;
  erroCPF: boolean = false;
  erroSenhaFraca: boolean = false;
  alertSenhaForte : boolean = false;
  erroCaracterEspecial : boolean = false;
  public cep: string = "";
  
  public erroCEP: boolean = false;
  public objetoCEP: any = '';

  //Construtor
  constructor(private formBuilder: FormBuilder, private cadastroUsuarioService: CadastroUsuarioService, private carrinhoService : CarrinhoService) { }

  ngOnInit(): void {

    this.cadastrado = false;

    this.cadastroUsuarioForm = this.formBuilder.group({
      nome: ['', Validators.required],
      email: ['', Validators.required],
      cep: ['', Validators.required],
      cpf: ['', Validators.required],
      senha: ['', Validators.required]
    })

  }

  //Retorna Forms
  get f() {
    return this.cadastroUsuarioForm.controls;
  }

  //Cadastra Usuario
  cadastrarUsuario() {

    this.erroEmail = false;
    var senha = bcrypt.hashSync(this.f['senha'].value, 10);
    var email = this.f['email'].value;
    

    if (!email.includes('@') && !email.includes('.')) {
      console.log("nao tem @")
      this.erroEmail = true;
      return;
    }
    if (this.erroCPF) {
      return;
    }

    console.log(senha);

    var usuario = {
      "nome": this.f['nome'].value,
      "email": this.f['email'].value,
      "cep": this.f['cep'].value,
      "cpf": this.f['cpf'].value,
      "senha": senha,
    }
    console.log("Usuario sendo cadastrado: "+usuario)
    this.cadastroUsuarioService.cadastrarUsuario(usuario).subscribe({
      next: (data) => {
        console.log("Usuario cadastrado", data)
        this.cadastrado = true;
      },
      error: (err) => {
        console.log("Erro ao cadastrar usuario: ", err)
      }
    })
  }

  //Verifica o CPF toda vez que o campo perde o foco
  verificaCPF() {
    this.erroCPF = false;

    //Se tiver menos que 13 digitos(contando pontos e traços) já retorno erro
    if (this.f['cpf'].value.length < 13) {
      this.erroCPF = true;
      return;
    }

    //Realiza a chamada na API especificada no desafio
    this.cadastroUsuarioService.verificaCPF(this.f['cpf'].value).subscribe({
      next: (data) => {

        var valido = JSON.parse(JSON.stringify(data)).valid

        if (valido == false) {
          this.erroCPF = true;
          console.log("CPF NAO EH VALIDO")
          return;
        }

        console.log("CPF retornado: ", JSON.parse(JSON.stringify(data)))
      },
      error: (err) => {
        console.log("Erro ao verificar CPF: ", err);
        this.erroCPF = true;
      }
    });
  }

  verificaCEP() {

    this.cep = this.f['cep'].value;

    console.log("CEP digitado: "+this.cep);

    this.carrinhoService.verificaCEP(this.cep).subscribe({
      next: (data) => {
        console.log("olha o data: ", data)
        this.objetoCEP = data;
        this.objetoCEP.street = this.objetoCEP.street.split("-")[0];
        console.log("OLHA O TESTE DE RUA: " + this.objetoCEP.street)
        this.erroCEP = false;
      },
      error: (err) => {
        console.log("Olha o erro: ", err)
        this.erroCEP = true;
      }
    })
  }

  

verificaForcaSenha() {
    var numeros = /([0-9])/;
    var alfabeto = /([a-zA-Z])/;
    var chEspeciais = /([~,!,@,#,$,%,^,&,*,-,_,+,=,?,>,<])/;

    var password = this.f['senha'].value

    if (password.length < 6) {
        this.erroSenhaFraca = true;
        this.alertSenhaForte = false;
        this.erroCaracterEspecial = false;
    } else {
        if (password.match(numeros) && password.match(alfabeto) && password.match(chEspeciais)) {
            this.alertSenhaForte = true;
            this.erroSenhaFraca = false;
            this.erroCaracterEspecial = false

        } else {
          this.erroCaracterEspecial = true;
          this.alertSenhaForte = false;
          this.erroSenhaFraca = false; 
        }
    }
}


}
