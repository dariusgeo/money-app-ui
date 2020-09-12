import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {ReportComponent} from "./report/report.component";
import {TransactionComponent} from "./transaction/transaction.component";

const routes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'report', component: ReportComponent },
  { path: 'transaction', component: TransactionComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
