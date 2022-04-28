import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CadastroUsuarioService } from 'src/app/services/cadastro-usuario.service';
import { CarrinhoService } from 'src/app/services/carrinho.service';
import { GerenciamentoUsuarioService } from 'src/app/services/gerenciamento-usuario.service';
import * as bcrypt from "bcryptjs";

@Component({
  selector: 'app-gerenciamento-usuario',
  templateUrl: './gerenciamento-usuario.component.html',
  styleUrls: ['./gerenciamento-usuario.component.css']
})
export class GerenciamentoUsuarioComponent implements OnInit {

  public role: any;

  public usuario: any;

  isAlterandoSenha: boolean = false;
  cadastroUsuarioForm !: FormGroup;
  cadastroSenhaForm !: FormGroup;
  cadastrado: any;
  erroEmail: boolean = false;
  erroCPF: boolean = false;
  erroSenhaFraca: boolean = false;
  erroRepitaSenha: boolean = false;
  alertSenhaForte: boolean = false;
  alertAtualizado: boolean = false;
  erroCaracterEspecial: boolean = false;
  erroNovaSenhaVazia: boolean = false;
  erroNovaSenhaRepetidaVazia: boolean = false;
  erroSenhaAntigaVazia: boolean = false;
  public cep: string = "";

  public erroCEP: boolean = false;
  public objetoCEP: any = '';
  erroSenhaNaoConfere: boolean = false;

  constructor(private gerenciamentoUserService: GerenciamentoUsuarioService, private formBuilder: FormBuilder,
              private carrinhoService: CarrinhoService, private cadastroUsuarioService: CadastroUsuarioService) { }

  ngOnInit(): void {

    this.cadastroUsuarioForm = this.formBuilder.group({
      nome: ['', Validators.required],
      email: ['', Validators.required],
      cep: ['', Validators.required],
      rua: ['', Validators.required],
      numero: ['', Validators.required],
      bairro: ['', Validators.required],
      cidade: ['', Validators.required],
      cpf: ['', Validators.required],
      senha: ['', Validators.required]
    })

    this.cadastroSenhaForm = this.formBuilder.group({
      senhaAntiga: ['', Validators.required],
      novaSenha: ['', Validators.required],
      novaSenhaRepetida: ['', Validators.required],
    })

    this.gerenciamentoUserService.retornarUsuario().subscribe({
      next: (data) => {
        if (data) {
          this.usuario = data;
          console.log("OLHA O USUARIO DA CHAMADA " + JSON.stringify(this.usuario));
          this.setUserInfo();
        }
      },
      error: (err) => {
        console.log("Erro na busca do usuario");
      }
    })

  }
  //Retorna Forms
  get f() {
    return this.cadastroUsuarioForm.controls;
  }

  get s(){
    return this.cadastroSenhaForm.controls;
  }

  setUserInfo() {
    this.f['nome'].setValue(this.usuario.nome);
    this.f['email'].setValue(this.usuario.email);
    this.f['cpf'].setValue(this.usuario.cpf);
    this.f['cep'].setValue(this.usuario.endereco.cep);
    this.f['rua'].setValue(this.usuario.endereco.rua);
    this.f['numero'].setValue(this.usuario.endereco.numero);
    this.f['bairro'].setValue(this.usuario.endereco.bairro);
    this.f['cidade'].setValue(this.usuario.endereco.cidade);
    this.verificaCEP();
  }

  verificaForcaSenha() { 
    var numeros = /([0-9])/;
    var alfabeto = /([a-zA-Z])/;
    var chEspeciais = /([~,!,@,#,$,%,^,&,*,-,_,+,=,?,>,<])/;

    var password = this.s['novaSenha'].value

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

  atualizarCadastro() {

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
      "id": this.usuario.id,
      "nome": this.f['nome'].value,
      "email": this.f['email'].value,
      "cep": this.f['cep'].value,
      "rua" : this.f['rua'].value,
      "numero" : this.f['numero'].value,
      "bairro" : this.f['bairro'].value,
      "cidade" : this.f['cidade'].value,
      "cpf": this.f['cpf'].value,
      "senha": this.usuario.senha,
      "is_Active": true,
      "roleID": this.usuario.role.id,
    }


    this.cadastroUsuarioService.atualizarUsuario(usuario).subscribe({
      next: (data) =>{
        console.log("Usuario com informações atualizadas", data);
        this.alertAtualizado = true;

      },
      error: (err) =>{
        console.log("Deu erro ao atualizar usuario: ", err)
      }
    });
   }

  atualizarSenha(){
    if(this.s['novaSenha'].value == ""){
      this.erroNovaSenhaVazia = true;
      
    }else{
      this.erroNovaSenhaVazia = false;
    }
    if(this.s['novaSenhaRepetida'].value == ""){
      this.erroNovaSenhaRepetidaVazia = true;
    }else{
      this.erroNovaSenhaRepetidaVazia = false;
    }
    if(this.s['senhaAntiga'].value == ""){
      this.erroSenhaAntigaVazia = true;
    }else{
      this.erroSenhaAntigaVazia = false;
    }
    var isSenhaCorreta = this.verificaBCrypt();
    if(this.alertSenhaForte && !this.erroRepitaSenha && isSenhaCorreta){
      var novaSenha = bcrypt.hashSync(this.s['novaSenha'].value, 10);
      console.log("OLHA A NOVA SENHA: ",novaSenha)
      this.erroSenhaNaoConfere = false;
      this.usuario.senha = novaSenha;
      this.cadastroUsuarioService.atualizarUsuario(this.usuario).subscribe({
        next: (data) =>{
          console.log("Usuario com senha atualizada", data);
          this.alertAtualizado = true;

        },
        error: (err) =>{
          console.log("Deu erro ao atualizar senha: ", err)
        }
      });
    }
    else{
      this.erroSenhaNaoConfere = true;
    }
  }

  verificaBCrypt(){
    var senhaAntiga = this.s['senhaAntiga'].value
    var senhaDoBanco = this.usuario.senha;

    console.log("Deu certo o bcrypt? : " ,bcrypt.compareSync(senhaAntiga, senhaDoBanco))

    return bcrypt.compareSync(senhaAntiga, senhaDoBanco);

    
  }

  alterarSenha(){
    this.isAlterandoSenha = true
  }

  verificaIgualdadeSenha(){ 

    var isEquals = (this.s['novaSenha'].value == this.s['novaSenhaRepetida'].value)
    
    if(!isEquals){
      this.erroRepitaSenha = true;
    }   
  }

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
        this.f["rua"].setValue(this.objetoCEP.street);
        this.f["bairro"].setValue(this.objetoCEP.neighborhood);
        this.f["cidade"].setValue(this.objetoCEP.city);
      },
      error: (err) => {
        console.log("Olha o erro: ", err)
        this.erroCEP = true;
      }
    })
  }

}
