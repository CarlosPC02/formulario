import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/enviroments/environment.prod';
import { LoginService } from './login.service';
@Injectable({
  providedIn: 'root'
})
export class VersionService {
  url = environment.apiUrl
  token = '';

  constructor(private _http: HttpClient, private loginservice: LoginService) { 
    this.token = loginservice.getToken()
  }

  header(): HttpHeaders{    
    return new HttpHeaders().set('Authorization', this.token)
  }

  createVersion(data: any): Observable<any>{
    const headers = this.header()
    return this._http.post(`${this.url}version/agregar`, data, {headers});
  }

  updateVersion(id: String, data: any): Observable<any>{
    const headers = this.header()
    return this._http.post(`${this.url}version/guardar/${id}`, data, {headers});
  }

  getVersionList(): Observable<any>{
    const headers = this.header()
    return this._http.get(`${this.url}version/listar`, {headers});
  }

  deleteVersion(id: String): Observable<any>{
    const headers = this.header()
    return this._http.delete(`${this.url}version/eliminar/${id}`, {headers});
  }
}
