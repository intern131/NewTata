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
import { WarehouseDashboardComponent } from './dashboard/warehouse-dashboard/warehouse-dashboard.component';
import { AdminDashboardComponent } from './dashboard/admin-dashboard/admin-dashboard.component';
import { DeliveryguyDashboardComponent } from './dashboard/deliveryguy-dashboard/deliveryguy-dashboard.component';


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


  {
    path: 'warehouse-dashboard',
    component: WarehouseDashboardComponent
  },

  {
    path: 'admin-dashboard',
    component: AdminDashboardComponent
  },

  {
    path: 'delivery-dashboard',
    component: DeliveryguyDashboardComponent
  }

];
