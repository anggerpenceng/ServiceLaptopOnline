import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';

@Component({
  selector: 'app-list-center',
  templateUrl: './list-center.component.html',
  styleUrls: ['./list-center.component.scss']
})
export class ListCenterComponent implements OnInit {

  constructor(private fireStore: AngularFirestore) { 

  }

  serviceCollection: AngularFirestoreCollection<any> = this.fireStore.collection('serviceCenter');
  serviceAccess = this. serviceCollection.valueChanges();

  ngOnInit() {
  }

}
