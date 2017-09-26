import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material.module';
import { NavComponent } from './nav/nav.component';
import { FooterComponent } from './footer/footer.component';
import { MiniCalendarComponent } from './sidebar/mini-calendar/mini-calendar.component';
import { SidebarComponent } from './sidebar/sidebar.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule
  ],
  declarations: [
    NavComponent,
    FooterComponent,
    MiniCalendarComponent,
    SidebarComponent,
  ],
  exports: [
    NavComponent,
    FooterComponent,
    MiniCalendarComponent,
    SidebarComponent
  ]
})
export class CoreModule { }
