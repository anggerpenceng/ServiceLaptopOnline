import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AngularFirestore } from 'angularfire2/firestore';
import { adminCostum } from '../data-hendler/dataModel';
import { Router } from '@angular/router';

@Component({
  selector: 'app-article-login',
  templateUrl: './article-login.component.html',
  styleUrls: ['./article-login.component.scss']
})
export class ArticleLoginComponent implements OnInit {

  selArticleAdmin:adminCostum = new adminCostum();
  logCondition:boolean;
  dataAdmin:any;
  constructor(private fireStore: AngularFirestore , private toast: ToastrService , private router:Router) { 
    this.logCondition = false;
  }

  ngOnInit() {
  }


  loginWithCostumAdmin(fromData:NgForm){
    this.openLoading();
    let setQuery = this.fireStore.collection('costumAdmin').ref;
    let qryCheckEmail = setQuery.where('email' , '==' , fromData.value.email).where('password' , '==' , fromData.value.password);

    qryCheckEmail.get().then(value => {
      if (value.empty) {
        this.hideLoading();
        this.toast.error('You dont have an email' , 'Sorry !!');
      }else{
        this.hideLoading();
        sessionStorage.setItem('status' , 'logged');
        this.toast.success('Welcome' , 'DONE!');
        this.router.navigate(['ListCenter']);
      }
    })
  }

  openLoading(){
    this.logCondition = true;
  }

  hideLoading(){
    this.logCondition = false;
  }

}
