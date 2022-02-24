import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginServiceService } from '../login/service/login-service.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  

  constructor(private loginService: LoginServiceService, private router:Router) {}

  ngOnInit(): void {
    this.loginService.logout();

    console.info(this.loginService.currentUserValue)

    if(this.loginService.currentUserValue == null){
      this.router.navigate(['/login'])
    }
  }

}
