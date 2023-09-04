import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Logger } from 'src/lib/services/logging/logger';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss']
})
export class NotFoundComponent implements OnInit {

  constructor(
    private router: Router,
    private logger: Logger
  ) { }

  ngOnInit(): void {
    this.logger.error(`Route not found: '${this.router.url}'`);
  }
}
