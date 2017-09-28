import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { CalendarModule } from 'angular-calendar';
import { MiniCalendarService } from './_services/index';

import { CoreModule } from './core/core.module';
import { MyCalendarModule } from './calendar/calendar.module';
import { AppComponent } from './app.component';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    BrowserAnimationsModule,
    MaterialModule,
    CoreModule,
    CalendarModule.forRoot(),
    MyCalendarModule
  ],
  providers: [MiniCalendarService],
  bootstrap: [AppComponent]
})
export class AppModule { }
