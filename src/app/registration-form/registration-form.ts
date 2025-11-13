import { Component, inject} from '@angular/core';
import { Member, MemberService } from '../services/member-service';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-registration-form',
  imports: [ReactiveFormsModule],
  templateUrl: './registration-form.html',
  styleUrl: './registration-form.css',
})

export class RegistrationForm {
  private formBuilder = inject(FormBuilder)
  private memberService = inject(MemberService)
  errorMessage: string | null = null;

  registrationForm = this.formBuilder.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    mobileNumber: ['', [Validators.required, Validators.pattern("[0-9]*"), Validators.minLength(8), Validators.maxLength(10)]],
  });
  
  registerUser(): void {
    if (this.registrationForm.invalid) {
      this.registrationForm.markAllAsTouched();
      return;
    }
    const member = this.registrationForm.value as Member;
    this.memberService.registerUser(member).subscribe({
      next: (response) => {
        console.log('Registration successful:', response);
      },
      error: (error) => {
        console.error('Registration failed:', error);
        this.errorMessage = "Error occured"
      }
    });
  }
}

