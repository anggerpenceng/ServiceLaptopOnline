import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';
import { DataService } from '../data-hendler/data.service';
import { serviceCenter, FileUplaod} from '../data-hendler/dataModel';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { NgForm } from '@angular/forms';

declare var $: any;
@Component({
  selector: 'app-homedash',
  templateUrl: './homedash.component.html',
  styleUrls: ['./homedash.component.scss']
})
export class HomedashComponent implements OnInit {

  userEmail: string;
  userID: string;
  postCol: AngularFirestoreCollection<serviceCenter>;
  postDoc: AngularFirestoreDocument<any>;
  singlePost: Observable<any>;
  serviceList: serviceCenter = new serviceCenter();
  idProj: string;

  //for Upload
  fileSelected:FileList;
  curentFileUpload: FileUplaod;
  progress: {percentage: number} = {percentage: 0}; 

  constructor(private fireAuth: AngularFireAuth , private router: Router , private dataService: DataService, private fireStore:AngularFirestore) { 

  }

  ngOnInit() {
    //Email get data
    this.fireAuth.authState.subscribe(res => {
      if (res) {
        this.userEmail = res.email;
        this.userID = res.uid;
        this.postDoc = this.fireStore.doc('centerHome/'+res.email);
        this.singlePost = this.postDoc.valueChanges();
        sessionStorage.setItem('email' , res.email);
      }
    })
    

    //Jquery Platform
    $(document).ready(function () {
      $('input').focus(function(){
        $(this).parents('.form-group').addClass('focused');
      });
      
      $('input').blur(function(){
        var inputValue = $(this).val();
        if ( inputValue == "" ) {
          $(this).removeClass('filled');
          $(this).parents('.form-group').removeClass('focused');
        } else {
          $(this).addClass('filled');
        }
      })  
    })
  }

  UpdateDataCenter(formDatas: NgForm){
    this.dataService.UpdateDataCenter(formDatas.value);
  }

  UploadBackgroundImg(email , serviceCenter:serviceCenter){ 
    const file = this.fileSelected.item(0);
    this.curentFileUpload = new FileUplaod(file);
    this.dataService.pushFileTostorage(this.curentFileUpload , this.progress , email , serviceCenter);
  }

  selectedFile(event , serviceCenter:serviceCenter){
    this.fileSelected = event.target.files;
    this.UploadBackgroundImg(sessionStorage.getItem('email') , serviceCenter);
  }

}
