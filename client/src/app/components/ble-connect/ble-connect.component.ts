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
  credential = "0100000001020101AoemgGIH/SJ3Oi3huwkFy9zZ3Tk+SUra187pDH8TW5ch0561686d65740301010200010103020101080102";
  value = null;
  device = null;
  credentialData = [];
  streamSubscription: Subscription;
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
   this.credentialData = this.helperService.getCredentialObject(this.credential);
  
   _.each(this.credentialData,function(item){
      item.checked = false;
      item.indeterminate = false;
      item.recordName = RecordCategory[item.record];
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
   console.log(sign);
  }

  click(client: any) {
    let indeterminate=(!client.checked && !client.indeterminate) ? true : false;
    let checked=(!client.checked && client.indeterminate) ? true : false
    client.indeterminate = indeterminate;
    client.checked=checked;
  }

}