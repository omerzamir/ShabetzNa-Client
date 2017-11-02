import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { Routes, RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { CalendarModule } from 'angular-calendar';
import { MiniCalendarService, SidebarService } from './_services/index';

import { DialogsModule } from './dialogs/dialogs.module';
import { CoreModule } from './core/core.module';
import { MyCalendarModule } from './calendar/calendar.module';
import { AppComponent } from './app.component';
import { MainPageComponent } from './main-page/main-page.component';

export const ROUTES: Routes = [
  { path: '', component: MainPageComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    MainPageComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(ROUTES),
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    BrowserAnimationsModule,
    MaterialModule,
    DialogsModule,    
    CoreModule,
    CalendarModule.forRoot(),
    MyCalendarModule,
  ],
  providers: [
    MiniCalendarService,
    SidebarService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
