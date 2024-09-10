import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoginComponent } from "./auth/login/login.component";
import { QrCodeScanComponent } from './auth/qr-code-scan/qr-code-scan.component';
import { ConsumersComponent } from './consumers/consumers.component';
import { ConsumerDashboardComponent } from './dashboard/consumer-dashboard/consumer-dashboard.component';
import { DeviceInfoComponent } from './pages/consumer/device-info/device-info.component';
import { LocalNotifications } from '@capacitor/local-notifications';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, LoginComponent, ConsumersComponent,QrCodeScanComponent ,ConsumerDashboardComponent, DeviceInfoComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'tata';
  constructor() {}

  ngOnInit() {
    this.scheduleNotification();
  }

  // Schedule a local notification
  async scheduleNotification() {
    await LocalNotifications.requestPermissions();
    await LocalNotifications.schedule({
      notifications: [
        {
          title: 'Tata Services',
          body: 'Your background task is running.',
          id: new Date().getTime(),
          schedule: { at: new Date(new Date().getTime() + 1000 * 60) }, // Schedule for 1 minute later
          sound: 'beep.mp3',
        },
      ],
    });
    console.log('Notification scheduled');
  }
}
