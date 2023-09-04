import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import * as bootstrap from 'bootstrap';
import { ConfirmModalResult } from 'src/app/components/confirm-modal/confirm-modal.component';
import { Router } from '@angular/router';

type Props = {
  christieWebsiteUrl: string;
  showConfirmModal: boolean;
}

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss']
})
export class MainLayoutComponent implements OnInit {

  constructor(private router: Router) { }

  props: Props = {
    christieWebsiteUrl: environment.christieWebsite,
    showConfirmModal: false,
  };

  ngOnInit(): void { }

  onToggleMenu() {
    const btn = document.getElementById('navbar_links_toggle_button');
    if (btn === null || window.getComputedStyle(btn).display === "none") {
      return;
    }

    const el = document.getElementById('navbar_links');
    const collapse = new bootstrap.Collapse(el as Element);
    collapse.toggle();
  }

  onLogout(): void {
    this.props.showConfirmModal = true;
  }

  onLogoutClose(event: ConfirmModalResult): void {
    this.props.showConfirmModal = false;
    if(event.ok) {
      this.router.navigateByUrl('/logout');
    }
    else {
      this.onToggleMenu();
    }
  }
}
