
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, retry, Subject, tap, throwError } from 'rxjs';
import { PersonaM } from 'src/app/Models/persona.model';
import { environment } from 'src/environments/viroment';




@Injectable({ providedIn: 'root' })


export class PersonaService {
  urlapi = environment.URL_API;
  private _refresh$ = new Subject<void>();
  private obtenerpersonas = this.urlapi + "/clients"
  private activarPersona = this.urlapi + "/active/{id}"
  private crearPersona = this.urlapi + "/clients"
  private obtenerpersona = this.urlapi + "/clients/{id}"
  private modificarPersona = this.urlapi + "/clients/{id}"
  private eliminarPersona = this.urlapi + "/clients/{id}"



  private handleError(error: HttpErrorResponse) {
    if (error.status === 400) {
      console.error('An error occurred:', error.error);
    } else {
      console.error('El backend devolvió el código ${error.status}, el cuerpo era:', error.error)
    }
    return throwError(() => new Error('Algo malo sucedió; por favor, inténtelo de nuevo más tarde.'));
  }

  constructor(private http: HttpClient) { }

  get refresh$() { return this._refresh$ }

  getPersona(): Observable<PersonaM[]> {
    return this.http.get<PersonaM[]>(this.obtenerpersonas)
    .pipe(retry(3), catchError(this.handleError))
  }

  addPersona(persona: PersonaM): Observable<PersonaM> {
    return this.http.post<PersonaM>(this.crearPersona, persona)
      .pipe(catchError(this.handleError))
      .pipe(tap(() => {
        this._refresh$.next();
      }));
  }
  activePersona(id: number): Observable<PersonaM> {
    return this.http.post<PersonaM>(this.activarPersona + id, id)
      .pipe(catchError(this.handleError))
      .pipe(tap(() => {
        this._refresh$.next();
      }));
  }

  getOnePersona(id: number): Observable<PersonaM> {
    return this.http.get<PersonaM>(this.obtenerpersona + id)
      .pipe(retry(3), catchError(this.handleError));
  }

  updatePersona(persona: PersonaM): Observable<PersonaM> {
    return this.http.put<PersonaM>(this.modificarPersona + persona.id, persona)
      .pipe(catchError(this.handleError))
      .pipe(tap(() => {
        this._refresh$.next();
      }));
  }

  deletePersona(persona: PersonaM): Observable<PersonaM> {
    return this.http.delete<PersonaM>(this.eliminarPersona + persona.id)
      .pipe(retry(3), catchError(this.handleError));
  }

}
