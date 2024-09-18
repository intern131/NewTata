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
    private _snackBar : MatSnackBar
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

      // Warehouse Login
      if (username === this.warehouseUsername && password === this.warehousePassword) {
        this.authService.storeToken('warehouse-token');  // Store a fake token
        this.router.navigate(['/warehouse-dashboard']);  // Redirect to Warehouse Dashboard
      }
      // Admin Login
      else if (username === this.adminUsername && password === this.adminPassword) {
        this.authService.storeToken('admin-token');  // Store a fake token
        this.router.navigate(['/admin-dashboard']);  // Redirect to Admin Dashboard
      }
      // Delivery Guy Login
      else if (username === this.deliveryUsername && password === this.deliveryPassword) {
        this.authService.storeToken('delivery-token');  // Store a fake token
        this.router.navigate(['/delivery-dashboard']);  // Redirect to Delivery Dashboard
      }
      // Invalid Credentials
      else {
        this.loginError = 'Invalid username or password';
        this._snackBar.open(this.loginError, 'ok', {
          duration: 2000, // 5000 milliseconds = 5 seconds
        });
      }
    } else {
      this.loginError = 'Please fill in all required fields';
    }
  }
}
