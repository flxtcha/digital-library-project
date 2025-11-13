import { Component, ElementRef, Type, ViewChild, ViewContainerRef } from '@angular/core';

@Component({
  selector: 'app-modal',
  imports: [],
  templateUrl: './modal.html',
  styleUrl: './modal.css',
})
export class Modal {
  @ViewChild('modalContainer', { read: ViewContainerRef }) container!: ViewContainerRef;
  @ViewChild('modal') myModal!: ElementRef<HTMLDialogElement>;

  displayModal() {
    this.myModal.nativeElement.showModal();
  }

  closeModal() {
    this.myModal.nativeElement.close();
    this.container.clear()
  }

  loadComponent(component: Type<any>) {
    this.container.clear();
    this.container.createComponent(component);
  }
}