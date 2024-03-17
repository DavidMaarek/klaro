import { Component, Input } from '@angular/core';
import { HomeCard } from "../../interfaces/home-cards.interface";
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-home-card',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './home-card.component.html',
  styleUrl: './home-card.component.scss'
})
export class HomeCardComponent {
  @Input() card!: HomeCard;
}
