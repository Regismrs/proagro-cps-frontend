import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ComunicadoService {

  private apiUrl:string = 'http://localhost:8000/'
  private token:string = 'cfe31cb1e210df9941fd98fff94ecfaf284e09ca'
  private httpOptions = {
    headers : new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Token ${this.token}`})
  }

  constructor(private http: HttpClient) { }

  addComunicado( body:any ):Observable<any> {
    return this.http.post<any>(`${this.apiUrl}comunicado/`, body, this.httpOptions)
  }

  deleteComunicado(id:number):Observable<any> {
    return this.http.delete(`${this.apiUrl}comunicado/${id}`, this.httpOptions)
  }

  getComunicado(id:number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}comunicado/${id}`, this.httpOptions)
  }

  getComunicados(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}comunicados/`, this.httpOptions)
  }

  getComunicadosDivergentes(lavoura_data_colheita:Date, evento:number, id:number = 0): Observable<any> {
    if (!id) id = 0

    return this.http.get<any>(
      `${this.apiUrl}comunicados/?lavoura_data_colheita=${lavoura_data_colheita}&evento__ne=${evento}&id__ne=${id}`, 
      this.httpOptions)
  }

  getComunicadosFiltroDtColheita(gte:string = '1900-01-01', lte:string = '9999-12-31') {
    const url =`${this.apiUrl}comunicados/?data_colheita__gte=${gte}&data_colheita__lte=${lte}`
    console.warn("URL: " + url)
    return this.http.get<any>(url, this.httpOptions)
  }

  getComunicadosFiltroDtCadastro(gte:Date = new Date(0), lte:Date = new Date()) {
    const url =`${this.apiUrl}comunicados/?data_cadastro__gte=${gte}&data_cadastro__lte=${lte}`
    console.warn("URL: " + url)
    return this.http.get<any>(url, this.httpOptions)
  }

  updateComunicado( id:number, body:any ):Observable<any> {
    return this.http.put<any>(`${this.apiUrl}comunicado/${id}/`, body, this.httpOptions)
  }
}
