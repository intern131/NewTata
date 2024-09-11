package com.example.app;

import android.content.Intent;
import android.os.Build;
import android.os.Bundle;
import android.Manifest;
import android.content.pm.PackageManager;
import androidx.core.app.ActivityCompat;
import androidx.core.content.ContextCompat;
import android.widget.Toast;
import com.getcapacitor.BridgeActivity;

public class MainActivity extends BridgeActivity {
  private static final int PERMISSION_REQUEST_CODE = 1001;

  @Override
  public void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);

    // Check and request necessary permissions at runtime
    if (checkAndRequestPermissions()) {
      // Start the background service if permissions are granted
      startBluetoothBackgroundService();
    }
  }

  // Function to check if all required permissions are granted, and request them if not
  private boolean checkAndRequestPermissions() {
    if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.S) {
      // For Android 12 and higher, request Bluetooth and location permissions
      if (ContextCompat.checkSelfPermission(this, Manifest.permission.BLUETOOTH_SCAN) != PackageManager.PERMISSION_GRANTED ||
          ContextCompat.checkSelfPermission(this, Manifest.permission.BLUETOOTH_CONNECT) != PackageManager.PERMISSION_GRANTED ||
          ContextCompat.checkSelfPermission(this, Manifest.permission.ACCESS_FINE_LOCATION) != PackageManager.PERMISSION_GRANTED) {

        ActivityCompat.requestPermissions(this,
          new String[]{
            Manifest.permission.BLUETOOTH_SCAN,
            Manifest.permission.BLUETOOTH_CONNECT,
            Manifest.permission.ACCESS_FINE_LOCATION
          },
          PERMISSION_REQUEST_CODE);

        return false;  // Permissions are not yet granted, waiting for user action
      }
    }
    return true; // All permissions are granted
  }

  // Callback to handle the permission request result
  @Override
  public void onRequestPermissionsResult(int requestCode, String[] permissions, int[] grantResults) {
    super.onRequestPermissionsResult(requestCode, permissions, grantResults);
    if (requestCode == PERMISSION_REQUEST_CODE) {
      // Check if all permissions are granted
      boolean allGranted = true;
      for (int result : grantResults) {
        if (result != PackageManager.PERMISSION_GRANTED) {
          allGranted = false;
          break;
        }
      }

      if (allGranted) {
        // Permissions are granted, start the service
        startBluetoothBackgroundService();
      } else {
        // Permission denied, show a message
        Toast.makeText(this, "Permissions required for Bluetooth and location!", Toast.LENGTH_LONG).show();
      }
    }
  }

  // Function to start the background service based on the Android version
  private void startBluetoothBackgroundService() {
    Intent serviceIntent = new Intent(this, BackgroundService.class);
    if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
      startForegroundService(serviceIntent);  // For Android 8.0 and above
    } else {
      startService(serviceIntent);  // For versions below Android 8.0
    }
  }
}
