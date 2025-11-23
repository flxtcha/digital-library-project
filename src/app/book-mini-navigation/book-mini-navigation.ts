import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-book-mini-navigation',
  imports: [RouterLink, RouterLinkActive, RouterOutlet],
  templateUrl: './book-mini-navigation.html',
  styleUrl: './book-mini-navigation.css',
})
export class BookMiniNavigation {
}