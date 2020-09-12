import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { retry, catchError, tap } from 'rxjs/operators';
import {Transaction} from "./transaction";
import {Report} from "./report";

@Injectable({
  providedIn: 'root'
})
export class ReportService {
  apiURL = 'http://localhost:9092/api/report';

  constructor(private httpClient: HttpClient) {

  }

  public generateReport(report: Report){
    return this.httpClient.put(`${this.apiURL}`, report);
  }
}
