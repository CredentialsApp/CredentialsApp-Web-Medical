import { Component, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { BluetoothService } from "../../services/bluetooth.service";
import {HelperService} from "../../services/helper.service";
import * as _ from 'lodash';
import {
  BluetoothCore,
  BrowserWebBluetooth,
  ConsoleLoggerService
} from "@manekinekko/angular-web-bluetooth";
import { ToastrService } from 'ngx-toastr';

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
  selector: 'ble-connect',
  templateUrl: './ble-connect.component.html',
  styleUrls: ['./ble-connect.component.scss']
})
export class BleConnectComponent implements OnInit {
  doctorPublicKey = "Ai0pQ+/MMHbavVIzY47TZVZ3P1E+g51Zm7HaKKyHAQ+7";
  cridential = "0x0100000001020101AoemgGIH/SJ3Oi3huwkFy9zZ3Tk+SUra187pDH8TW5ch0561686d657402010102010101030202";
  value = null;
  device = null;
  cridentialData = [];
  streamSubscription: Subscription;
  valuesSubscription: Subscription;
  deviceSubscription: Subscription;

  constructor(public service: BluetoothService, private toastrService: ToastrService,private helperService: HelperService) {
    service.config({
      decoder: (value: DataView) => new TextDecoder().decode(value),
      service: this.helperService.getCanonicalUUID(0x3131),
      characteristic: this.helperService.getCanonicalUUID(0x9A12)
    });
  }

  ngOnInit() {
   this.cridentialData = this.helperService.getCridentialObject(this.cridential);
  
   _.each(this.cridentialData,function(item){
      if(item.selection === "01"){
        item.checked = true;
        item.indeterminate = false;
      }else if (item.selection === "02"){
        item.indeterminate = true;
        item.checked = false;
      }
   })

    this.writeValue(this.doctorPublicKey);
   // this.streamValues();
    this.getDeviceStatus();
    //  this.requestValue();
  }

  getDevice() {
    return this.service.getDevice();
  }

  getDeviceStatus() {
    this.deviceSubscription = this.service.getDevice().subscribe(device => {
      this.device = device;
      if (device) {
        this.value = null;
      } else {
        // device not connected or disconnected
        this.value = null;
      }
    }, this.hasError.bind(this));
  }

  requestValue() {
    this.valuesSubscription = this.service
      .readValue()
      .subscribe(this.updateValue.bind(this), this.hasError.bind(this));
  }
  
  writeValue(value:any) {
    //var vl = JSON.stringify(value);
    this.service.writeValue(value).subscribe(this.streamValues.bind(this), this.hasError.bind(this));
  }

  streamValues() {
    console.log("here");
    this.streamSubscription = this.service.stream().subscribe(this.updateValue.bind(this), this.hasError.bind(this));
  }

  updateValue(value: any) {
    console.log(value);
    this.value = value;
  }

  disconnect() {
    this.service.disconnectDevice();
    this.deviceSubscription.unsubscribe();
    this.valuesSubscription.unsubscribe();
  }

  hasError(error: string) {
   this.toastrService.error(error);
  }

  ngOnDestroy() {
    if(this.valuesSubscription){
      this.valuesSubscription.unsubscribe();
    }

    if(this.deviceSubscription){
      this.deviceSubscription.unsubscribe();
    }

    if(this.streamSubscription){
      this.streamSubscription.unsubscribe();
    }
  }

  updateObject(){
   console.log(this.cridentialData);
    // it will write for edit object and after sign.
  }

  click(cliente: any) {
    console.log(cliente);
    let indeterminate=(!cliente.checked && !cliente.indeterminate) ? true : false;
    let checked=(!cliente.checked && cliente.indeterminate) ? true : false
    cliente.indeterminate = indeterminate;
    cliente.checked=checked;
    console.log(cliente);
  }

}