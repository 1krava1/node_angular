import { Component, OnInit, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  environment = environment;
  isNavbarCollapsed = true;
  constructor(@Inject(DOCUMENT) private document: any) { }

  ngOnInit() {
  }

  doLogin(): void {
    this.document.location.href = this.environment.backend + '/auth';
  }
}
