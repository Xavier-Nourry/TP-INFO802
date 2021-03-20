import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(public httpClient: HttpClient) { }

  getDeals(): Observable<any>{ // TODO : voir sans any
    return this.httpClient.get("http://localhost:3000/deals");
  }
}