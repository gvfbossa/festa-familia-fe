import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Adult } from '../models/adult.model';
import { Kid } from '../models/kid.model';

@Injectable({
  providedIn: 'root'
})
export class ParticipantsService {

  private baseUrl = environment.apiBaseUrl + "api/festa/participante";

  constructor(private http: HttpClient) { }

  // ===== Adultos =====
  getAdults(): Observable<Adult[]> {
    return this.http.get<Adult[]>(`${this.baseUrl}/adulto`);
  }

  addAdult(adult: Adult): Observable<any> {
    return this.http.post(`${this.baseUrl}/adulto`, adult);
  }

  editAdult(adult: Adult): Observable<any> {
    return this.http.put(`${this.baseUrl}/adulto`, adult);
  }

  removeAdult(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/adulto/${id}`);
  }

  // ===== Crianças =====
  getKids(): Observable<Kid[]> {
    return this.http.get<Kid[]>(`${this.baseUrl}/crianca`);
  }

  addKid(kid: Kid): Observable<any> {
    return this.http.post(`${this.baseUrl}/crianca`, kid);
  }

  editKid(kid: Kid): Observable<any> {
    return this.http.put(`${this.baseUrl}/crianca`, kid);
  }

  removeKid(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/crianca/${id}`);
  }
}
