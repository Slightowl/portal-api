import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor() {
    const start = 2021;
    const current = new Date().getFullYear();

    this.copyrightYear = 
      current === start
        ? `${current}`
        : `${start}-${current}`
  }

  copyrightYear: string;
}
