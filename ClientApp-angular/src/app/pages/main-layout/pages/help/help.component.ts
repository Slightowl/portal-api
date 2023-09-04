import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

type Props = {
  christieWebsiteUrl: string;
}

@Component({
  selector: 'app-help',
  templateUrl: './help.component.html',
  styleUrls: ['./help.component.scss']
})
export class HelpComponent implements OnInit {

  constructor() {
    this.props = {
      christieWebsiteUrl: environment.christieWebsite,
    }
  }

  props: Props;

  ngOnInit(): void { }
}
