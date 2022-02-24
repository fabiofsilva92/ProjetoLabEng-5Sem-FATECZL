import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-gerenciamento-usuario',
  templateUrl: './gerenciamento-usuario.component.html',
  styleUrls: ['./gerenciamento-usuario.component.css']
})
export class GerenciamentoUsuarioComponent implements OnInit {

  public role: any;

  constructor() { }

  ngOnInit(): void {
  }

}
