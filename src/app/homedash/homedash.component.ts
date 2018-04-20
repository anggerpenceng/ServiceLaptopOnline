import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';
import { DataService } from '../data-hendler/data.service';
import { serviceCenter } from '../data-hendler/dataModel';
import { AngularFirestore } from 'angularfire2/firestore';

declare var $: any;
@Component({
  selector: 'app-homedash',
  templateUrl: './homedash.component.html',
  styleUrls: ['./homedash.component.scss']
})
export class HomedashComponent implements OnInit {

  userEmail: string;
  userID: string;
  centerData: any;
  constructor(private fireAuth: AngularFireAuth , private router: Router , private dataService: DataService, private fireStore:AngularFirestore) { 
    this.centerData = fireStore.collection('serviceCenter').ref.where('email' , '==' , 'jhony@gmail.com')
    .get().then(snapshot => {
      snapshot.docs.forEach(doc => {
        console.log(doc.data());
      })
    })
  }

  ngOnInit() {
    //Email get data
    this.fireAuth.authState.subscribe(res => {
      if (res) {
        this.userEmail = res.email;
        this.userID = res.uid;
      }
    })
    

    //Get Data Center
    

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

}
