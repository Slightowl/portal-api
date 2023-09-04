import { Component, Input, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-loading-overlay',
  templateUrl: './loading-overlay.component.html',
  styleUrls: ['./loading-overlay.component.scss']
})
export class LoadingOverlayComponent implements OnInit {
  constructor(private spinner: NgxSpinnerService) {
    this.show = true;
    this.fullScreen = false;
  }

  @Input() show: boolean;
  @Input() fullScreen: boolean;

  ngOnInit(): void {
    this.spinner.show();
  }
}
