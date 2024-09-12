import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router';
import { AuthService } from '../../auth.service';
import { ValidationService } from '../../validation.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatIconModule,
    CommonModule,
    RouterLink
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  hide: boolean = true;
  loginError: string | null = null;

  // Hardcoded username and password for demo purposes
  private demoUsername = 'test@demo12';
  private demoPassword = 'password123';

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {}

  togglePasswordVisibility() {
    this.hide = !this.hide;
  }

  LoginUser() {
    if (this.loginForm.valid) {
      const { username, password } = this.loginForm.value;
      
      // Simulate authentication check with hardcoded credentials
      if (username === this.demoUsername && password === this.demoPassword) {
        this.authService.storeToken('demo-token');  // Store a fake token locally
        this.router.navigate(['/consumerdashboard']);  // Navigate to dashboard
      } else {
        this.loginError = 'Invalid username or password';  // Show error
      }
    } else {
      this.loginError = 'Please fill in all required fields';
    }
  }
}
