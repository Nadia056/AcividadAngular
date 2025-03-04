import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, retry, Subject, tap, throwError } from 'rxjs';
import { CarM } from 'src/app/Models/car.model';
import { environment } from 'src/environments/enviroment.development';

@Injectable({
  providedIn: 'root'
})
export class CarService {
  urlapi = environment.URL_API;
  private _refresh$ = new Subject<void>();
  private obtenercar = this.urlapi + "/"
  private crearCar = this.urlapi + "/"
  private obtenercarid = this.urlapi + "/"
  private modificarCar = this.urlapi + "/"
  private eliminarCar = this.urlapi + "/"

  



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

  getCar(): Observable<CarM[]> {
    return this.http.get<CarM[]>(this.obtenercar)
    .pipe(retry(3), catchError(this.handleError))
  }

  addCar(car: CarM): Observable<CarM> {
    return this.http.post<CarM>(this.crearCar, car)
      .pipe(catchError(this.handleError))
      .pipe(tap(() => {
        this._refresh$.next();
      }));
  }

  getOneCar(id: number): Observable<CarM> {
    return this.http.get<CarM>(this.obtenercarid + id)
      .pipe(retry(3), catchError(this.handleError));
  }

  updateCar(car:CarM ): Observable<CarM> {
    return this.http.put<CarM>(this.modificarCar + car.id, car)
      .pipe(catchError(this.handleError))
      .pipe(tap(() => {
        this._refresh$.next();
      }));
  }

  deleteCar(car:CarM): Observable<CarM> {
    return this.http.delete<CarM>(this.eliminarCar + car.id)
      .pipe(retry(3), catchError(this.handleError));
  }

}