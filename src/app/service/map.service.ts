import { environment } from './../../environments/environment.prod';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from  '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MapsService {
  private headers = new HttpHeaders().set('Content-type', 'application/json')
                                      .set('Content-Type','application/x-www-form-urlencoded')
                                      .set('Access-Control-Allow-Origin', '*');

    constructor(private httpClient: HttpClient) { }

    getLocationSuggestion(address: string) {
        return this.httpClient.get("https://maps.googleapis.com/maps/api/place/autocomplete/json?input=" 
        + address + '&language=en&key=' + 'AIzaSyAMWziZUtwEX6scfUq8Px6oekK5ZFrrmug',{headers: this.headers});
    }

}