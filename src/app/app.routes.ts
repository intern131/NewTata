import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { QrCodeScanComponent } from './auth/qr-code-scan/qr-code-scan.component';
import { ConsumersComponent } from './consumers/consumers.component';
import { ConsumerDashboardComponent } from './dashboard/consumer-dashboard/consumer-dashboard.component';
import { DeviceInfoComponent } from './pages/consumer/device-info/device-info.component';
import { FeedbackComponent } from './pages/consumer/feedback/feedback.component';
import { AlertComponent } from './pages/consumer/alert/alert.component';
import { ComplaintComponent } from './pages/consumer/complaint/complaint.component';

export const routes: Routes = [
  { path: "", component: LoginComponent },
  { path: "qrcodescan", component: QrCodeScanComponent },
  { path: "consumers", component: ConsumersComponent },
  { path: "consumerdashboard", component: ConsumerDashboardComponent },
  { path: "deviceinfo", component: DeviceInfoComponent },
  {path: "feedback", component: FeedbackComponent},
  {path: "alert", component: AlertComponent},
  {path: "complaint", component: ComplaintComponent}

];
