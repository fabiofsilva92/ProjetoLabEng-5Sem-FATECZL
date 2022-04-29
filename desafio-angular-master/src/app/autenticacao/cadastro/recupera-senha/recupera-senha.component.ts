import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CadastroUsuarioService } from 'src/app/services/cadastro-usuario.service';
import * as bcrypt from "bcryptjs";

@Component({
  selector: 'app-recupera-senha',
  templateUrl: './recupera-senha.component.html',
  styleUrls: ['./recupera-senha.component.css']
})
export class RecuperaSenhaComponent implements OnInit {

  loginRecuperaForm !: FormGroup;
  loginNovaSenha!: FormGroup;
  trocaDeSenhaSolicitada: boolean = false;
  erroSenhaFraca: boolean = false;
  erroRepitaSenha: boolean = false;
  alertSenhaForte: boolean = false;
  alertAtualizado: boolean = false;
  erroCaracterEspecial: boolean = false;
  idParaTrocaDeSenha: any;
  usuarioParaTroca: any;

  constructor(private formBuilder: FormBuilder, private activateRoute: ActivatedRoute, private cadastroUsuarioService: CadastroUsuarioService) { }

  ngOnInit(): void {

    this.activateRoute.queryParams.subscribe(params => {
      console.log("params: "+params)
      console.log("id: "+params['id'])
      this.idParaTrocaDeSenha = params['id'];
    })

    console.log("AAA TESTE")
    
    this.loginRecuperaForm = this.formBuilder.group({
      email:['', Validators.required]
    })

    this.loginNovaSenha = this.formBuilder.group({
      novaSenha:['', Validators.required],
      novaSenhaRepetida:['', Validators.required],
    })

    if(this.idParaTrocaDeSenha != null){
      this.trocaDeSenhaSolicitada = true
      this.cadastroUsuarioService.buscarUsuarioPorId(this.idParaTrocaDeSenha).subscribe({
        next: (data) => {
          console.log("Olha o usuario: "+JSON.stringify(data))
          this.usuarioParaTroca = JSON.parse(JSON.stringify(data));
        }
        ,error: (err => {
          console.log("Erro ao buscar usuario por id: ",err)
        })
      })
    }
    
  }

  get f(){
    return this.loginNovaSenha.controls;
  }

  get s(){
    return this.loginRecuperaForm.controls;
  }

  trocarSenha(){
    if(this.erroRepitaSenha || this.erroSenhaFraca || this.erroCaracterEspecial){
      console.log("Erro ainda na paagina")
    }else{
      //TODO
      var novaSenha = this.f['novaSenha'].value;

      var novaSenhaEncryptada = bcrypt.hashSync(novaSenha, 10);

      this.usuarioParaTroca.senha = novaSenhaEncryptada;

      this.cadastroUsuarioService.atualizarUsuarioRecupera(this.usuarioParaTroca).subscribe({
        next: (data) => {
          console.log("Resultado: " + JSON.stringify(data));
        },
        error: (err) => {
          console.log("Erro ao solicitar troca de senha: " + err)
        }
      })
      
      console.log("TROCA SENHA:   " + this.usuarioParaTroca.senha + " Nova senha: "+novaSenhaEncryptada);


    }
  }

  solicitarRecuperacaoSenha(){
    this.cadastroUsuarioService.recuperaSenha(this.s["email"].value).subscribe({
      next: (data) => {
        console.log("Solicitação de recuperação bem sucedida: ",data)
      },
      error: (err) => {
        console.log("Olha o erro que deu ao solicitar recuperação de senha: ",err)
      }
    });
  }

  solicitaTrocaSenha(){
    this.trocaDeSenhaSolicitada = true;
  }

  verificaIgualdadeSenha(){ 

    var isEquals = (this.f['novaSenha'].value == this.f['novaSenhaRepetida'].value)
    
    if(!isEquals){
      this.erroRepitaSenha = true;
    } else {
      this.erroRepitaSenha = false;
    }  
  }

  verificaForcaSenha() { 
    var numeros = /([0-9])/;
    var alfabeto = /([a-zA-Z])/;
    var chEspeciais = /([~,!,@,#,$,%,^,&,*,-,_,+,=,?,>,<])/;

    var password = this.f['novaSenha'].value

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
