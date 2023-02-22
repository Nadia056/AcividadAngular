
import { Component, ViewChild } from '@angular/core';
import { Route } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PersonaService } from 'src/app/services/Personas/persona.service';
import { PersonaM } from 'src/app/Models/persona.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.component.html',
  styleUrls: ['./registrar.component.css']
})
export class RegistrarComponent {

  email: string= '';
  name: string= '';
  phone: string=  '';
  password: string= '';
  password_confirmation: string= '';
  role: string= 'user';
  active: boolean= false;
  activation_code = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
  
  @ViewChild('contenido') contenido: any;

  constructor(private modal: NgbModal,private persona:PersonaService ,private activatedRoute: ActivatedRoute,) { 
   
  }
  
  abrirC() {
   const form = {
    
      email: this.email,
      name: this.name,
      phone: this.phone,
      password: this.password,
      password_confirmation: this.password_confirmation,
      role: this.role,
      active: this.active,
      activation_code: this.activation_code,
    }
    console.log(form);
    this.persona.addPersona(form).subscribe(
      (res) => {
        alert("Successful");
      },
      (err) => {
        alert(err);
      }
    );

    this.modal.open(this.contenido);
    
 
    


  }


}
