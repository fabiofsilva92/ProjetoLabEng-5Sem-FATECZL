import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { AppConstants } from './app-constants';

export let browserRefresh = false;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnDestroy{
  title = 'ProjetoAngularAPI-Politico';

  subscription!: Subscription;

  constructor(private http:HttpClient,  private router: Router){
    this.subscription = router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        browserRefresh = !router.navigated;
      }
  });
  }

  ngOnDestroy(): void {
    throw new Error('Method not implemented.');
  }

  apertarBotao() {
    this.obterProdutos().subscribe({
      next: (produtos: any) => {
        console.log(produtos)
      },
      error: (err: Error) => {
        console.log(err);
      }
    })
  }

  obterProdutos(): Observable<any>{
    return this.http.get<any>(AppConstants.baseServidor+"v1/produtos");
  }
  
}
