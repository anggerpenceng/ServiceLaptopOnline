import { Injectable } from '@angular/core';
import { loginAdmin , serviceCenter, FileUplaod, Article } from './dataModel';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import 'firebase/storage';
import * as firebase from 'firebase';
import { Observable } from '@firebase/util';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { AngularFireDatabase } from 'angularfire2/database'
import { NgForm } from '@angular/forms';
import { DatePipe } from '@angular/common';

@Injectable()
export class DataService {

  adminDataList: loginAdmin = new loginAdmin();
  serviceCenterList: serviceCenter = new serviceCenter();
  center:Observable<serviceCenter[]>;
  CenterDoc: AngularFirestoreDocument<serviceCenter>;
  dataStatus:boolean;
  dataServ:any;
  private basePath = '/upload';

  constructor(private fireStore: AngularFirestore , private toast: ToastrService , private router: Router , 
  private fireBaseDB: AngularFireDatabase ) { }

  CenterColection: AngularFirestoreCollection<any> = this.fireStore.collection('serviceCenter');
  ArticleCollection: AngularFirestoreCollection<any> = this.fireStore.collection('article');

  InsertDataToFirestore(serviceCenter:serviceCenter):boolean{
    this.CenterColection.add(
      { 
        serviceName: serviceCenter.serviceName , 
        address: serviceCenter.address,
        deskripsi : serviceCenter.deskripsi,
        numphone: serviceCenter.number,
        email: serviceCenter.email,
        like: serviceCenter.like = 0
      }
    ).then((valuable) => {
      this.toast.success('Success add Data , Nice Work !!');
      this.router.navigate(['/ListCenter']);
    })
    .catch(err => {
      this.toast.error('Somthing Wrong , ERROR !!');
      this.router.navigate(['/ListCenter']);
    })
    return true;
  }

  GetOneOfDocumment(email):any{
    var vardat;
    var docQry = this.fireStore.collection('serviceCenter').ref;
    var docData = docQry.where('email' , '==' , email).get()
    .then(qrySnap => {
      qrySnap.forEach(doc => {
        vardat = doc.data();
      })
    })
    .catch(err => {
      console.log('Error Reported' , err);
    })
    
    return vardat;
  }

  
  AddingArticle(article: Article){
    this.ArticleCollection.add({
      catalog: article.catalog,
      date: article.date = firebase.firestore.FieldValue.serverTimestamp(),
      fild: article.fild,
      like : article.like = 0,
      source: article.source,
      title: article.title
    }).then((valuable) => {
      this.toast.success('Success add Data , Nice Work !!');
      this.router.navigate(['/listArticle']);
    })
    .catch(err => {
      this.toast.error('Somthing Wrong , ERROR !!');
    })
  }

  //Uplaod image or file to storage firebase
  pushFileTostorage(fileUpload: FileUplaod, progress: { percentage: number }){
    const storageRef = firebase.storage().ref();
    const uploadTask = storageRef.child('${this.basePath}/${fileUpload.file.name}')
                       .put(fileUpload.file);

    uploadTask.on(
      firebase.storage.TaskEvent.STATE_CHANGED,
      (snapshot) => {
        const snap = snapshot as firebase.storage.UploadTaskSnapshot;
        progress.percentage = Math.round((snap.bytesTransferred / snap.totalBytes) * 100);
      },  
      (error) => {
        console.log(error);
      },
      () => {
        fileUpload.url = uploadTask.snapshot.downloadURL;
        fileUpload.name = fileUpload.file.name;
        this.saveFileData(fileUpload);
      }
    );

  }

  private saveFileData(fileUpload: FileUplaod) {
    this.fireBaseDB.list(`${this.basePath}/`).push(fileUpload);
  }

}
