import { Component } from '@angular/core';
import { Store } from './shared/store.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
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
}
