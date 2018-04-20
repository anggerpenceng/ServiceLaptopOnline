import { Component, OnInit } from '@angular/core';
import { DataService } from '../data-hendler/data.service';
import { NgForm } from '@angular/forms';
import { Article } from '../data-hendler/dataModel';

@Component({
  selector: 'app-add-article',
  templateUrl: './add-article.component.html',
  styleUrls: ['./add-article.component.scss']
})
export class AddArticleComponent implements OnInit {

  articleSelect: Article = new Article();
  constructor(private dataFire: DataService) { }

  ngOnInit() {
  }

  SendTheArticle(artForm:NgForm){
    this.dataFire.AddingArticle(artForm.value);
  }

}
