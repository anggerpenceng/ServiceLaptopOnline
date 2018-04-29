import { Injectable } from '@angular/core';
import { loginAdmin , FileUplaod, Article, serviceCenter} from './dataModel';
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
  private fireBaseDB: AngularFireDatabase) { }

  CenterColection: AngularFirestoreCollection<any> = this.fireStore.collection('centerHome');
  ArticleCollection: AngularFirestoreCollection<any> = this.fireStore.collection('article');
  postDoc: AngularFirestoreDocument<serviceCenter>;
  singlePost: Observable<serviceCenter>;

  InsertDataToFirestore(serviceCenter:serviceCenter):boolean{
    this.CenterColection.doc(serviceCenter.email).set({
      serviceName: serviceCenter.serviceName , 
      address: serviceCenter.address,
      deskripsi : serviceCenter.deskripsi,
      numphone: serviceCenter.number,
      jambuka: serviceCenter.jambuka,
      email: serviceCenter.email,
      like: serviceCenter.like = 0,
      latitude: serviceCenter.latitude,
      longtitude: serviceCenter.longtitude,
      urlMaps: serviceCenter.urlMaps
      
    }).then((valuable) => {
      this.toast.success('Success add Data , Nice Work !!');
      this.router.navigate(['/loginAdmin']);
    })
    .catch(err => {
      this.toast.error('Somthing Wrong , ERROR !!');
    })
    return true;
  }

  UpdateDataCenter(serviceCenter: serviceCenter){
    this.fireStore.doc('centerHome/'+serviceCenter.email).update({
      serviceName: serviceCenter.serviceName,
      address: serviceCenter.address,
      deskripsi : serviceCenter.deskripsi,
      numphone: serviceCenter.number,
      jambuka: serviceCenter.jambuka,
      latitude: serviceCenter.latitude,
      longtitude: serviceCenter.longtitude,
      urlMaps: serviceCenter.urlMaps
      
    }).then(value => {
      this.toast.success('Data has been uptodate' , 'Success!');
      this.router.navigate(['/Dashboard']);
    }).catch(err => {
      this.toast.success('Data failed update' , 'Failed!');
      this.router.navigate(['/Dashboard']);
    })
  }

  
  AddingArticle(article: Article){
    this.ArticleCollection.add({
      catalog: article.catalog,
      date: article.date = firebase.firestore.FieldValue.serverTimestamp(),
      sebab: article.sebab,
      solusi: article.solusi,
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
  pushFileTostorage(fileUpload: FileUplaod, progress: { percentage: number } , email , serviceCenter:serviceCenter){
    const storageRef = firebase.storage().ref();
    const uploadTask = storageRef.child('upload/'+fileUpload.file.name)
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
        this.toast.success('file has benn uploaded' , 'Success!');
        this.saveFileData(fileUpload , email , serviceCenter);
      }
    );

  }

  private saveFileData(fileUpload: FileUplaod , email , serviceCenter:serviceCenter) {
    this.fireStore.doc('centerHome/'+email).update({
      fileName: fileUpload.name,
      urlFile: fileUpload.url
    });
  }

}
