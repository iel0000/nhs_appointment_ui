import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.scss'],
})
export class AppointmentComponent implements OnInit {
  items: MenuItem[];

  constructor(private formBuilder: FormBuilder) {
    this.items = [
      { label: 'Notice', routerLink: 'notice' },
      { label: 'Schedule', routerLink: 'schedule' },
      { label: 'Personal Info', routerLink: 'personal-info' },
      { label: 'Visa Info', routerLink: 'visa-info' },
      { label: 'Review', routerLink: 'review' },
    ];
  }

  ngOnInit(): void {}
}
