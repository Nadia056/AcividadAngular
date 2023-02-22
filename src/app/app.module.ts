
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'; // <-- Import FormsModule
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PersonasComponent } from './components/personas/personas.component';
import { BikesComponent } from './components/bikes/bikes.component';
import { CarsComponent } from './components/cars/cars.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { RegistrarComponent } from './components/registrar/registrar.component';
import { IniciarsesionComponent } from './components/iniciarsesion/iniciarsesion.component';
import { EditarpersonaComponent } from './components/editarpersona/editarpersona.component';
import { EditarbikerComponent } from './components/editarbiker/editarbiker.component';
import { EditarcarComponent } from './components/editarcar/editarcar.component';
import { EliminarpersonaComponent } from './components/eliminarpersona/eliminarpersona.component';
import { EliminarbikerComponent } from './components/eliminarbiker/eliminarbiker.component';
import { EliminarcarComponent } from './components/eliminarcar/eliminarcar.component';
import { MenuComponent } from './components/menu/menu.component';
import { PersonaService } from './services/Personas/persona.service';
import { HttpClientModule } from '@angular/common/http';



@NgModule({
  declarations: [
    AppComponent,
    PersonasComponent,
    BikesComponent,
    CarsComponent,
    NotfoundComponent,
    RegistrarComponent,
    IniciarsesionComponent,
    EditarpersonaComponent,
    EditarbikerComponent,
    EditarcarComponent,
    EliminarpersonaComponent,
    EliminarbikerComponent,
    EliminarcarComponent,
    MenuComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [PersonaService],
  bootstrap: [AppComponent]
})
export class AppModule { }
