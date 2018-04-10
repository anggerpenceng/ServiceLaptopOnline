import { Component, OnInit } from '@angular/core';
import { loginAdmin } from '../data-hendler/dataModel';
import { AngularFireAuth } from 'angularfire2/auth';
import { NgForm } from '@angular/forms';

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
  constructor(private fireAuth: AngularFireAuth) {
    this.statusCreate = false;
    this.statusCreateFalse = false;
    this.logCondition = false;
  }

  ngOnInit() {
  }

  CreateNewAdmin(createAdmin: NgForm){
    this.ShowLoading();
    this.fireAuth
        .auth
        .createUserWithEmailAndPassword(createAdmin.value.email , createAdmin.value.password)
        .then(value => {
          this.HideLoading();
          this.statusCreate = true;
          this.statusCreateFalse = false;
        })
        .catch(err => {
          this.HideLoading();
          this.statusCreate = false;
          this.statusCreateFalse = true;
        })
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

}
