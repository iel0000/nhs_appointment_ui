import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ISchedule } from '@app/shared/interface';
import { Store } from '@ngrx/store';
import { SelectItem } from 'primeng/api';
import { Subject, takeUntil } from 'rxjs';
import { Site } from 'src/app/shared/constant/site';
import { ResetAppointmentForm, selectRecord, UpdateSchedule } from '../store';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss'],
})
export class ScheduleComponent implements OnInit, OnDestroy {
  site = Site;
  selectedTime!: string;
  scheduleForm: FormGroup;
  appointmentDate!: string;
  private ngUnsubscribe = new Subject<void>();

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private store: Store
  ) {
    this.scheduleForm = this.fb.group({
      site: ['', Validators.required],
      appointmentDate: ['', Validators.required],
      appointmentTime: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.store
      .select(selectRecord)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(s => {
        if (!s.isAcceptedTerms) {
          this.router.navigate(['appointment/notice']);
          return;
        }

        this.scheduleForm.patchValue({
          site: s.schedule.site,
          appointmentDate: s.schedule.appointmentDate,
          appointmentTime: s.schedule.appointmentTime,
        });

        this.appointmentDate = s.schedule.appointmentDate;
      });
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  nextPage() {
    this.store.dispatch(
      UpdateSchedule({ payload: <ISchedule>this.scheduleForm.getRawValue() })
    );
    this.router.navigate(['appointment/personal-info']);
    return;
  }
  prevPage() {
    this.router.navigate(['appointment/notice']);
  }
}
