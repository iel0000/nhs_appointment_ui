import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Category } from '@app/shared/constant/category';
import { CiviStatus } from '@app/shared/constant/civilStatus';
import { Gender } from '@app/shared/constant/gender';
import { Referred } from '@app/shared/constant/referred';

@Component({
  selector: 'app-personal',
  templateUrl: './personal.component.html',
  styleUrls: ['./personal.component.scss'],
})
export class PersonalComponent implements OnInit {
  personalForm: FormGroup;
  gender = Gender;
  categories = Category;
  civilStatus = CiviStatus;
  referrals = Referred;

  today: Date;
  birthDate!: string;
  dateIssued!: string;

  constructor(private router: Router, private formBuilder: FormBuilder) {
    this.today = new Date();
    this.personalForm = this.formBuilder.group({
      id: 0,
      personalCategory: ['', Validators.required],
      referral: ['', Validators.required],
      firstName: ['', [Validators.required, Validators.pattern(/[\S]/)]],
      lastName: ['', [Validators.required, Validators.pattern(/[\S]/)]],
      middleName: ['', [Validators.required, Validators.pattern(/[\S]/)]],
      birthDate: ['', [Validators.required, Validators.pattern(/[\S]/)]],
      age: ['', [Validators.required, Validators.pattern(/[\S]/)]],
      gender: ['', [Validators.required, Validators.pattern(/[\S]/)]],
      mobileNumber: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.pattern(/[\S]/)]],
      address: ['', [Validators.required, Validators.pattern(/[\S]/)]],
      eMedicalRefNo: ['', [Validators.required, Validators.pattern(/[\S]/)]],
      civilStatus: ['', Validators.required],
      hasMenstrualPeriod: false,
      menstrualPeriodStart: '',
      menstrualPeriodEnd: '',
      intendedOccupation: ['', Validators.required],
      hasPassport: false,
      passportNumber: ['', Validators.required],
      dateIssued: ['', Validators.required],
      isExpired: [false, Validators.required],
      hasOtherId: false,
      otherId: '',
      landLineNumber: ['', Validators.required],
      isAcceptedTerms: [false, Validators.requiredTrue],
    });
  }

  ngOnInit(): void {}

  // Menstrual Validation
  validateMenstrualDates(event: any) {
    this.personalForm.get('menstrualPeriodStart')?.patchValue('');
    this.personalForm.get('menstrualPeriodEnd')?.patchValue('');
    if (event.checked) {
      this.personalForm
        .get('menstrualPeriodStart')
        ?.addValidators(Validators.required);
      this.personalForm
        .get('menstrualPeriodEnd')
        ?.addValidators(Validators.required);
    } else {
      this.personalForm.get('menstrualPeriodStart')?.setValidators(null);
      this.personalForm.get('menstrualPeriodEnd')?.setValidators(null);
    }

    this.personalForm.get('menstrualPeriodStart')?.updateValueAndValidity();
    this.personalForm.get('menstrualPeriodEnd')?.updateValueAndValidity();
  }
  // Calculate Age
  calculateAge() {
    let control = this.personalForm.get('birthDate');
    console.log(control?.value);
    let age = 0;
    if (!control?.invalid) {
      let timeDiff = Math.abs(Date.now() - new Date(control?.value).getTime());
      age = Math.floor(timeDiff / (1000 * 3600 * 24) / 365.25);
    }

    this.personalForm.patchValue({ age: age });
  }
  // Other ID
  validateOtherId(event: any) {
    this.personalForm.get('otherId')?.patchValue('');
    if (event.checked) {
      this.personalForm.get('otherId')?.addValidators(Validators.required);
    } else {
      this.personalForm.get('otherId')?.setValidators(null);
      this.personalForm.get('otherId')?.setErrors(null);
    }

    this.personalForm.get('otherId')?.updateValueAndValidity();
  }
  // Email Validator

  validateEmail($event: Event) {
    if ($event) {
      this.personalForm.get('email')?.addValidators(Validators.email);
    } else {
      this.personalForm.get('email')?.removeValidators;
    }
  }

  // Control Validator
  validateControl(controlName: string): boolean {
    if (
      (this.personalForm.get(controlName)?.dirty ||
        this.personalForm.get(controlName)?.touched) &&
      this.personalForm.get(controlName)?.invalid
    ) {
      return true;
    }
    return false;
  }
  nextPage() {
    this.router.navigate(['appointment/visa-info']);
    return;
  }
  prevPage() {
    this.router.navigate(['appointment/schedule']);
  }
}
