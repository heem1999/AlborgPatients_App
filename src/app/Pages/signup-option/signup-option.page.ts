import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-signup-option',
  templateUrl: './signup-option.page.html',
  styleUrls: ['./signup-option.page.scss'],
})
export class SignupOptionPage implements OnInit {

  constructor(private navCtrl:NavController) { }

  ngOnInit() {
  }

  doSignUp(){
    this.navCtrl.navigateForward('/signup');
  }

  doSignIn(){
    this.navCtrl.navigateForward('/signin')
  }
}
