import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout/layout.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { ConfirmComponent } from './confirm/confirm.component';
import {NgAisModule} from 'angular-instantsearch';

@NgModule({
  declarations: [LayoutComponent, HeaderComponent, FooterComponent, ConfirmComponent],
  imports: [
    CommonModule,
    NgAisModule
  ],
  exports: [LayoutComponent]
})
export class UiModule { }
