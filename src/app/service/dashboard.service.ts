import { ApiService } from './api.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
    
    constructor(private apiService: ApiService) { }

    getDashboardData(params: any) {
        return this.apiService.post("/foodsexplorer",params,false);
    }

    getCategories(country : string, city: string) {
      return this.apiService.get("/location/suggestion-cuisines/" + country + '/' + city,'',false)
  }

}