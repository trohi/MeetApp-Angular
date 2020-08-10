import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignupComponent } from './signup/signup.component';
import { SigninComponent } from './signin/signin.component'
import { CarouselComponent } from './carousel/carousel.component';
import { CreateMeetupComponent } from './create-meetup/create-meetup.component'
import { EditMeetupComponent } from './edit-meetup/edit-meetup.component'
import { ViewMeetupComponent } from './view-meetup/view-meetup.component'
import { MeetupsComponent } from './meetups/meetups.component'

const routes: Routes = [
  {path:'', component:CarouselComponent},
  {path:'signup', component:SignupComponent},
  {path:'signin', component:SigninComponent},
  {path:'create', component:CreateMeetupComponent},
  {path:'edit', component:EditMeetupComponent},
  {path:'meetup', component:ViewMeetupComponent},
  {path:'view-meetup', component:MeetupsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
