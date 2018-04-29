import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-center',
  templateUrl: './list-center.component.html',
  styleUrls: ['./list-center.component.scss']
})
export class ListCenterComponent implements OnInit {

  constructor(private fireStore: AngularFirestore , private toast: ToastrService, private router: Router) { 

  }

  serviceCollection: AngularFirestoreCollection<any> = this.fireStore.collection('centerHome');
  serviceAccess = this.serviceCollection.valueChanges();

  ngOnInit() {
  }

  logOut(){
    let confirm = window.confirm('Anda yakin mau LogOut');
    if (confirm == true) {
      sessionStorage.removeItem('status');
      sessionStorage.clear();
      this.router.navigate(['']); 
    }else{
      confirm = false;
    }
  }


}
