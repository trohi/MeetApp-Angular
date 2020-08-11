export class UserModel{
    public id:string;
    public registeredMeetups:any;
    public fbKeys:any

    constructor(id:string, registeredMeetups:any, fbKeys:any){
        this.id = id;
        this.registeredMeetups = registeredMeetups;
        this.fbKeys = fbKeys
    }
}