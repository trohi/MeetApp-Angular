export class MeetupModel {
    public title: string;
    public location: string;
    public imageUrl: string;
    public description: string;
    public date: string;
    public time: string;

    constructor(title:string, location:string, imageUrl:string, description:string, date:string, time:string, id?:string){
        this.title = title;
        this.location = location;
        this.imageUrl = imageUrl;
        this.description = description;
        this.date = date;
        this.time = time;
    }
}