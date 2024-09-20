// app.routes.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { ConsumersComponent } from './consumers/consumers.component';
import { ConsumerDashboardComponent } from './dashboard/consumer-dashboard/consumer-dashboard.component';
import { DeviceInfoComponent } from './pages/consumer/device-info/device-info.component';
import { FeedbackComponent } from './pages/consumer/feedback/feedback.component';
import { AlertComponent } from './pages/consumer/alert/alert.component';
import { ComplaintComponent } from './pages/consumer/complaint/complaint.component';
import { QrScannerComponent } from './auth/qr-scanner/qr-scanner.component';
import { WarehouseDashboardComponent } from './dashboard/warehouse-dashboard/warehouse-dashboard.component';
import { AdminDashboardComponent } from './dashboard/admin-dashboard/admin-dashboard.component';
import { DeliveryguyDashboardComponent } from './dashboard/deliveryguy-dashboard/deliveryguy-dashboard.component';
import { QrCodeScanComponent } from './pages/delivery/qr-code-scan/qr-code-scan.component';
import { AuthGuard } from './auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },

  { path: 'login', component: LoginComponent },

  // Consumer Routes
  {
    path: 'qr-scanner',
    component: QrScannerComponent,
    //canActivate: [AuthGuard],
    //data: { expectedRole: 'consumer' }
  },
  {
    path: 'consumers',
    component: ConsumersComponent,
    //canActivate: [AuthGuard],
    //data: { expectedRole: 'consumer' }
  },
  {
    path: 'consumer-dashboard',
    component: ConsumerDashboardComponent,
    //canActivate: [AuthGuard],
    //data: { expectedRole: 'consumer' }
  },
  {
    path: 'deviceinfo',
    component: DeviceInfoComponent,
    //canActivate: [AuthGuard],
    //data: { expectedRole: 'consumer' }
  },
  {
    path: 'feedback',
    component: FeedbackComponent,
    //canActivate: [AuthGuard],
    //data: { expectedRole: 'consumer' }
  },
  {
    path: 'alert',
    component: AlertComponent,
    //canActivate: [AuthGuard],
    //data: { expectedRole: 'consumer' }
  },
  {
    path: 'complaint',
    component: ComplaintComponent,
    //canActivate: [AuthGuard],
    //data: { expectedRole: 'consumer' }
  },

  // Warehouse Routes
  {
    path: 'warehouse-dashboard',
    component: WarehouseDashboardComponent,
    canActivate: [AuthGuard],
    data: { expectedRole: 'warehouse' }
  },

  // Admin Routes
  {
    path: 'admin-dashboard',
    component: AdminDashboardComponent,
    canActivate: [AuthGuard],
    data: { expectedRole: 'admin' }
  },

  // Delivery Guy Routes
  {
    path: 'delivery-dashboard',
    component: DeliveryguyDashboardComponent,
    canActivate: [AuthGuard],
    data: { expectedRole: 'delivery' }
  },
  {
    path: 'qrdelivery/:id',
    component: QrCodeScanComponent,
    canActivate: [AuthGuard],
    data: { expectedRole: 'delivery' }
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
