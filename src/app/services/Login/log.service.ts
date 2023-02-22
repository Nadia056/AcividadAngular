import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, map, Observable, retry, Subject, tap, throwError } from 'rxjs';
import { environment } from 'src/environments/viroment';
import { login } from 'src/app/Models/login.model';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  urlapi = environment.URL_API;
  private _refresh$ = new Subject<void>();
  private obtenerpersonas = this.urlapi + "/clients"
  private logg = this.urlapi + "/login"
  private obtenerpersona = this.urlapi + "/clients/{id}"
  private modificarPersona = this.urlapi + "/clients/{id}"
  private eliminarPersona = this.urlapi + "/clients/{id}"
  private handleError(error: HttpErrorResponse) {
    if (error.status === 400) {
      console.error('An error occurred:', error.error);
    } else {
      console.error('El backend devolvió el código ${error.status}, el cuerpo era:', error.error)
    }
    return throwError(() => new Error('Algo malo sucedió; por favor, inténtelo de nuevo más tarde.'));
  }

  constructor(private http: HttpClient) { }
  login(login:login): Observable<boolean> {
    return this.http.post<{ token: string }>(this.logg,login)
      .pipe(
        tap(res => {
          if (res.token) {
            localStorage.setItem('token', res.token); // Guardamos el token en el localStorage
          }
        }),
        map(res => !!res.token) // Devolvemos un booleano que indica si el usuario se ha autenticado o no
      );
  }

  logout(): void {
    localStorage.removeItem('token'); // Eliminamos el token del localStorage al cerrar sesión
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token'); // Comprobamos si el usuario ha iniciado sesión
  }
}