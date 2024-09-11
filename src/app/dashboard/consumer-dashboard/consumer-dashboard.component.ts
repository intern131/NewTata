import { RouterLink } from '@angular/router';
import { CommonModule, Location } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-consumer-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './consumer-dashboard.component.html',
  styleUrls: ['./consumer-dashboard.component.scss']
})
export class ConsumerDashboardComponent {
  isProfileMenuOpen = false;
  isMenuOpen = false;

  constructor(private location: Location) {}

  // Toggle profile dropdown menu
  toggleProfileMenu() {
    this.isProfileMenuOpen = !this.isProfileMenuOpen;
  }

  // Close profile menu
  closeProfileMenu() {
    this.isProfileMenuOpen = false;
  }

  // Toggle sidebar menu
  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  // Back button functionality for sidebar menu
  goBack() {
    this.isMenuOpen = !this.isMenuOpen;
  }
}
