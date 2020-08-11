export class MeetupModel {
    public title: string;
    public location: string;
    public imageUrl: string;
    public description: string;
    public date: object;
    public time: object;
    public creatorId : string

    constructor(title:string, location:string, imageUrl:string, description:string, date:object, time:object, creatorId?:string){
        this.title = title;
        this.location = location;
        this.imageUrl = imageUrl;
        this.description = description;
        this.date = date;
        this.time = time;
        this.creatorId = creatorId
    }
}