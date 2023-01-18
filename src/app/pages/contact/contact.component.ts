import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PrimeNGConfig } from 'primeng/api';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
})
export class ContactComponent implements OnInit {
  contactForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.contactForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      mobileNumber: [
        '',
        [Validators.required, Validators.pattern('[- +()0-9]+')],
      ],
      subject: ['', Validators.required],
      message: ['', Validators.required],
    });
  }

  ngOnInit(): void {}
  displayModal!: boolean;
  showMakati() {
    this.displayModal = true;
  }
  displayModal2!:boolean;
  showDavao(){
    this.displayModal2 = true;
  }
  displayModal3!:boolean;
  showCebu(){
    this.displayModal3 = true;
  }
  displayModal4!:boolean;
  showBaguio(){
    this.displayModal4 = true;
  }
}
