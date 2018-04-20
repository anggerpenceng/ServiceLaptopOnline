import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';

@Component({
  selector: 'app-list-article',
  templateUrl: './list-article.component.html',
  styleUrls: ['./list-article.component.scss']
})
export class ListArticleComponent implements OnInit {

  constructor(private fireStore: AngularFirestore) { }

  articleCollection:AngularFirestoreCollection<any>;
  articleAccess:any;

  ngOnInit() {
    this.articleCollection = this.fireStore.collection('article');
    this.articleAccess = this.articleCollection.valueChanges();
  }

}
