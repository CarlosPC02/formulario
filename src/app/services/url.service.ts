import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment} from 'src/enviroments/environment.prod';
import { LoginService } from './login.service';
@Injectable({
  providedIn: 'root'
})
export class UrlService {
  url = environment.apiUrl
  token = '';

  constructor(private _http: HttpClient, private loginservice: LoginService) { 
    this.token = loginservice.getToken()
  }

  header(): HttpHeaders{    
    return new HttpHeaders().set('Authorization', this.token)
  }

  createUrl(data: any): Observable<any>{
    const headers = this.header()
    return this._http.post(`${this.url}url/agregar`, data, {headers});
  }

  updateUrl(id: any, data: any): Observable<any>{
    const headers = this.header()
    return this._http.post(`${this.url}url/guardar/${id}`, data, {headers});
  }

  getUrlList(): Observable<any>{
    const headers = this.header()
    return this._http.get(`${this.url}url/listar`, {headers});
  }

  deleteUrl(id: String): Observable<any>{
    const headers = this.header()
    return this._http.delete(`${this.url}url/eliminar/${id}`, {headers});
  }
}
