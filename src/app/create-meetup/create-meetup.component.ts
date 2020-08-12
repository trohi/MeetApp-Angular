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

    if(payloadMeetup.title && payloadMeetup.date && payloadMeetup.location && payloadMeetup.time && payloadMeetup.imageUrl && payloadMeetup.description){
      this.store.createMeetup(payloadMeetup)
    } else {
      window.scrollTo(0,0)
      let errorMessage = 'All fields are required, please fill all fields and try again.'
      this.store.setErrorMessage(errorMessage)
    }
    
  }

  closeError(){
    return this.store.clearMessage()
  }

  get message(){
    return this.store.getMessage()
  }

  ngOnInit(): void {
  }

}
