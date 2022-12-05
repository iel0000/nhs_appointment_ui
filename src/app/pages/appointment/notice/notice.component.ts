import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-notice',
  templateUrl: './notice.component.html',
  styleUrls: ['./notice.component.scss'],
})
export class NoticeComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {}
  nextPage() {
    this.router.navigate(['appointment/schedule']);
    return;
  }
}
