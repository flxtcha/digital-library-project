import { Component, signal } from '@angular/core';
import { NavigationMenu } from './navigation-menu/navigation-menu';
import { Footer } from './footer/footer';
import { BookMiniNavigation } from "./book-mini-navigation/book-mini-navigation";

@Component({
  selector: 'app-root',
  imports: [NavigationMenu, Footer, BookMiniNavigation],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('digital-library');
}