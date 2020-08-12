import { MeetupModel } from './meetup.model'
import * as firebase from 'firebase'
import { Router } from '@angular/router'
import { Injectable } from '@angular/core'

@Injectable({
    providedIn:'root'
})

export class Store {
    private newMeetup:MeetupModel[]=[{
        title:"Boracko lake meet",
        location:"Konjic, Boracko jezero",
        imageUrl:"https://picsum.photos/id/1011/900/500",
        description:"Meetup for nature lovers, meetup is organised in 2 days full of educations and activitys",
        date:{day:"29", month:"08", year:"2020"},
        time:{hour:"10", minute:"00"},
        creatorId:"1O8S3Ef0P7XHDms9IRUd6ZfQDhz2"
    },
    {
        title:"Global warming",
        location:"Toronto",
        imageUrl:`https://picsum.photos/id/984/900/500`,
        description:"Meetup for caring comunity, we'll be discussing modern trends and effects on society.",
        date:{day: "31", month:"09", year:"2020"},
        time: {hour:"14", minute:"00"},
        creatorId:"1O8S3Ef0P7XHDms9IRUd6ZfQDhz2"
    }
]
    //  Declaration of propertys which are going to be used in 
    //  getters and functions in this file 
    private User;
    private loading: boolean;
    private isLoggedIn: boolean;
    private message: string;
    private singleMeetup;

    constructor(private router: Router){
        //  Initialising firebase 
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
    };

    //methods

    //  Recieving a payload from sign up component and
    //  reaching to firebase with its own built in functions
    //  passing recieved parameters to firebae function which creates stores user
    createUser(payload){
        this.loading = true
        firebase.auth().createUserWithEmailAndPassword(payload.email,payload.password)
        .then(user=>{
            let newUser = {
                id: user.user.uid,
                registeredMeetups:[],
                fbKeys:[]
            }
            this.User = newUser
            this.isLoggedIn = true
            this.router.navigate(['/'])
            this.loading = false
            this.message = ''
            firebase.auth().onAuthStateChanged((user)=>{
                if(user){
                    this.fetchUsersData()
                }
            })
        })
        .catch(error=>{
            this.message = error.message
            this.isLoggedIn = false
            this.loading = false
        })
    };

    //  Recieving payload from sign in form and passing it to firebase
    //  function which uses provided cridential to check if user exists
    //  and return error or signed in user
    signUserIn(payload){
        this.loading = true
        firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
        .then(user =>{
            this.router.navigate(['/'])
            let newUser = {
                id: user.user.uid,
                registeredMeetups:[],
                fbKeys:[]
            }
            this.User = newUser
            this.isLoggedIn = true
            this.router.navigate(['/'])
            this.loading = false
            this.message = ''
            firebase.auth().onAuthStateChanged((user)=>{
                if(user){
                    this.fetchUsersData()
                }
            })
        })
        .catch(error =>{
            this.message = error.message
            this.isLoggedIn = false
            this.loading = false
        })
    };

    //  Fetching user's registrations if there is any and
    //  storing it localy
    fetchUsersData(){
        this.loading = true
        firebase.database().ref('/users/' + this.User.id + '/registrations/').once('value')
        .then(data=>{
          let values = data.val()
          let registeredMeetupS = []
          let reversedRegistrations = {}
          for (let key in values){
              registeredMeetupS.push(values[key])
              reversedRegistrations[values[key]] = key
          } 
          let updatedUser = {
              id: this.User.id,
              registeredMeetups: registeredMeetupS,
              fbKeys: reversedRegistrations
          } 
          this.loading = false
          this.User = updatedUser
        })
        .catch(error=>{
            this.loading = false
        })
    };

    //  logs user out and assignin empty array as User's local value
    logout(){
        firebase.auth().signOut()
        this.isLoggedIn = false
        this.User=[]
    };

    //  Recieved payload from create meetup form and passing it to
    //  firebase function which creates meetup and assigne property
    //  creatorId to user's id. This property is used to connect created
    //  meetup to coresponding user
    createMeetup(payload){
        this.loading = true
        let meetup = {
            title:payload.title,
            location:payload.location,
            imageUrl:payload.imageUrl,
            description:payload.description,
            date:payload.date,
            time:payload.time,
            creatorId:this.User.id
        }
        firebase.database().ref('meetups').push(meetup)
        .then(data=>{
            const key = data.key    // this key is unique id which is created by firebase
            meetup.creatorId = key
            this.newMeetup.push(meetup)
            this.loading = false
            this.router.navigate(['/'])
        })
        .catch(error=>{
            this.loading = false
        })
    };

    // Fetching all created meetups from firebase db
    // and storing it localy
    loadMeetups(){
        this.loading = true
        firebase.database().ref('meetups').once('value')
        .then(data=>{
            let meetups=[]
            const obj = data.val()
            for(let key in obj){
                meetups.push({
                    id:key,
                    title: obj[key].title,
                    description: obj[key].description,
                    imageUrl: obj[key].imageUrl,
                    date: obj[key].date,
                    time: obj[key].time,
                    location: obj[key].title,
                    creatorId: obj[key].creatorId
                })
            }
            this.newMeetup.push(...meetups)
            this.loading = false
        })
        .catch(error=>{
            this.loading = false
        })
    };

    // Storing new value to db /user/users.id/registrations which will contain meetup id and fbKey as its value
    // Later i will use this meetup id to find meetup and register or unregister from it 
    registerUserForMeetup(payload){
        this.loading = true
        firebase.database().ref('/users/' + this.User.id + '/registrations/').push(payload)
        .then(data=>{
            if(this.User.registeredMeetups.findIndex(meetup=> meetup.id === payload) >= 0){
                return
            }
            this.User.registeredMeetups.push(payload)
            this.User.fbKeys[payload] = data.key // data.key is unique firebase generated id/string i use it to easily access meetup when try to unregister
            this.loading = false
        })
        .catch(error=>{
            this.loading = false
        })
    };

    unregisterFromMeetup(payload){
        this.loading = true
        const user = this.User
        if(!user.fbKeys){
            return
        }
        const fbKey = user.fbKeys[payload]
        firebase.database().ref('/users/' + user.id + '/registrations/').child(fbKey)
        .remove()
        .then(()=>{
            const registeredMeetups = this.User.registeredMeetups
            registeredMeetups.splice(registeredMeetups.findIndex(meetup=> meetup.id === payload), 1)
            Reflect.deleteProperty(this.User.fbKeys, payload)
            this.loading = false
        })
        .catch(error=>{
            this.loading = false
        })
    };

    clearMessage(){
        this.message = ''
    };

    // setring up a meetup am i going to visit in details section.
    // Meetups detail section should display one chosen meetup which I 
    // am setting in following par of code. This action is called from 
    // listed meeup on button click 'View meetup'
    setSpecificMeetup(title){
        let specificMeetup = this.newMeetup.find(meet=>{
            return meet.title === title
        })
        this.singleMeetup = specificMeetup
    };

    // Enabling way to set a error message from different components
    setErrorMessage(payload){
        this.message = payload
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
        return this.newMeetup
    };

    getUser(){
        return this.User
    };

    getSingleMeetup(){
        return this.singleMeetup
    };

}