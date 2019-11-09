import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { MDBBootstrapModule } from "angular-bootstrap-md";
import { FormsModule } from "@angular/forms";

import { AppRoutingModule } from "./routing/app-routing.module";
import { AppComponent } from "./app.component";
import { HomeComponent } from "./components/home/home.component";

@NgModule({
  declarations: [AppComponent, HomeComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MDBBootstrapModule.forRoot(),
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
