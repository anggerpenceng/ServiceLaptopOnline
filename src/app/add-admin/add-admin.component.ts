import { Component, OnInit } from '@angular/core';
import { loginAdmin, serviceCenter } from '../data-hendler/dataModel';
import { AngularFireAuth } from 'angularfire2/auth';
import { NgForm } from '@angular/forms';
import { DataService } from '../data-hendler/data.service';
import { Router } from '@angular/router';
import { AngularFirestore } from 'angularfire2/firestore';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-admin',
  templateUrl: './add-admin.component.html',
  styleUrls: ['./add-admin.component.scss']
})
export class AddAdminComponent implements OnInit {
  logCondition:boolean;
  statusCreate:boolean;
  statusCreateFalse:boolean;
  selectedAdminData: loginAdmin = new loginAdmin();
  tryhere:boolean;
  centerHomein: serviceCenter = new serviceCenter();
  constructor(private fireAuth: AngularFireAuth , private dataService: DataService  , private router: Router,
  private fireStroe: AngularFirestore , private toast:ToastrService) {
    this.statusCreate = false;
    this.statusCreateFalse = false;
    this.logCondition = false;
  }

  ngOnInit() {

  }

  TakeActionInsertData(formDatas: NgForm){
    this.ShowLoading();

    let setCheck = this.fireStroe.collection('serviceCenter').ref;
    let qryCheck = setCheck.where('email' , '==' , formDatas.value.email);
    qryCheck.get().then((snapShot) => {
      if (snapShot.empty) {
        this.CreateNewAdmin(formDatas);
        this.InsertDataFirestore(formDatas);
        this.HideLoading();
      }else{
        this.HideLoading();
        this.toast.error("Sorry This email has already exist" , "Warning!");
      }
    })

  }

  CreateNewAdmin(createAdmin: NgForm){
    this.fireAuth
        .auth
        .createUserWithEmailAndPassword(createAdmin.value.email , createAdmin.value.password)
        .then(value => {
          this.statusCreate = true;
          this.statusCreateFalse = false;
        })
        .catch(err => {
          this.statusCreate = false;
          this.statusCreateFalse = true;
        })
  }

  

  InsertDataFirestore(centerHome: NgForm){
    this.dataService.InsertDataToFirestore(centerHome.value);
    this.router.navigate(['/ListCenter']);
  }


  BtnTryAgain(){
    this.statusCreateFalse = false;
  }
  ShowLoading(){
    this.logCondition = true;
  }
  HideLoading(){
    this.logCondition = false;
  }
  OnchangeEvent(eve : any){
    this.tryhere = !this.tryhere;
  }

}
