import { Component, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { BluetoothService } from "../../services/bluetooth.service";
import {
  BluetoothCore,
  BrowserWebBluetooth,
  ConsoleLoggerService
} from "@manekinekko/angular-web-bluetooth";

// make sure we get a singleton instance of each service
const PROVIDERS = [
  {
    provide: BluetoothCore,
    useFactory: (b, l) => new BluetoothCore(b, l),
    deps: [BrowserWebBluetooth, ConsoleLoggerService]
  },
  {
    provide: BluetoothService,
    useFactory: b => new BluetoothService(b),
    deps: [BluetoothCore]
  }
];

@Component({
  selector: "ble-battery-level",
  templateUrl: "./battery-level.component.html",
  styleUrls: ["./battery-level.component.scss"],
  providers: PROVIDERS
})
export class BatteryLevelComponent implements OnInit {
  value = null;
  mode = "determinate";
  color = "primary";
  valuesSubscription: Subscription;
  streamSubscription: Subscription;
  deviceSubscription: Subscription;

  get device() {
    return this.service.getDevice();
  }

  constructor(public service: BluetoothService) {
    service.config({
      decoder: (value: DataView) => value.getInt8(0),
      service: "battery_service",
      characteristic: "battery_level"
    });
  }

  ngOnInit() {
    this.streamSubscription = this.service
      .stream()
      .subscribe(this.updateValue.bind(this), this.hasError.bind(this));
  }

  getDeviceStatus() {
    this.deviceSubscription = this.service.getDevice().subscribe(device => {
      if (device) {
        this.color = "warn";
        this.mode = "indeterminate";
        this.value = null;
      } else {
        // device not connected or disconnected
        this.value = null;
        this.mode = "determinate";
        this.color = "primary";
      }
    }, this.hasError.bind(this));
  }

  requestValue() {
    this.valuesSubscription = this.service
      .value()
      .subscribe(null, this.hasError.bind(this));
  }

  updateValue(value: number) {
    console.log("Reading battery level %d", value);
    this.value = value;
    this.mode = "determinate";
  }

  disconnect() {
    this.service.disconnectDevice();
    this.deviceSubscription.unsubscribe();
    this.valuesSubscription.unsubscribe();
  }

  hasError(error: string) {}

  ngOnDestroy() {
    this.valuesSubscription.unsubscribe();
    this.deviceSubscription.unsubscribe();
    this.streamSubscription.unsubscribe();
  }
}
