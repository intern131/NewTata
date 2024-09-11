import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';

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

  // Toggle profile dropdown menu
  toggleProfileMenu() {
    this.isProfileMenuOpen = !this.isProfileMenuOpen;
  }

  // Toggle sidebar menu
  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }
}
