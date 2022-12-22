import { Component, OnInit } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
  
  constructor() { }

  ngOnInit(): void {

  }
  displayModal!: boolean;
  showDialog() {
    this.displayModal = true;
}

}
