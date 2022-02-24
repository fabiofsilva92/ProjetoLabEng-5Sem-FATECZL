import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginServiceService } from './service/login-service.service';
import { Pipe } from '@angular/core';
import { first } from 'rxjs';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  // Declaração de variáveis
  usuario = { login: '', password: '' };
  loginForm !: FormGroup;
  returnUrl!: string;
  error = '';
  sessao: any;

  // Construtor
  constructor(private loginService: LoginServiceService, private formBuilder: FormBuilder, private router: Router, private route: ActivatedRoute,) {

    console.log("Sessão: ", localStorage.getItem("sessao"))

    if (localStorage.getItem("sessao")) {
      this.sessao = localStorage.getItem("sessao");
      console.log()
    }

    console.log("current user value: ", this.loginService.currentUserValue)

    if (this.loginService.currentUserValue == null) {
      return;
    }

    if (this.loginService.currentUserValue != null) {
      this.router.navigate([''])
    }

  }

  // Retorna form
  get f() {
    return this.loginForm.controls;
  }

  // Realiza login
  public login() {

    if (this.loginForm.invalid) {
      return;
    }

    this.usuario.login = this.f['login'].value;
    this.usuario.password = this.f['password'].value;
    this.loginService.login(this.usuario);

    this.loginService.getRole(this.f['login'].value);
  }

  // OnInit
  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      login: ['', Validators.required],
      password: ['', Validators.required]
    });

    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '';


  }

}
