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
  }

  get userIsCreator(){
    if(!this.userIsAuthenticated){
      return false
    }
    return this.store.getUser().id === this.oneMeetup.creatorId
  }

  ngOnInit(): void {
    this.oneMeetup = this.store.getSingleMeetup()
  }

}

