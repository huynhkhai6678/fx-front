import { UserInfor } from './../models/user-infor.model';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({providedIn: 'root'})
export class StoreService {

  // User Store
  private userInfor = new BehaviorSubject({
      lat: 0,
      lng: 0,
      city : "Danang",
      region: "Vietnam"
  });

  // the getter will return the last value emitted in _todos subject
  getUserInfors(): UserInfor {
    return this.userInfor.getValue();
  }

  setUserInfors(val: UserInfor) {
    this.userInfor.next(val);
  }

  //Todo cart store

}