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

  get message(){
    return this.store.getMessage()
  }

  closeError(){
    this.store.clearMessage()
  }

  onSignIn(){
    this.store.signUserIn(this.user)
    if(this.isLoggedIn == true){
        this.router.navigate(['/'])
    } else {
    }
  };

  constructor(private store:Store, private router:Router) { }

  ngOnInit(): void {
  }

}
