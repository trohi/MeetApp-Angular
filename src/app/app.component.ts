import { Component, OnInit } from '@angular/core';
import { Store } from './shared/store.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'secondMeet';

  get loader(){
    return this.store.getLoader()
  };

  get message(){
    return this.store.getMessage()
  };

  closeDialog(){
    return this.store.clearMessage()
  };


  constructor(private store:Store){}

  ngOnInit():void{
    this.store.loadMeetups()
  }
}
