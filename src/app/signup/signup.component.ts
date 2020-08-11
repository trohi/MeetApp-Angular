import { Component, OnInit } from '@angular/core';
import { Store } from '../shared/store.service'
import { isError } from 'util';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  user = {
    email:'',
    password:''
  }
  repeatPassword:''
  errorMessage:'Password doesnt metch'
  isError:boolean

   passwordRepeatError(){
    if(this.user.password === this.repeatPassword){
      return this.isError = true
    } else {
      return this.isError = false
    }
  }



  get message(){
    return this.store.getMessage()
  }

  onSignup(){
    console.log(this.store.getIsLoggedIn())
    this.store.createUser(this.user)
  }

  closeError(){
    this.store.clearMessage()
  }

  constructor(private store:Store) { }

  ngOnInit(): void {
  }

}
