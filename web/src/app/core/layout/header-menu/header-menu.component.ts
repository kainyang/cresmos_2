import { Component, OnInit, ViewChild } from '@angular/core';
import { CoreService } from '../../services/core.service';
import { Router } from '@angular/router';
import { WindowService } from '../../services/window.service';
import { TabNavLink } from '../../models/core.model';
import { ProfileService } from 'src/app/profile/profile.service';
import { UserProfile } from 'src/app/profile/profile.model';

@Component({
    selector: 'app-header-menu',
    templateUrl: 'header-menu.component.html',
    styleUrls: ['header-menu.component.scss']
})

export class HeaderMenuComponent implements OnInit {

    isLoggedIn = false;
    mobileNavOpen = false;

    isMobileDevice: boolean;

    navLinks: TabNavLink[];
    guestLinks: TabNavLink[];
    profileLinks: TabNavLink[];

    userPoints: number;

    constructor(
        private router: Router,
        private coreService: CoreService,
        private windowService: WindowService,
        private profileService: ProfileService) { }

    ngOnInit() {
        this.isMobileDevice = this.windowService.isMobileDevice();

        this.isUserLoggedIn();

        this.coreService.observeStorage().subscribe(res => {
            this.isUserLoggedIn();
        });

        this.configureHomePageLinks();
        this.configureGuestLinks();
        this.configureProfileLinks();

        if (this.isLoggedIn) {
            this.profileService.getUserProfile().subscribe((res: UserProfile) => {
                this.userPoints = res.points;
            });
        }
    }

    isUserLoggedIn() {
        if (localStorage.getItem('token') !== null) {
            this.isLoggedIn = true;
        } else {
            this.isLoggedIn = false;
        }
    }

    isCustomer() {
        return this.coreService.roleMatch(['Customer']);
    }

    onLogout() {
        this.coreService.removeItem('token');
        this.router.navigate(['/login']);

        if (this.mobileNavOpen) {
            this.mobileNavOpen = !this.mobileNavOpen;
        }
    }

    navigateToSignUp() {
        this.router.navigate(['/register']);
    }

    navigateToLogin() {
        this.router.navigate(['/login']);
    }

    navigateToProfile() {
        this.router.navigate(['/profile']);
    }

    toggleMobileNav() {
        this.mobileNavOpen = !this.mobileNavOpen;
    }

    private configureHomePageLinks() {
        this.navLinks = [
            new TabNavLink('Home', '/home', 'home'),
            new TabNavLink('Events', '/event', 'calendar'),
            new TabNavLink('Value Land', '/value-land', 'shop'),
        ];
    }

    private configureGuestLinks() {
        this.guestLinks = [
            new TabNavLink('Log in', '/login', 'logout'),
            new TabNavLink('Register', '/register', 'register'),
        ];
    }

    private configureProfileLinks() {
        this.profileLinks = [
            new TabNavLink('Dashboard', '/profile/dashboard', 'dashboard'),
            new TabNavLink('Vault', '/profile/vault', 'vault'),
            new TabNavLink('Activity', '/profile/activity', 'activity'),
            new TabNavLink('Inbox', '/profile/inbox', 'inbox'),
            new TabNavLink('Settings', '/profile/settings', 'settings'),
        ];
    }
}
