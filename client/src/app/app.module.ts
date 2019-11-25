import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { MDBBootstrapModule } from "angular-bootstrap-md";
import { FormsModule } from "@angular/forms";
import { ToastrModule } from "ngx-toastr";
import { CommonModule } from "@angular/common";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { EllipsisPipe } from "../app/pipes/ellipsis.pipe";
import {
  MatFormFieldModule,
  MatDialogModule,
  MatInputModule,
  MatButtonModule
} from "@angular/material";

import { AppRoutingModule } from "./routing/app-routing.module";
import { AppComponent } from "./app.component";
import { HomeComponent } from "./components/home/home.component";
import { RegisterComponent } from "./components/register/register.component";
import { SidebarComponent } from "./components/sidebar/sidebar.component";
import { LiveAccountsComponent } from "./components/live-accounts/live-accounts.component";
import { VerifyMedicalInfoComponent } from "./components/verify-medical-info/verify-medical-info.component";
import { ReviewMyNotesComponent } from "./components/review-my-notes/review-my-notes.component";
import { IdentifyPatientComponent } from "./components/identify-patient/identify-patient.component";
import { UpdatesComponent } from "./components/updates/updates.component";
import { NavbarComponent } from "./components/navbar/navbar.component";
import { AccountDetailsComponent } from "./components/account-details/account-details.component";
import { EditPreviewComponent } from "./modals/edit-preview/edit-preview.component";
import { LoginComponent } from "./components/login/login.component";
// import { NgxQRCodeModule } from "ngx-qrcode2";
// import { ZXingScannerModule } from "@zxing/ngx-scanner";
import { WebBluetoothModule } from "@manekinekko/angular-web-bluetooth";
import { BatteryLevelComponent } from './components/battery-level/battery-level.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    RegisterComponent,
    SidebarComponent,
    LiveAccountsComponent,
    VerifyMedicalInfoComponent,
    ReviewMyNotesComponent,
    IdentifyPatientComponent,
    UpdatesComponent,
    NavbarComponent,
    AccountDetailsComponent,
    EditPreviewComponent,
    EllipsisPipe,
    LoginComponent,
    BatteryLevelComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MDBBootstrapModule.forRoot(),
    HttpClientModule,
    FormsModule,
    NgbModule,
    WebBluetoothModule.forRoot({
      enableTracing: true // or false, this will enable logs in the browser's console
    }),
    ToastrModule.forRoot({
      closeButton: false,
      newestOnTop: false,
      progressBar: true,
      positionClass: "toast-bottom-right",
      preventDuplicates: true,
      timeOut: 5000,
      extendedTimeOut: 5000
    }),
    CommonModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatDialogModule,
    MatInputModule,
    MatButtonModule
  ],
  entryComponents: [EditPreviewComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
