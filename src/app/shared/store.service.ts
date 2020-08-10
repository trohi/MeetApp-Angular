import { UserModel } from './user.model'
import { MeetupModel } from './meetup.model'
import * as firebase from 'firebase'
import { Router } from '@angular/router'
import { Injectable } from '@angular/core'

@Injectable({
    providedIn:'root'
})

export class Store {
    private user:UserModel[];
    private newMeetup:MeetupModel[]=[{
        title:"Boracko lake meet",
        location:"Konjic, Boracko jezero",
        imageUrl:"https://picsum.photos/id/1011/900/500",
        description:"Meetup for nature lovers, meetup is organised in 2 days full of educations and activitys",
        date:"29.08.2020",
        time:"10:00"
    },
    {
        title:"Global warming",
        location:"Toronto",
        imageUrl:`https://picsum.photos/id/984/900/500`,
        description:"Meetup for caring comunity, we'll be discussing modern trends and effects on society.",
        date:"31.09.2020",
        time: "14:00"
    }
]
    private loading:boolean;
    private isLoggedIn: boolean;
    private message:string;

    constructor(  private router:Router){
        firebase.initializeApp({
            apiKey: "AIzaSyArFIq1DcSJowifCpp7Gu3Qu_rZvyxCa7c",
            authDomain: "angularmeetup-6865a.firebaseapp.com",
            databaseURL: "https://angularmeetup-6865a.firebaseio.com",
            projectId: "angularmeetup-6865a",
            storageBucket: "angularmeetup-6865a.appspot.com",
            messagingSenderId: "616116769823",
            appId: "1:616116769823:web:7c9371c0e6a7609d86f12a",
            measurementId: "G-PJV34LR1BM"
        })
    }

    

    //methods
    createUser(payload){
        this.loading = true
        firebase.auth().createUserWithEmailAndPassword(payload.email,payload.password)
        .then(user=>{
            console.log("Success!" + user);
            this.isLoggedIn = true
            this.router.navigate(['/'])
            this.loading = false
            this.message = ''
        })
        .catch(error=>{
            console.log(error.message)
            this.message = error.message
            this.isLoggedIn = false
            this.loading = false
        })
    };

    signUserIn(payload){
        this.loading = true
        firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
        .then(user =>{
            console.log("Successfull login")
            this.router.navigate(['/'])
            this.isLoggedIn = true
            this.loading = false
            this.message = ''
        })
        .catch(error =>{
            this.message = error.message
            this.isLoggedIn = false
            console.log(error.message)
            this.loading = false
        })
    }

    logout(){
        firebase.auth().signOut()
        this.isLoggedIn = false
        this.user=[]
    };

    crateMeetup(payload){
        let meetup = {
            title:payload.title,
            location:payload.location,
            imageUrl:payload.imageUrl,
            description:payload.description,
            date:payload.date,
            time:payload.time,
            id:''
        }
        firebase.database().ref('meetups').push(meetup)
        .then(data=>{
            const key = data.key
            console.log(data)
            /* const newMeetup= new MeetupModel(
                meetup.title,
                meetup.location,
                meetup.imageUrl,
                meetup.description,
                meetup.date,
                meetup.time,
                key
            ) */
            meetup.id = key
            this.newMeetup.push(meetup)
        })
        .catch(error=>{
            console.log(error.message)
        })
    }

    clearMessage(){
        this.message = ''
    }

    //getters
    getIsLoggedIn(){
        return this.isLoggedIn
    };

    getLoader(){
        return this.loading
    };

    getMessage(){
        return this.message
    };

    getMeetups(){
        //console.log(this.newMeetup)
        return this.newMeetup
    }
}