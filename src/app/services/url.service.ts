import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment} from 'src/enviroments/environment.prod';
@Injectable({
  providedIn: 'root'
})
export class UrlService {
  url = environment.apiUrl


  constructor(private _http: HttpClient) { }

  createUrl(data: any): Observable<any>{
    return this._http.post(`${this.url}url/agregar`, data);
  }

  updateUrl(id: any, data: any): Observable<any>{
    return this._http.put(`${this.url}url/guardar/${id}`, data);
  }

  getUrlList(): Observable<any>{
    return this._http.get(`${this.url}url/listar`);
  }

  deleteUrl(id: String): Observable<any>{
    return this._http.delete(`${this.url}url/eliminar/${id}`);
  }
}
