import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NavbarDeliveryguyComponent } from "../../common/navbar-deliveryguy/navbar-deliveryguy.component";

@Component({
  selector: 'app-deliveryguy-dashboard',
  standalone: true,
  imports: [CommonModule, NavbarDeliveryguyComponent],
  templateUrl: './deliveryguy-dashboard.component.html',
  styleUrl: './deliveryguy-dashboard.component.scss'
})
export class DeliveryguyDashboardComponent implements OnInit {

  selectedStatus: string = 'pending';  // Default selected status

  // Array of deliveries with status
  deliveries = [
    {
      name: 'Priya Verma',
      id: 'CN01234',
      address: 'Flat 12, Tower B, Shanti Apartments, MG Road, Bengaluru, Karnataka - 560001',
      status: 'pending'
    },
    {
      name: 'Priya Verma',
      id: 'CN01235',
      address: 'Flat 15, Tower B, Shanti Apartments, MG Road, Bengaluru, Karnataka - 560001',
      status: 'completed'
    },
    {
      name: 'John Doe',
      id: 'CN01236',
      address: 'Flat 18, Tower C, Shanti Apartments, MG Road, Bengaluru, Karnataka - 560001',
      status: 'pending'
    },
    {
      name: 'Alex Johnson',
      id: 'CN01237',
      address: 'Flat 20, Tower D, Shanti Apartments, MG Road, Bengaluru, Karnataka - 560001',
      status: 'completed'
    },
    {
      name: 'hello ji hello',
      id: 'CN01237',
      address: 'Flat 20, Tower D, Shanti Apartments, MG Road, Bengaluru, Karnataka - 560001',
      status: 'pending'
    }
  ];

  // This will store the filtered deliveries based on the status
  filteredDeliveries = this.deliveries.filter(delivery => delivery.status === 'pending');

  constructor() { }

  ngOnInit(): void { }

  // Method to filter deliveries based on the selected status
  filterDeliveries(status: string) {
    this.selectedStatus = status;
    this.filteredDeliveries = this.deliveries.filter(delivery => delivery.status === status);
  }
}
