export class UserModel{
    public uid:string;
    public registeredMeetups:any;
    public fbKeys:any

    constructor(uid:string, registeredMeetups:any, fbKeys:any){
        this.uid = uid;
        this.registeredMeetups = registeredMeetups;
        this.fbKeys = fbKeys
    }
}