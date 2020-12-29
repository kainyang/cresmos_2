import { Component, OnInit } from '@angular/core';
import { GameIcon, GameTitle, UserProfile, UserDashboard } from '../profile.model';
import { ProgressBarMode } from '@angular/material/progress-bar';
import { ThemePalette } from '@angular/material/core';
import { ProfileService } from '../profile.service';
import { LoadingScreenService } from 'src/app/core/loadingScreen/loading-screen.service';
import { CatalogueType } from 'src/app/value-land/value-land.model';
import { WindowService } from 'src/app/core/services/window.service';

@Component({
    selector: 'app-dashboard',
    templateUrl: 'dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})

export class DashboardComponent implements OnInit {

    gameTitle = GameTitle;
    color: ThemePalette = 'primary';
    mode: ProgressBarMode = 'determinate';
    value = 30;
    gamesIcon: GameIcon[];
    fullName: string;
    shortName: string;
    userDashboard: UserDashboard;
    iconCount: number;

    isMobileDevice = false;

    constructor(private profileService: ProfileService,
        private windowService: WindowService,
        private loadingScreenService: LoadingScreenService) { }

    ngOnInit() {
        this.gamesIcon = [
            {
                gameTitle: GameTitle.Hearthstone,
                imageURL: 'assets/images/games/hearthstone_logo.png'
            },
            {
                gameTitle: GameTitle.LeageOfLegends,
                imageURL: 'assets/images/games/league-of-legends-icon.png'
            },
            {
                gameTitle: GameTitle.Overwatch,
                imageURL: 'assets/images/games/overwatch-icon.png'
            },
        ];

        this.isMobileDevice = this.windowService.isMobileDevice();

        this.loadingScreenService.show();
        this.profileService.getUserDashboard().subscribe(
            res => {
                this.userDashboard = res;
                this.fullName = this.userDashboard.firstName + ' ' + this.userDashboard.lastName;
                this.shortName = this.fullName.split(' ').map(n => n[0]).join('');
                this.loadingScreenService.hide();
                this.iconCount = res.items.filter(x => x.catalogueType === CatalogueType.Icon).length;
            },
            err => {
                console.log(err);
                this.loadingScreenService.hide();
            }
        );
    }

    getPlacingColour(placing: number) {
        switch (placing) {
            case 1:
                return 'gold';
            case 2:
                return 'silver';
            case 3:
                return 'bronze';
            default:
                break;
        }
    }

    getGameIcon(gameTitle: GameTitle) {
        switch (gameTitle) {
            case GameTitle.Hearthstone:
                return 'assets/images/games/hearthstone_logo.png';
            case GameTitle.LeageOfLegends:
                return 'assets/images/games/league-of-legends-icon.png';
            case GameTitle.Overwatch:
                return 'assets/images/games/overwatch-icon.png';
            default:
                break;
        }
    }
}
