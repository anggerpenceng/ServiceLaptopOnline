export class loginAdmin {
    email: string;
    password: string;
}

export class serviceCenter{
    serviceName: string;
    deskripsi:string;   
    email:string;
    password:string;
    number: number;
    address: string;
    like:number;
    latitude:number;
    longtitude:number;
    urlMaps:string;
    jambuka:string;
}

export class adminCostum{
    email: string;
    password: string;
}

export class centerID{
    id:string;
}

export class Article{
    catalog: string;
    date: any;
    sebab:string;
    solusi:string;
    like: number;
    source:string;
    title: string;
}

export class FileUplaod{
    key: string;
    name : string;
    url: string;
    file: File;

    constructor(file : File){
        this.file = file;
    }

}