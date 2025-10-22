import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface Estado {
  id: number;
  nome: string;
  sigla: string;
}

interface Municipio {
  id: number;
  nome: string;
}

@Injectable({
  providedIn: 'root'
})
export class IbgeService {

  constructor(private http: HttpClient) {}

  // Buscar todos os estados
  getEstados(): Observable<Estado[]> {
    return this.http.get<Estado[]>('https://servicodados.ibge.gov.br/api/v1/localidades/estados');
  }

  // Buscar municípios de um estado
  getMunicipios(estadoId: number): Observable<Municipio[]> {
    return this.http.get<Municipio[]>(
      `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${estadoId}/municipios`
    );
  }
}
