import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

type Props = {
  christieWebsiteUrl: string;
}

@Component({
  selector: 'app-public-home',
  templateUrl: './public-home.component.html',
  styleUrls: ['./public-home.component.scss']
})
export class PublicHomeComponent implements OnInit {

  constructor() {
    this.props = {
      christieWebsiteUrl: environment.christieWebsite,
    }
  }

  props: Props;

  ngOnInit(): void { }
}
