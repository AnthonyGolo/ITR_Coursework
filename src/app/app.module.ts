import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

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

const appRoutes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'guide/:gid', component: InstructionComponent },
  { path: 'profile/:uid', component: ProfileComponent },
  /*{
    path: 'heroes',
    component: HeroListComponent,
    data: { title: 'Heroes List' }
  },
  { path: '',
    redirectTo: '/heroes',
    pathMatch: 'full'
  },*/
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
    CommentComponent
  ],
  imports: [
    RouterModule.forRoot(appRoutes),
    BrowserModule,
    UiModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
