import { Component, OnInit } from '@angular/core';
import { Store } from '../shared/store.service'

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

  onSignup(){
    this.store.createUser(this.user)
  }

  constructor(private store:Store) { }

  ngOnInit(): void {
  }

}
