import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CoreService } from '../core/services/core.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private router: Router,
    private coreService: CoreService) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    if (localStorage.getItem('token') !== null) {
      const roles = next.data['permittedRoles'] as Array<string>;

      if (roles) {
        if (this.coreService.roleMatch(roles)) {
          return true;
        } else {
          this.router.navigate(['/error']);
          return false;
        }
      }

      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
