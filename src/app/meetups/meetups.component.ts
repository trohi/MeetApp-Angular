import { Component, OnInit } from '@angular/core';
import { Store } from '../shared/store.service';
import { Router } from '@angular/router'

@Component({
  selector: 'app-meetups',
  templateUrl: './meetups.component.html',
  styleUrls: ['./meetups.component.css']
})
export class MeetupsComponent implements OnInit {

  constructor(private store:Store, private router:Router) { }
  oneMeetup;

  get userIsAuthenticated(){
    return this.store.getUser() !== null && this.store.getUser() !== undefined
  };

  get userIsCreator(){
    if(!this.userIsAuthenticated){
      return false
    }
    return this.store.getUser().id === this.oneMeetup.creatorId
  };

  get userIsRegistered(){
    return this.store.getUser().registeredMeetups.findIndex(meetupId=>{
      return meetupId == this.oneMeetup.creatorId
    }) >= 0
  };

  onRegister(){
    if(!this.userIsRegistered){
      this.store.registerUserForMeetup(this.oneMeetup.creatorId)
    } else {
      this.store.unregisterFromMeetup(this.oneMeetup.creatorId)
    }
  }

  ngOnInit(): void {
    this.oneMeetup = this.store.getSingleMeetup()
  }

}

