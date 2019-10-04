import { environment } from './../../environments/environment.prod';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from  '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private headers = new HttpHeaders().set('Content-type', 'application/json')
                                   .set('Content-Type','application/x-www-form-urlencoded');
  constructor(private httpClient: HttpClient) { }

  get(url: string,param,getToken: boolean) {
    return this.httpClient.get(`${environment.apiUrl}` + url);
  }

  post(url: string,param, getToken: boolean) {
    return this.httpClient.post(`${environment.apiUrl}` + url, param,{headers: this.headers})
  }

  put(url: string,param, getToken: boolean){
    return this.httpClient.put(`${environment.apiUrl}` + url, param,{headers: this.headers})
  }

  delete(url: string,param, getToken: boolean){
    return this.httpClient.delete(`${environment.apiUrl}` + url, {headers: this.headers})
  }
}
