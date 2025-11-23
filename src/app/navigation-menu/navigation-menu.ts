import { Component, inject, Type, ViewChild} from '@angular/core';
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
  router = inject(Router); 
  @ViewChild(Modal) modalComponent!: Modal;
  LoginForm = LoginForm;
  RegistrationForm = RegistrationForm;

  goToPage(route: String) {
    this.router.navigate([route]);
  }

  openModal(component: Type<any>) {
    this.modalComponent.loadComponent(component);
    this.modalComponent.displayModal();
  }
}