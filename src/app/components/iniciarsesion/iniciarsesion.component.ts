import { Component } from '@angular/core';
import { Route, Router } from '@angular/router';
import { LoginService } from 'src/app/services/Login/log.service';

@Component({
  selector: 'app-iniciarsesion',
  templateUrl: './iniciarsesion.component.html',
  styleUrls: ['./iniciarsesion.component.css']
})
export class IniciarsesionComponent {
  email:string="";
  password:string="";

  constructor(private router: Router,private login:LoginService) { }

  navegar()
  {
    this.router.navigate(['/registrar']);
    this.router.navigate(['/menu']);
  }
  abrirC()
  {
    const form = { 
      email: this.email,   
      password: this.password,
    }
    console.log( JSON.stringify(form));

    this.login.login(form).
    subscribe(
      (res) => {
        alert(res)
      },
      (err) => {
        alert(err)
      }
    );
    

  }
}
