import { Component, OnInit, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';
import { environment } from '../../environments/environment';
import { UserService } from '../shared/services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  environment = environment;
  isNavbarCollapsed = true;
  user;
  constructor(@Inject(DOCUMENT) private document: any,
              private userService: UserService) {
    this.user = this.userService.getUser();
    this.userService.user.subscribe((user) => {
      this.user = user;
    });
  }

  ngOnInit() {
  }

  isLoggedIn(): boolean {
    return !!this.user;
  }

  doLogin(): void {
    this.document.location.href = this.environment.backend + '/signup';
  }

  doLogout(): void {
    this.userService.logout();
  }
}
