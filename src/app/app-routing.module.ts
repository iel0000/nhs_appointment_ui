import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppointmentComponent } from './pages/appointment/appointment.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { HomeComponent } from './pages/home/home.component';
import {
  NoticeComponent,
  PersonalComponent,
  ReviewComponent,
  ScheduleComponent,
  VisaInfoComponent,
} from './pages/appointment';
import { ErrorComponent } from './pages/error/error.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'appointment',
    component: AppointmentComponent,
    children: [
      { path: '', redirectTo: 'notice', pathMatch: 'full' },
      { path: 'notice', component: NoticeComponent },
      { path: 'schedule', component: ScheduleComponent },
      { path: 'personal-info', component: PersonalComponent },
      { path: 'visa-info', component: VisaInfoComponent },
      { path: 'review', component: ReviewComponent },
    ],
  },
  {
    path: '**',
    component: ErrorComponent, //add error page
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
