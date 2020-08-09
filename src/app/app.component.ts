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
  }
  constructor(private store:Store){}
}
