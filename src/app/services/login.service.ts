import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment} from 'src/enviroments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class LoginService {


  url = environment.apiUrl


  constructor(private _http: HttpClient) { }

  login(data: any): Observable<any>{
    return this._http.post(`${this.url}login`, data);
  }

  logout(): void {
    localStorage.removeItem('token');
    //localStorage.removeItem('name'); // Agrega esta línea para eliminar el nombre de usuario
  }


  isAuthenticated(): boolean {
   const token = localStorage.getItem('token');
   return !!token; // Devuelve true si existe un token almacenado, de lo contrario, devuelve false
  }

  getToken(): string {
    return localStorage.getItem('token') || '';
  }
}

