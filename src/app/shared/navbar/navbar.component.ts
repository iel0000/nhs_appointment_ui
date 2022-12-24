import { Component, OnInit } from '@angular/core';
import { ResolveEnd, Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  isMenuOpen = false;
  isAppointment = false;

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }
  constructor(private router: Router) {}

  ngOnInit(): void {
    this.router.events.subscribe(routerData => {
      if (routerData instanceof ResolveEnd) {
        if (routerData.url.includes('appointment')) {
          this.isAppointment = true;
        } else {
          this.isAppointment = false;
        }
      }
    });
  }
}
