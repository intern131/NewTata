package com.example.app;

import android.app.NotificationChannel;
import android.app.NotificationManager;
import android.app.PendingIntent;
import android.app.Service;
import android.bluetooth.BluetoothAdapter;
import android.bluetooth.BluetoothManager;
import android.content.Context;
import android.content.Intent;
import android.content.BroadcastReceiver;
import android.content.IntentFilter;
import android.os.Build;
import android.os.IBinder;
import android.util.Log;

import androidx.core.app.NotificationCompat;

public class BackgroundService extends Service {
  private static final String CHANNEL_ID = "BackgroundServiceChannel";
  private static final int NOTIFICATION_ID = 1;
  private BluetoothAdapter bluetoothAdapter;
  private BluetoothStateReceiver bluetoothStateReceiver;

  @Override
  public void onCreate() {
    super.onCreate();
    checkInitialBluetoothState();
    createNotificationChannel();
    setupBluetoothMonitoring();
    startForegroundService();
  }

  @Override
  public int onStartCommand(Intent intent, int flags, int startId) {
    Log.d("BackgroundService", "Service started");
    checkInitialBluetoothState();
    return START_STICKY;
  }

  @Override
  public IBinder onBind(Intent intent) {
    return null;
  }

  private void createNotificationChannel() {
    if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
      NotificationChannel serviceChannel = new NotificationChannel(
        CHANNEL_ID,
        "Background Service Channel",
        NotificationManager.IMPORTANCE_LOW
      );
      NotificationManager manager = getSystemService(NotificationManager.class);
      manager.createNotificationChannel(serviceChannel);
    }
  }

  private void startForegroundService() {
    Intent notificationIntent = new Intent(this, MainActivity.class);
    PendingIntent pendingIntent = PendingIntent.getActivity(this, 0, notificationIntent, PendingIntent.FLAG_IMMUTABLE);

    NotificationCompat.Builder notificationBuilder = new NotificationCompat.Builder(this, CHANNEL_ID)
      .setContentTitle("Tata Services")
      .setContentText("Services are running in the background.")
      .setSmallIcon(R.drawable.ic_notification)
      .setContentIntent(pendingIntent)
      .setOngoing(true)  // Makes the notification persistent
      .setPriority(NotificationCompat.PRIORITY_LOW);

    startForeground(NOTIFICATION_ID, notificationBuilder.build());  // Starts the service in the foreground
  }

  private void setupBluetoothMonitoring() {
    BluetoothManager bluetoothManager = (BluetoothManager) getSystemService(Context.BLUETOOTH_SERVICE);
    bluetoothAdapter = bluetoothManager.getAdapter();

    if (bluetoothAdapter == null) {
      Log.e("BackgroundService", "Bluetooth not supported on this device.");
      return;
    }

    bluetoothStateReceiver = new BluetoothStateReceiver();
    IntentFilter filter = new IntentFilter(BluetoothAdapter.ACTION_STATE_CHANGED);
    registerReceiver(bluetoothStateReceiver, filter);

    // Initial check
    checkInitialBluetoothState();
  }

  private class BluetoothStateReceiver extends BroadcastReceiver {
    @Override
    public void onReceive(Context context, Intent intent) {
      if (BluetoothAdapter.ACTION_STATE_CHANGED.equals(intent.getAction())) {
        int state = intent.getIntExtra(BluetoothAdapter.EXTRA_STATE, BluetoothAdapter.ERROR);
        if (state == BluetoothAdapter.STATE_ON) {
          updateForegroundNotification("Tata Services", "Services are running in the background.");
          removeBluetoothNotification();
        } else if (state == BluetoothAdapter.STATE_OFF) {
          updateForegroundNotification("Tata Services - Bluetooth Alert", "Please turn on your Bluetooth.");
          sendBluetoothNotification();
        }
      }
    }
  }

  private void checkInitialBluetoothState() {
    if (bluetoothAdapter != null) {
      if (bluetoothAdapter.isEnabled()) {
        updateForegroundNotification("Tata Services", "Services are running in the background.");
        removeBluetoothNotification();
      } else {
        updateForegroundNotification("Tata Services - Bluetooth Alert", "Please turn on your Bluetooth.");
        sendBluetoothNotification();
      }
    }
  }

  private void sendBluetoothNotification() {
    NotificationCompat.Builder builder = new NotificationCompat.Builder(this, CHANNEL_ID)
      .setContentTitle("Tata Services - Bluetooth Alert")
      .setContentText("Please turn on your Bluetooth.")
      .setSmallIcon(R.drawable.ic_notification)
      .setPriority(NotificationCompat.PRIORITY_HIGH)
      .setOngoing(true) // Makes the notification persistent
      .setContentIntent(getBluetoothSettingsPendingIntent()); // Redirect to Bluetooth settings

    NotificationManager manager = null;
    if (android.os.Build.VERSION.SDK_INT >= android.os.Build.VERSION_CODES.M) {
      manager = getSystemService(NotificationManager.class);
    }
    if (manager != null) {
      manager.notify(NOTIFICATION_ID, builder.build());
    }
  }

  private void updateForegroundNotification(String title, String content) {
    NotificationCompat.Builder builder = new NotificationCompat.Builder(this, CHANNEL_ID)
      .setContentTitle(title)
      .setContentText(content)
      .setSmallIcon(R.drawable.ic_notification)
      .setOngoing(true) // Keeps the notification persistent
      .setPriority(NotificationCompat.PRIORITY_LOW);

    NotificationManager manager = null;
    if (android.os.Build.VERSION.SDK_INT >= android.os.Build.VERSION_CODES.M) {
      manager = getSystemService(NotificationManager.class);
    }
    if (manager != null) {
      manager.notify(NOTIFICATION_ID, builder.build());
    }
  }

  private void removeBluetoothNotification() {
    NotificationManager manager = null;
    if (android.os.Build.VERSION.SDK_INT >= android.os.Build.VERSION_CODES.M) {
      manager = getSystemService(NotificationManager.class);
    }
    if (manager != null) {
      manager.cancel(NOTIFICATION_ID);
    }
  }

  private PendingIntent getBluetoothSettingsPendingIntent() {
    Intent intent = new Intent(android.provider.Settings.ACTION_BLUETOOTH_SETTINGS);
    return PendingIntent.getActivity(this, 0, intent, PendingIntent.FLAG_IMMUTABLE);
  }

  @Override
  public void onDestroy() {
    super.onDestroy();
    if (bluetoothStateReceiver != null) {
      unregisterReceiver(bluetoothStateReceiver); // Unregister Bluetooth receiver
    }
  }
}
