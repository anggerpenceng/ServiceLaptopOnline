import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';

import { HomepageComponent } from '../homepage/homepage.component';
import { LoginpageComponent } from '../loginpage/loginpage.component';
import { LoginAdminComponent } from '../login-admin/login-admin.component';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { HomedashComponent } from '../homedash/homedash.component';

export const routering:Routes = [
    {path: '' , component: HomepageComponent},
    {path: 'login' , component: LoginpageComponent},
    {path: 'loginAdmin' , component: LoginAdminComponent},
    {
        path: 'Dashboard' , component:DashboardComponent , children: [
            {path: '' , component: HomedashComponent}
    ]
}
]
