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
}

export class adminCostum{
    email: string;
    password: string;
}

export class Article{
    catalog: string;
    date: any;
    fild: string;
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