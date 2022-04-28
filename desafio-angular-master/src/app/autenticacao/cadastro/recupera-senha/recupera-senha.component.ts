import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CadastroUsuarioService } from 'src/app/services/cadastro-usuario.service';

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


  constructor(private formBuilder: FormBuilder, private activateRoute: ActivatedRoute, private cadastroUsuarioService: CadastroUsuarioService) { }

  ngOnInit(): void {

    this.activateRoute.queryParams.subscribe(params => {
      console.log("params: "+params)
      console.log("id: "+params['id'])
    })

    
    
    this.loginRecuperaForm = this.formBuilder.group({
      email:['', Validators.required]
    })

    this.loginNovaSenha = this.formBuilder.group({
      novaSenha:['', Validators.required],
      novaSenhaRepetida:['', Validators.required],
    })
    
  }

  

  get s(){
    return this.loginRecuperaForm.controls;
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

    var isEquals = (this.s['novaSenha'].value == this.s['novaSenhaRepetida'].value)
    
    if(!isEquals){
      this.erroRepitaSenha = true;
    }   
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

}
