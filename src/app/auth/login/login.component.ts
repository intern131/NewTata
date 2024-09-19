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
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  imports: [FormsModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule, CommonModule

  ],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  hide: boolean = true;
  loginError: string | null = null;

  // Hardcoded credentials for different users
  private warehouseUsername = 'warehouse';
  private warehousePassword = 'warehouse';

  private adminUsername = 'admin';
  private adminPassword = 'admin';

  private deliveryUsername = 'delivery';
  private deliveryPassword = 'delivery';

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private _snackBar: MatSnackBar
  ) {
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {}

  // Toggle password visibility
  togglePasswordVisibility() {
    this.hide = !this.hide;
  }

  // Handle user login
  LoginUser() {
    if (this.loginForm.valid) {
      const { username, password } = this.loginForm.value;

      // Warehouse Login
      if (username === this.warehouseUsername && password === this.warehousePassword) {
        this.authService.storeToken('warehouse-token');  // Store token in localStorage
        this.router.navigate(['/warehouse-dashboard']);  // Redirect to Warehouse Dashboard
      }
      // Admin Login
      else if (username === this.adminUsername && password === this.adminPassword) {
        this.authService.storeToken('admin-token');  // Store token in localStorage
        this.router.navigate(['/admin-dashboard']);  // Redirect to Admin Dashboard
      }
      // Delivery Guy Login
      else if (username === this.deliveryUsername && password === this.deliveryPassword) {
        this.authService.storeToken('delivery-token');  // Store token in localStorage
        this.router.navigate(['/delivery-dashboard']);  // Redirect to Delivery Dashboard
      }
      // Invalid credentials
      else {
        this.loginError = 'Invalid username or password';
        this._snackBar.open(this.loginError, 'OK', {
          duration: 2000,
        });
      }
    } else {
      this.loginError = 'Please fill in all required fields';
      this._snackBar.open(this.loginError, 'OK', {
        duration: 2000,
      });
    }
  }
}
