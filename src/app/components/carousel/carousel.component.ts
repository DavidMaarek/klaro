import { Component, ElementRef, HostListener, Input, ViewChild } from '@angular/core';
import { HomeCardComponent } from "@components/home-card/home-card.component";
import { HomeCard } from "@interfaces/home-cards.interface";

@Component({
  selector: 'app-carousel',
  standalone: true,
  imports: [
    HomeCardComponent
  ],
  templateUrl: './carousel.component.html',
  styleUrl: './carousel.component.scss'
})
export class CarouselComponent {
  @Input() cards!: HomeCard[];
  @ViewChild('klCarousel') public klCarousel!: ElementRef<HTMLUListElement>;
  @ViewChild('klCarouselCard') public klCarouselCard!: ElementRef<HTMLElement>;
  public displayLeftArrow: boolean = false
  public displayRightArrow: boolean = false

  @HostListener('window:resize', [''])
  public updateCarousel(): void {
    if (!this.klCarousel) return;
    const klCarouselNE: HTMLUListElement = this.klCarousel.nativeElement;
    const scrollLeft: number = klCarouselNE.scrollLeft;
    const scrollWidth: number = klCarouselNE.scrollWidth;
    const clientWidth: number = klCarouselNE.clientWidth;
    const windowInnerWidth: number = window.innerWidth;
    const carouselPadding: number = 16;

    this.displayLeftArrow = scrollLeft > carouselPadding;
    this.displayRightArrow = windowInnerWidth < scrollWidth;

    // On masque la fleche de droite si
    if(
      // La taille de la fenêtre est < à la taille des elements du carousel
      windowInnerWidth > scrollWidth ||
      // Le scroll max est atteint
      scrollLeft + clientWidth >= scrollWidth - carouselPadding
    ) {
      this.displayRightArrow = false;
    }
  }

  public scroll(direction: 'left' | 'right'): void {
    if (!this.klCarousel || !this.klCarouselCard) return;
    const scrollChange: number = direction === 'left' ? -this.klCarouselCard.nativeElement.offsetWidth : this.klCarouselCard.nativeElement.offsetWidth;
    this.klCarousel.nativeElement.scroll({
      left: this.klCarousel.nativeElement.scrollLeft + scrollChange,
      top: 0,
      behavior: 'smooth',
    });
  }
}
