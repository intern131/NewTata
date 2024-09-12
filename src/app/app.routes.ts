import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { ConsumersComponent } from './consumers/consumers.component';
import { ConsumerDashboardComponent } from './dashboard/consumer-dashboard/consumer-dashboard.component';
import { DeviceInfoComponent } from './pages/consumer/device-info/device-info.component';
import { FeedbackComponent } from './pages/consumer/feedback/feedback.component';
import { AlertComponent } from './pages/consumer/alert/alert.component';
import { ComplaintComponent } from './pages/consumer/complaint/complaint.component';
import { QrScannerComponent } from './auth/qr-scanner/qr-scanner.component';
import { AuthGuard } from './auth.guard';
import { WarehouseComponent } from './warehouse/warehouse.component';
import { DeliveryGuyComponent } from './delivery-guy/delivery-guy.component';
import { AdminComponent } from './admin/admin.component';

export const routes: Routes = [

  {
    path:"", redirectTo:'login', pathMatch:'full'
  },

  {
    path: '',
    component: LoginComponent,
  },
  {
    path: 'qr-scanner',
    component: QrScannerComponent,
  },
  {
    path: 'deliveryguy',
    canActivate: [AuthGuard],
    component: DeliveryGuyComponent,
  },
  {
    path: 'admin',
    canActivate: [AuthGuard],
    component: AdminComponent,
  },
  {
    path: 'warehouse',
    canActivate: [AuthGuard],
    component: WarehouseComponent,
  },
  {
    path: 'consumers',
    component: ConsumersComponent,
  },
  {
    path: 'consumerdashboard',
    component: ConsumerDashboardComponent,
  },
  {
    path: 'deviceinfo',
    component: DeviceInfoComponent,
  },
  {
    path: 'feedback',
    component: FeedbackComponent,
  },
  {
    path: 'alert',
    component: AlertComponent,
  },
  {
    path: 'complaint',
    component: ComplaintComponent,
  },
];
