import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Observable } from 'rxjs';
import { NavController } from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {

  constructor(private navCtrl:NavController){

  }
  public canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    if (localStorage.getItem('intro') !== 'true'&&localStorage.getItem('isLogin') !== 'true') {
      return true;
    }  if (localStorage.getItem('isLogin')== 'true') {
      return true;
    }else {
      this.navCtrl.navigateForward('/signin');
    }
  }
}
