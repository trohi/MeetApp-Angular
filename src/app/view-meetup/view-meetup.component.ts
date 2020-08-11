import { Component, OnInit } from '@angular/core';
import { Store } from '../shared/store.service'

@Component({
  selector: 'app-view-meetup',
  templateUrl: './view-meetup.component.html',
  styleUrls: ['./view-meetup.component.css']
})
export class ViewMeetupComponent implements OnInit {
  meetups = []

  constructor(private store:Store) { }

  passParams(title){
    this.store.setSpecificMeetup(title)
  }

  ngOnInit(): void {
    this.meetups = this.store.getMeetups()
  }

}
