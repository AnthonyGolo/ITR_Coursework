import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatTabsModule} from '@angular/material/tabs';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { StarRatingModule } from 'angular-star-rating';

import { AppComponent } from './app.component';
import { UiModule } from './ui/ui.module';
import { DashboardComponent } from './views/dashboard/dashboard.component';
import { ProfileComponent } from './views/profile/profile.component';
import { UsersComponent } from './views/users/users.component';
import { BrowseComponent } from './views/browse/browse.component';
import { InstructionComponent } from './views/instruction/instruction.component';
import { LoginComponent } from './views/login/login.component';
import { CreateComponent } from './views/create/create.component';
import { P404Component } from './views/p404/p404.component';
import { MypageComponent } from './views/profile/mypage/mypage.component';
import { TopicsComponent } from './views/browse/topics/topics.component';
import { ConfirmPageComponent } from './views/login/confirmpage/confirm-page.component';
import { GuideitemComponent } from './views/instruction/guideitem/guideitem.component';
import { SearchComponent } from './views/search/search.component';

const appRoutes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'guide/:gid', component: InstructionComponent },
  { path: 'profile/:uid', component: ProfileComponent },
  { path: 'search/:query', component: SearchComponent },
  { path: 'confirm', component: ConfirmPageComponent },
  { path: 'users', component: UsersComponent },
  { path: 'browse', component: BrowseComponent },
  { path: 'create', component: CreateComponent },
  { path: 'login', component: LoginComponent },
  { path: '**', component: P404Component }
];


@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    ProfileComponent,
    UsersComponent,
    BrowseComponent,
    InstructionComponent,
    LoginComponent,
    CreateComponent,
    P404Component,
    MypageComponent,
    TopicsComponent,
    ConfirmPageComponent,
    GuideitemComponent,
    SearchComponent,
  ],
  imports: [
    RouterModule.forRoot(appRoutes),
    StarRatingModule.forRoot(),
    BrowserModule,
    UiModule,
    BrowserAnimationsModule,
    MatTabsModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  exports: [],
})
export class AppModule { }
