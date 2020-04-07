import { Component, OnInit } from '@angular/core';

import { ThemeConfigService } from '../../../../../app/core/services/theme-config.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  year: any;
  constructor(
    public themeConfig: ThemeConfigService,
  ) { }

  ngOnInit() {
    this.year = new Date().getFullYear();
  }

}
