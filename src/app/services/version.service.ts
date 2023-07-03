import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/enviroments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class VersionService {

  url = environment.apiUrl


  constructor(private _http: HttpClient) { }

  createVersion(data: any): Observable<any>{
    return this._http.post(`${this.url}version/agregar`, data);
  }

  updateVersion(id: String, data: any): Observable<any>{
    return this._http.put(`${this.url}version/guardar/${id}`, data);
  }

  getVersionList(): Observable<any>{
    return this._http.get(`${this.url}version/listar`);
  }

  deleteVersion(id: String): Observable<any>{
    return this._http.delete(`${this.url}version/eliminar/${id}`);
  }
}
