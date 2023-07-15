import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { UsersService } from '../../services/users.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent {
  userForm!: FormGroup; // Formulario reactivo
  locales: string[] = ['Local 1', 'Local 2', 'Local 3'];

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private userService: UsersService
  ) {}

  private router = inject(Router);

  initializeForm() {
    this.userForm = this.formBuilder.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      selectedLocale: ['', Validators.required],
    });
  }

  onSubmit() {
    if(!this.userForm.valid) return;

    console.log(this.userForm.value)
    // this.userService.addUser(this.userForm);
  }

  onLogout() {
    this.authService.logout();
    this.router.navigateByUrl('login');
  }
}
