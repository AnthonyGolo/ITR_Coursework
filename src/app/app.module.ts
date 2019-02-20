import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatTabsModule} from '@angular/material/tabs';

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
import { StepComponent } from './views/instruction/step/step.component';
import { CommentComponent } from './views/instruction/comment/comment.component';
import { MypageComponent } from './views/profile/mypage/mypage.component';
import { UserComponent } from './views/users/user/user.component';
import { TopicsComponent } from './views/browse/topics/topics.component';
import { PageComponent } from './views/browse/page/page.component';

const appRoutes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'guide/:gid', component: InstructionComponent },
  { path: 'profile/:uid', component: ProfileComponent },
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
    StepComponent,
    CommentComponent,
    MypageComponent,
    UserComponent,
    TopicsComponent,
    PageComponent
  ],
  imports: [
    RouterModule.forRoot(appRoutes),
    BrowserModule,
    UiModule,
    BrowserAnimationsModule,
    MatTabsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
