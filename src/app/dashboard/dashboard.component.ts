import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  userEmail: string;
  userID: string;
  today:any;
  constructor(private fireAuth: AngularFireAuth , private router: Router , private title: Title) { 
    this.today = Date.now();
    this.title.setTitle('Dashboard Admin');
  }
  ngOnInit() {
    this.fireAuth.authState.subscribe(res => {
      if (res) {
        this.userEmail = res.email;
        this.userID = res.uid;
      }
    })
  }

  logoutFromThisWebsite(){
    let confhere = confirm('Are you sure to log out??');
    if (confhere == true) {
      this.fireAuth.auth.signOut();
      sessionStorage.removeItem('email');
      sessionStorage.clear();
      this.router.navigate(['/']);
    } else {
      return false;
    }
  }

}
