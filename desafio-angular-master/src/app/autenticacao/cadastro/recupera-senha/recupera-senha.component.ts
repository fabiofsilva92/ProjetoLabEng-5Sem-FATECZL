import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-recupera-senha',
  templateUrl: './recupera-senha.component.html',
  styleUrls: ['./recupera-senha.component.css']
})
export class RecuperaSenhaComponent implements OnInit {

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.trocaDeSenhaSolicitada = false;
    
  }

  loginRecuperaForm !: FormGroup;
  trocaDeSenhaSolicitada: boolean = false;
  erroSenhaFraca: boolean = false;
  erroRepitaSenha: boolean = false;
  alertSenhaForte: boolean = false;
  alertAtualizado: boolean = false;
  erroCaracterEspecial: boolean = false;

  get s(){
    return this.loginRecuperaForm.controls;
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
