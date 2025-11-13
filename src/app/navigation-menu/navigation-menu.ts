import { Component, ElementRef, ViewChild, ViewContainerRef} from '@angular/core';
import { ThemeController } from '../theme-controller/theme-controller';
import { Router } from '@angular/router';
import { Modal } from "../modal/modal";
import { RegistrationForm } from '../registration-form/registration-form';
import { LoginForm } from '../login-form/login-form';
import { Logo } from "../logo/logo";

@Component({
  selector: 'app-navigation-menu',
  imports: [ThemeController, Modal, Logo],
  templateUrl: './navigation-menu.html',
  styleUrl: './navigation-menu.css',
})
export class NavigationMenu {
  constructor(private router: Router) {}
  @ViewChild(Modal) modalComponent!: Modal;

  goToPage(route: String) {
    this.router.navigate([route]);
  }

  openRegistrationModal() {
    this.modalComponent.loadComponent(RegistrationForm);
    this.modalComponent.displayModal();
  }
  
  openLoginModal() {
    this.modalComponent.loadComponent(LoginForm);
    this.modalComponent.displayModal();
  }
}