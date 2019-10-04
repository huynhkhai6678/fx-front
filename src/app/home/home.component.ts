/// <reference types="@types/googlemaps" />

import { DashboardService } from './../service/dashboard.service';
import { Component, OnInit, NgZone, ElementRef, ViewChild, ɵConsole } from '@angular/core';
import { MapsService } from './../service/map.service';
import  * as $ from 'jquery';
import { MapsAPILoader } from '@agm/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { StoreService } from '../service/shared.service';
import { Restaurant } from '../models/restaurant';
import { RestaurantAd } from '../models/restaurant-ad';


declare function reRunApplyTheme() : any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  lat : number;
  lng : number;
  city : string;
  region : string;
  errorMessage: string;
  restaurants : Array<any>;
  restaurantAds: Array<any>;
  foods: Array<any>;
  noRestaurant : boolean = false;
  categories : Array<any> = [];
  limitRes: number = 9;
  hideLimitRes: boolean = false;
  limitFood: number = 9;
  hideLimitFood:boolean =  false;
  
  public searchControl =  new FormControl();

  @ViewChild('search', {static: false}) 
  public searchElementRef: ElementRef;

  constructor(private mapService: MapsService,
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
    private dashboardService: DashboardService, 
    private router : Router,
    private store: StoreService) { }

  ngOnInit() {

    let seft = this;
    this.mapsAPILoader.load().then(() => {

      let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
        types: ["address"]
      });

      autocomplete.addListener("place_changed", () => {
        this.ngZone.run(() => {
          //get the place result
          let place: google.maps.places.PlaceResult = autocomplete.getPlace();

          //verify result
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }

          //set latitude, longitude and zoom
          this.lat = place.geometry.location.lat();
          this.lng = place.geometry.location.lng();

          let body = {
            "location" : {
              "lat" :  this.lat,
              "lng":this.lng
            },
            "radius": 1.0,
            "tokenID": "MCAFETERIA"
          };

          seft.getDashboardData(body,place.address_components);
          
        });
      });
    }) 
  }
  ngAfterViewInit() {

      let seft = this;
      let body : any; 
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          this.lat = position.coords.latitude;
          this.lng = position.coords.longitude
          body = {
            "location" : {
              "lat" : this.lat,
              "lng":  this.lng
            },
            "radius": 1.0,
            "tokenID": "MCAFETERIA"
          };

          this.mapsAPILoader.load().then(() => {
            let geocoder = new google.maps.Geocoder;
            geocoder.geocode( { 'location': {
            "lat" : this.lat,
            "lng": this.lng
            }}, function(results, status : any) {
              if (status == 'OK') {
                seft.getDashboardData(body,results[0].address_components);
              } else {
                alert('Geocode was not successful for the following reason: ' + status);
              }
            });
          })
        });
      } else {
        this.errorMessage = "Can't find your position.";
      }

      setTimeout(function() {
        $(document).trigger('rendered');
      },500)
  }

  findRestaurant() {
    let geocoder = new google.maps.Geocoder;
    let body;
    let seft = this
    // let seft = this;
    geocoder.geocode( { 'address': this.searchElementRef.nativeElement.value}, function(results, status : any) {
      if (status == 'OK') {
        let pos = results[0]
        if (pos.geometry) {
          seft.lat =  pos.geometry.location.lat();
          seft.lng =  pos.geometry.location.lng();
          body = {
            "location" : {
              "lat" : seft.lat,
              "lng": seft.lng
            },
            "radius": 1.0,
            "tokenID": "MCAFETERIA"
          };
          seft.getDashboardData(body,pos.address_components)
        }
      } else {
        alert('Geocode was not successful for the following reason: ' + status);
      }
    });

  }

  getDashboardData(params,address_components) {

    this.dashboardService.getCategories("Vietnam","Danang")
    .subscribe((callback : any) => {
      this.categories = callback.data;
    })

    this.dashboardService.getDashboardData(params).subscribe((response : any) => {
      if(response.data.length < 1) {
        this.noRestaurant = true;
      }
      else {
        this.noRestaurant = false;
        let cityName = "";
        let countryName = "";
        //Format regions
        address_components.forEach(component => {
          if (component.types.indexOf("administrative_area_level_1") != -1) {
            cityName = component.long_name;
          }
          if (component.types.indexOf("country") != -1) {
            countryName = component.long_name;
          }
        })

        this.store.setUserInfors({
          lat: this.lat,
          lng: this.lng,
          city: cityName,
          region: countryName
        });

        this.restaurants = response.data;
        this.restaurantAds = response.ads;
        let foods = []
        response.data.forEach(function(element) {
          if (element.food_items != null && element.food_items.foods.length > 0) {
            element.food_items.foods.forEach(function(item : any) {
              item.restaurant_name = element.restaurant_name;
              item.distance = element.distance;
              foods.push(item);
            })
          }
        });
        this.foods = foods;
        if (this.restaurants.length < 9) {
          this.hideLimitRes = true;
        }
        if (this.foods.length < 9) {
          this.hideLimitFood = true;
        }
      }
    });

    setTimeout(function(){
      reRunApplyTheme()
    },500)
  }

  showMoreRestaurant() {
    console.log('here');
    let numberOfRes = this.restaurants.length;
    this.limitRes = this.limitRes + 9 ;
    if (numberOfRes < this.limitRes) {
      this.hideLimitRes = true;
    }
    else {
      this.hideLimitRes = false;
    }
  }

  showMoreFood() {
    let numberOfFood = this.foods.length;
    this.limitRes = this.limitRes + 9 ;
    if (numberOfFood < this.limitRes) {
      this.hideLimitFood = true;
    }
    else {
      this.hideLimitFood = false;
    }
  }

}
