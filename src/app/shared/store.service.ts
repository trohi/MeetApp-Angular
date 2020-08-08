import { UserModel } from './user.model'
import { MeetupModel } from './meetup.model'
import * as firebase from 'firebase'

export class Store {
    private user:UserModel[];
    private newMeetup:MeetupModel[]

    constructor(){
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

    createUser(payload){
        firebase.auth().createUserWithEmailAndPassword(payload.email,payload.password)
        .then(user=>{
            console.log("Success!" + user)
        })
        .catch(error=>{
            console.log(error.message)
        })
    }
}