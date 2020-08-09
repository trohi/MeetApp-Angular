import { Component, OnInit } from '@angular/core';
import { Store } from '../shared/store.service'
import { Router } from '@angular/router'

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  user={
    email:'',
    password:''
  };

  get isLoggedIn():boolean{
    return this.store.getIsLoggedIn()
  };

  onSignIn(){
    this.store.signUserIn(this.user)
    if(this.isLoggedIn == true){
      console.log("LOGINAR"+this.isLoggedIn)
        this.router.navigate(['/'])
    } else {
      console.log("NIJE LOGIRAN"+this.isLoggedIn)
    }
  };

  constructor(private store:Store, private router:Router) { }

  ngOnInit(): void {
  }

}
