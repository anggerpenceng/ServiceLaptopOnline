import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';


import { AppComponent } from './app.component';
import { HomepageComponent } from './homepage/homepage.component';
import { routering } from './data-hendler/routering';


@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent
  ],
  imports: [
    BrowserModule , RouterModule.forRoot(routering)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
