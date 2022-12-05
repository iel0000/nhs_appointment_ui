import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SelectItem } from 'primeng/api';
import { Site } from 'src/app/shared/constant/site';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss'],
})
export class ScheduleComponent implements OnInit {
  site = Site;
  selectedTime!: string;

  constructor(private router: Router) {}

  ngOnInit(): void {}
  nextPage() {
    this.router.navigate(['appointment/personal-info']);
    return;
  }
  prevPage() {
    this.router.navigate(['appointment/notice']);
  }
}
