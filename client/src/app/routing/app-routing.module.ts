import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { HomeComponent } from "../components/home/home.component";
import { RegisterComponent } from "../components/register/register.component";
import { LiveAccountsComponent } from "../components/live-accounts/live-accounts.component";
import { VerifyMedicalInfoComponent } from "../components/verify-medical-info/verify-medical-info.component";
import { IdentifyPatientComponent } from "../components/identify-patient/identify-patient.component";
import { ReviewMyNotesComponent } from "../components/review-my-notes/review-my-notes.component";
import { UpdatesComponent } from "../components/updates/updates.component";
import { AccountDetailsComponent } from "../components/account-details/account-details.component";
import { AuthService } from "../services/auth.service";

export const routes: Routes = [
  { path: "home", component: HomeComponent },
  { path: "register", component: RegisterComponent },
  { path: "liveAccounts", component: LiveAccountsComponent },
  { path: "verifyMedicalInfo", component: VerifyMedicalInfoComponent },
  { path: "reviewMyNotes", component: ReviewMyNotesComponent },
  { path: "identifyPatient", component: IdentifyPatientComponent },
  { path: "updates", component: UpdatesComponent },
  { path: "accountDetails", component: AccountDetailsComponent },
  {
    path: "**",
    redirectTo: "home",
    pathMatch: "full"
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthService]
})
export class AppRoutingModule {}
