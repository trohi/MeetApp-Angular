import { Component, OnInit } from '@angular/core';
import { Store } from '../shared/store.service'
import { MeetupModel } from '../shared/meetup.model'

@Component({
  selector: 'app-create-meetup',
  templateUrl: './create-meetup.component.html',
  styleUrls: ['./create-meetup.component.css']
})
export class CreateMeetupComponent implements OnInit {
  time={13:30}
  constructor(private store: Store) { }

  newMeetup= {
    title:'',
    location:'',
    imageUrl:'',
    description:'',
    date:{},
    time:{}
  } 

  onCreateMeetup(){
    const payloadMeetup = new MeetupModel(
      this.newMeetup.title,
      this.newMeetup.location,
      this.newMeetup.imageUrl,
      this.newMeetup.description,
      this.newMeetup.date,
      this.newMeetup.time
    )
    this.store.createMeetup(payloadMeetup)
  }

  ngOnInit(): void {
  }

}
