import { Component, OnInit } from "@angular/core";
import { Subscription, from } from "rxjs";
import { BluetoothService } from "../../services/bluetooth.service";
import { HelperService } from "../../services/helper.service";
import { RecordCategory } from "../../helpers/recordCategory";
import { CryptologyService } from "../../services/cryptology.service";
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
  credential = "0100000001020101AoemgGIH/SJ3Oi3huwkFy9zZ3Tk+SUra187pDH8TW5ch07111161686d65740901010200010103020101080101010502010107000101090001010A0001010E0001010F0002";
  value = null;
  device = null;
  credentialData = [];
  isApprove = false;
  valuesSubscription: Subscription;
  deviceSubscription: Subscription;

  constructor(public service: BluetoothService, private toastrService: ToastrService,
              private helperService: HelperService, private cryptologyService: CryptologyService) {
    service.config({
      decoder: (value: DataView) => new TextDecoder().decode(value),
      service: this.helperService.getCanonicalUUID(0x3131),
      characteristic: this.helperService.getCanonicalUUID(0x9A12)
    });
  }

  ngOnInit() {

    this.writeValue(this.doctorPublicKey);
    this.getDeviceStatus();
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
        this.value = null;
      }
    }, this.hasError.bind(this));
  }
  
  writeValue(value:any) {
    this.service.writeValue(value).subscribe(this.readValue.bind(this), this.hasError.bind(this));
  }

  readValue() {
    this.valuesSubscription = this.service.observeData(this.device).subscribe(this.updateValue.bind(this), this.hasError.bind(this));
  }

  updateValue(value: any) {
    console.log(value);
    this.value = value;
    this.credentialData = this.helperService.getCredentialObject(this.value);
  
    _.each(this.credentialData,function(item){
       item.checked = false;
       item.indeterminate = false;
       item.recordName = RecordCategory[item.record];
    })
  }

  disconnect() {
    this.service.disconnectDevice();
    if(this.deviceSubscription){
    this.deviceSubscription.unsubscribe();
    }
    if(this.valuesSubscription){
    this.valuesSubscription.unsubscribe();
    }
  }

  hasError(error: string) {
   this.toastrService.error(error);
  }

  updateObject(){
    var editedString = '';
    _.each(this.credentialData,function(item){
      if(item.checked === true && item.indeterminate === false){
        item.selection = "01"
      }else if (item.checked === false && item.indeterminate === true){
        item.selection = "02"
      }else {
        item.selection = "00"
      }
      var defaultArray = item.recordType + item.recordLenght + item.record + item.selection;
      editedString +=  Object.values(defaultArray).join('');
   });

   var newCredentialString = this.helperService.setCredentialEditibleObject(this.credential,editedString);
   
   var sign = this.cryptologyService.credentialEncryption(newCredentialString,"0x000001");
   this.toastrService.success("Approval completed.");
   return this.rewrite("AHMET");
  }

  click(client: any) {
    let indeterminate=(!client.checked && !client.indeterminate) ? true : false;
    let checked=(!client.checked && client.indeterminate) ? true : false
    client.indeterminate = indeterminate;
    client.checked=checked;
  }

  rewrite(value:any){
    this.valuesSubscription.unsubscribe();
    this.service.rewrite(this.device, value).subscribe(this.disconnect.bind(this), this.hasError.bind(this));
  }
  
  ngOnDestroy() {
    this.disconnect();
  }

}