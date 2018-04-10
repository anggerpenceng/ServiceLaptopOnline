import { Injectable } from '@angular/core';
import { loginAdmin , serviceCenter } from './dataModel';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import 'firebase/storage';
import * as firebase from 'firebase';
import { Observable } from '@firebase/util';
import { ToastrService } from 'ngx-toastr';
import { CreateServiceComponent } from '../create-service/create-service.component';
import { Router } from '@angular/router';

@Injectable()
export class DataService {

  adminDataList: loginAdmin = new loginAdmin();
  serviceCenterList: serviceCenter = new serviceCenter();
  center:Observable<serviceCenter[]>;
  CenterDoc: AngularFirestoreDocument<serviceCenter>;
  dataStatus:boolean;

  constructor(private fireStore: AngularFirestore , private toast: ToastrService , private router: Router) { }

  CenterColection: AngularFirestoreCollection<any> = this.fireStore.collection('serviceCenter');

  InsertDataToFirestore(serviceCenter:serviceCenter):boolean{
    this.CenterColection.add(
      { 
        serviceName: serviceCenter.serviceName , 
        address: serviceCenter.address,
        email : serviceCenter.email,
        numphone: serviceCenter.number
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

}
