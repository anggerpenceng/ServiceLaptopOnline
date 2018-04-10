import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { NgForm } from '@angular/forms';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';
import { DataService } from '../data-hendler/data.service';
import { loginAdmin } from '../data-hendler/dataModel';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login-admin',
  templateUrl: './login-admin.component.html',
  styleUrls: ['./login-admin.component.scss']
})
export class LoginAdminComponent implements OnInit {
  logCondition:boolean;
  selectedAdminData: loginAdmin = new loginAdmin();
  constructor(private title: Title , private firebaseAuth: AngularFireAuth , private router: Router
  , public dataHendler: DataService , private toast: ToastrService) { 
    this.logCondition = false;
  }

  ngOnInit() {
    this.title.setTitle('Login For Admin');
  }

  loginWithEmailandPassword(loginAdmin: NgForm){
    this.openLoading();
    this.firebaseAuth.auth
    .signInWithEmailAndPassword(loginAdmin.value.email , loginAdmin.value.password)
    .then(value => {
      this.hideLoading();
      this.router.navigate(['/ListCenter']);
    })
    .catch(err => {
      this.hideLoading();
      this.toast.error('Your Email and Password miss match' , 'Oopps!!');
    })

  }

  openLoading(){
    this.logCondition = true;
  }

  hideLoading(){
    this.logCondition = false;
  }

}
