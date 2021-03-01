import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DataResponse } from '../data/data-response';

@Injectable({providedIn: 'root'})
export class BackEndService {
  constructor(private httpClient: HttpClient) { }
  
  getData(): Observable<DataResponse> {
    return this.httpClient.get<DataResponse>('http://localhost:8080/api/miPrueba');
  }
}