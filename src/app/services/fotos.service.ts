import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Foto } from '../models/foto.model';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FotosService {

  private baseUrl = environment.apiBaseUrl;
  private apiUrl = this.baseUrl + 'api/foto';

  constructor(private http: HttpClient) { }

  getFotos(): Observable<Foto[]> {
    return this.http.get<Foto[]>(this.apiUrl);
  }

  uploadFoto(file: File, descricao: string): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('descricao', descricao);

    return this.http.post(this.apiUrl, formData);
  }
}
