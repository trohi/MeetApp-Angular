import { Component, OnInit } from '@angular/core';
import { Store } from '../shared/store.service'

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css']
})
export class CarouselComponent implements OnInit {
  meetups = []

  get isLoggedIn():boolean{
    return this.store.getIsLoggedIn()
  };

  constructor(private store:Store) { }

  images = [944, 1011, 984].map((n) => `https://picsum.photos/id/${n}/900/500`);
  
  passParams(title){
    this.store.setSpecificMeetup(title)
  }
  
  ngOnInit(): void {
    this.meetups = this.store.getMeetups()
  }

}
