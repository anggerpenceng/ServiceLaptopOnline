import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';

import { HomepageComponent } from '../homepage/homepage.component';
import { LoginpageComponent } from '../loginpage/loginpage.component';
import { LoginAdminComponent } from '../login-admin/login-admin.component';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { HomedashComponent } from '../homedash/homedash.component';
import { AddAdminComponent } from '../add-admin/add-admin.component';
import { UserguidComponent } from '../userguid/userguid.component';
import { ListCenterComponent } from '../list-center/list-center.component';
import { ArticleLoginComponent } from '../article-login/article-login.component';
import { ListArticleComponent } from '../list-article/list-article.component';
import { AddArticleComponent } from '../add-article/add-article.component';

export const routering:Routes = [
    {path: '' , component: HomepageComponent},
    {path: 'login' , component: LoginpageComponent},
    {path: 'loginAdmin' , component: LoginAdminComponent},
    {
        path: 'Dashboard' , component:DashboardComponent , children: [
            {path: '' , component: HomedashComponent}
    ]
    },
    {path: 'MakeCenter' , component:AddAdminComponent},
    {path: 'UserGuid' , component:UserguidComponent},
    {path: 'ListCenter' , component:ListCenterComponent},
    {path: 'loginArticle' , component: ArticleLoginComponent},
    {path: 'listArticle' , component:ListArticleComponent},
    {path: 'addArticle' , component:AddArticleComponent}
]
