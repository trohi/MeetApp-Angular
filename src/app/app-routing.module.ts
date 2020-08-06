import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignupComponent } from './signup/signup.component';
import { SigninComponent } from './signin/signin.component'
import { CardComponent } from './card/card.component';
import { CreateMeetupComponent } from './create-meetup/create-meetup.component'
import { EditMeetupComponent } from './edit-meetup/edit-meetup.component'

const routes: Routes = [
  {path:'', component:CardComponent},
  {path:'signup', component:SignupComponent},
  {path:'signin', component:SigninComponent},
  {path:'create', component:CreateMeetupComponent},
  {path:'edit', component:EditMeetupComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
