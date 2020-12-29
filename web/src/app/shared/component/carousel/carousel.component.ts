import { Component, OnInit, Input } from '@angular/core';
import { trigger, transition, useAnimation } from '@angular/animations';
import { slideIn, slideOut, fadeOut, fadeIn, scaleIn, scaleOut, } from './carousel.animations';


@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss'],
  animations: [
    // trigger('carouselAnimation', [
    //   transition(':increment', slideOut),
    //   transition(':decrement', slideIn),
    // ]),
    // trigger('carouselAnimation', [
    //   transition('void => *', [useAnimation(fadeIn)]),
    //   transition('* => void', [useAnimation(fadeOut)]),
    // ]),
    trigger('carouselAnimation', [
      transition('void => *', [useAnimation(scaleIn)]),
      transition('* => void', [useAnimation(scaleOut)]),
    ]),
  ],
})
export class CarouselComponent implements OnInit {

  @Input() slides: string[];

  currentSlide = 0;

  constructor() { }

  ngOnInit(): void {

  }

  onPreviousClick() {
    // if (this.currentSlide > 0) {
    //   this.currentSlide--;
    // }

    const previous = this.currentSlide - 1;
    this.currentSlide = previous < 0 ? this.slides.length - 1 : previous;
    // console.log('previous clicked, new current slide is: ', this.currentSlide);
  }

  onNextClick() {
    // if (this.currentSlide !== this.slides.length - 1) {
    //   this.currentSlide++;
    // }

    const next = this.currentSlide + 1;
    this.currentSlide = next === this.slides.length ? 0 : next;
    // console.log('next clicked, new current slide is: ', this.currentSlide);
  }


}
