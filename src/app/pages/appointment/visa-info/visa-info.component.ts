import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Embassy } from '@app/shared/constant/embassy';
import { visaCategory } from '@app/shared/constant/visacategory';
import { visaType } from '@app/shared/constant/visatype';
import { Store } from '@ngrx/store';
import { Subject, takeUntil } from 'rxjs';
import { selectRecord } from '../store';

@Component({
  selector: 'app-visa-info',
  templateUrl: './visa-info.component.html',
  styleUrls: ['./visa-info.component.scss'],
})
export class VisaInfoComponent implements OnInit, OnDestroy {
  visaForm: FormGroup;
  embassy = Embassy;
  visatype = visaType;
  visacategory = visaCategory;

  private ngUnsubscribe = new Subject<void>();

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private store: Store
  ) {
    this.visaForm = this.formBuilder.group({
      id: 0,
      embassy: ['', Validators.required],
      visaType: ['', Validators.required],
      visaCategory: ['', Validators.required],
      isFirstVisa: ['', Validators.required],
      hasVisaRejected: ['', Validators.required],
      lengthOfStay: '0',
      hasLetterReceived: '',
      isTemporaryVisa: '',
      isHealthAssessed: '',
      intendedWork: '0',
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
      });
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  nextPage() {
    this.router.navigate(['appointment/review']);
    return;
  }
  prevPage() {
    this.router.navigate(['appointment/personal-info']);
  }
}
