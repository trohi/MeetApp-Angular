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
    private newMeetup:MeetupModel[];
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
    }
}