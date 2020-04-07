import { Injectable } from '@angular/core';
import { Router, CanActivate} from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';

@Injectable({ providedIn: 'root' })

export class AuthGuard implements CanActivate {
  constructor( private router: Router, private auth: AuthenticationService) {
  }

  canActivate(): boolean  {
    if (!this.auth.isExpired()) {
      return true;
    }
    this.router.navigate(['']);
    return false;
  }
}
