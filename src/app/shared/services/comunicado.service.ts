import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ComunicadoService {

  private API_URL: string = environment.API_URL
  private API_TOKEN: string = environment.API_TOKEN
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Token ${this.API_TOKEN}`
    })
  }

  constructor(private http: HttpClient) { }

  addComunicado(body: any): Observable<any> {
    return this.http.post<any>(`${this.API_URL}/comunicado/`, body, this.httpOptions)
  }

  deleteComunicado(id: number): Observable<any> {
    return this.http.delete(`${this.API_URL}/comunicado/${id}`, this.httpOptions)
  }

  getComunicado(id: number): Observable<any> {
    return this.http.get<any>(`${this.API_URL}/comunicado/${id}`, this.httpOptions)
  }

  getComunicados(limit:number, offset:number): Observable<any> {
    return this.http.get<any>(`${this.API_URL}/comunicados/?limit=${limit}&offset=${offset}`, this.httpOptions)
  }

  getComunicadosDivergentes(lavoura_data_colheita: Date, evento: number, id: number = 0): Observable<any> {
    if (!id) id = 0

    return this.http.get<any>(
      `${this.API_URL}/comunicados/?lavoura_data_colheita=${lavoura_data_colheita}&evento__ne=${evento}&id__ne=${id}`,
      this.httpOptions)
  }

  getComunicadosFiltroDtColheita(gte: string, lte: string, limit: number, offset: number) {
    const url = `${this.API_URL}/comunicados/?data_colheita__gte=${gte}&data_colheita__lte=${lte}&limit=${limit}&offset=${offset}`
    return this.http.get<any>(url, this.httpOptions)
  }

  getComunicadosFiltroDtCadastro(gte: string, lte: string, limit: number, offset: number) {
    const url = `${this.API_URL}/comunicados/?data_cadastro__gte=${gte}&data_cadastro__lte=${lte}&limit=${limit}&offset=${offset}`
    console.log(url)
    return this.http.get<any>(url, this.httpOptions)
  }

  updateComunicado(id: number, body: any): Observable<any> {
    return this.http.put<any>(`${this.API_URL}/comunicado/${id}/`, body, this.httpOptions)
  }
}
