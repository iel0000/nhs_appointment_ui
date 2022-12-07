import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { SharedModule } from '@shared/shared.module';
import { AppRoutingModule } from '@app/app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { NavbarComponent } from '@shared/navbar/navbar.component';
import { HomeComponent } from '@app/pages/home/home.component';
import { AppointmentComponent } from '@app/pages/appointment/appointment.component';
import {
  NoticeComponent,
  PersonalComponent,
  ReviewComponent,
  ScheduleComponent,
  VisaInfoComponent,
} from '@app/pages/appointment';
import { StoreModule } from '@ngrx/store';
import { appointmentPageReducer } from '@app/pages/appointment/store/appointment.reducer';
import { ErrorComponent } from '@app/pages/error/error.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { LoadingInterceptor } from '@core/interceptor';
import { SpinnerComponent } from './spinner/spinner.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    AppointmentComponent,
    NoticeComponent,
    ScheduleComponent,
    PersonalComponent,
    VisaInfoComponent,
    ReviewComponent,
    ErrorComponent,
    SpinnerComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    StoreModule.forRoot({ appointment: appointmentPageReducer }),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoadingInterceptor,
      multi: true,
    },
    DatePipe,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
