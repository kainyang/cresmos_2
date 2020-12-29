import { Component, OnInit } from '@angular/core';
import { HomeContent } from './home-page.model';

@Component({
    selector: 'app-home-page',
    templateUrl: './home-page.component.html',
    styleUrls: ['./home-page.component.scss']
})

export class HomePageComponent implements OnInit {

    homeContent: HomeContent;

    ngOnInit() {
        this.homeContent = {
            eventsImages: [
                'assets/images/events/marine_parade.jpg',
                'assets/images/events/FNG_Fortnite.jpg',
                'assets/images/news/Ignite_Cup_Promo.png',
            ],
            newsImages: [
                'assets/images/events/Ignite_Q1_Champions.png',
            ],
            valueLandImages: [
                'assets/images/valueland/Bountie_Meal_Promo_Players.png',
            ]
        };
    }
}
