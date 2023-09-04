import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-token-redirect',
  templateUrl: './token-redirect.component.html',
  styleUrls: ['./token-redirect.component.scss']
})
export class TokenRedirectComponent implements OnInit {

  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    const token = this.route.snapshot.paramMap.get('token') || '';
    const path = this.route.snapshot.url[0].path || '';

    this.router.navigateByUrl(`/login?token=${token}&path=${path}`);
  }
}
