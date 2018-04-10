import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DataService } from '../data-hendler/data.service';
import { serviceCenter } from '../data-hendler/dataModel';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-service',
  templateUrl: './create-service.component.html',
  styleUrls: ['./create-service.component.scss']
})
export class CreateServiceComponent implements OnInit {
  logCondition:boolean;
  statusCreate:boolean;
  statusCreateFalse:boolean;
  tryhere:boolean;
  centerHomein: serviceCenter = new serviceCenter();

  constructor(private dataService: DataService , private toast: ToastrService , private router: Router) { 
    this.statusCreate = false;
    this.statusCreateFalse = false;
    this.logCondition = false;
    this.tryhere = false;
  }

  ngOnInit() {
    
  }

  InsertDataFirestore(centerHome: NgForm){
    this.ShowLoading();
    this.dataService.InsertDataToFirestore(centerHome.value);
    this.HideLoading();
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
